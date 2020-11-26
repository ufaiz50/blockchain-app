import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-all-transaction-viewer',
  templateUrl: './all-transaction-viewer.component.html',
  styleUrls: ['./all-transaction-viewer.component.scss']
})
export class AllTransactionViewerComponent implements OnInit {
  
  public blocks = [];
  public allTransaction = [];

  constructor(blockchainService : BlockchainService) {
    this.blocks = blockchainService.blockchainInstance.chain;
    for(let i=this.blocks.length - 1 ; i>=0 ; i--){
      for (let index = this.blocks[i].transactions.length - 1 ; index >=0 ; index--) {
        this.allTransaction.push(this.blocks[i].transactions[index]); 
      }
    }

    console.log(this.allTransaction);
   }

  ngOnInit() {
  }

}
