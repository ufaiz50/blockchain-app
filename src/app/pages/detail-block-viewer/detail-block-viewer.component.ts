import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-detail-block-viewer',
  templateUrl: './detail-block-viewer.component.html',
  styleUrls: ['./detail-block-viewer.component.scss']
})
export class DetailBlockViewerComponent implements OnInit {
  public blockHash = '';
  public dataBlock = [];
  data: any;

  constructor(private route: ActivatedRoute, private blockchainService: BlockchainService) {}

  ngOnInit() {
    this.route.params.subscribe( (params) => {
        this.blockHash = params['address'];

        const blockchain = this.blockchainService.blockchainInstance.chain;
        for(const block of blockchain){
          if( block.hash === this.blockHash ){
            this.dataBlock.push(block);  
          }
        }

        this.data = this.dataBlock[0]
        console.log(this.blockHash);
        console.log(this.data.transactions.length);
        
        // this.balance = blockchain.getBalanceOfAddress(this.blockAddress);
        // this.transactions = blockchain.getAllTransactionsForWallet(this.blockAddress);
    });
  }

}
