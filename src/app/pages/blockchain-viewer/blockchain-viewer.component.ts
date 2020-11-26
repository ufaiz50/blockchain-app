import { Component, OnInit, Input } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {
  @Input()
  public transactions = [];
  public blocks = [];
  public reverseBlock = [];
  public recentBlock = [];
  public recentTrans = [];

  public selectedBlock = null;

  constructor(private blockchainService: BlockchainService) {
    this.blocks = blockchainService.blockchainInstance.chain;
    this.selectedBlock = this.blocks[1];

    for( let x = this.blocks.length - 1 ; x>=0 ; x--){
      this.reverseBlock.push(this.blocks[x]);
    }

    for( let y = 0 ; y <= 5; y++){
      this.recentBlock.push(this.reverseBlock[y]);
    }
    
    for(let i=this.blocks.length - 1 ; i>=0 ; i--){
      for (let index = this.blocks[i].transactions.length - 1 ; index >=0 ; index--) {
        this.transactions.push(this.blocks[i].transactions[index]); 
      }
    }

    for(let i=0 ; i<=5; i++){
      this.recentTrans.push(this.transactions[i])
    }

    console.log(this.transactions);
    console.log(this.recentBlock);
  }

  ngOnInit() {
  }

  showTransactions(block) {
    console.log(block);
    this.selectedBlock = block;
    return false;
  }

  blockHasTx(block) {
    return block.transactions.length > 0;
  }

  selectedBlockHasTx() {
    return this.blockHasTx(this.selectedBlock);
  }

  isSelectedBlock(block) {
    return this.selectedBlock === block;
  }

  getBlockNumber(block) {
    return this.blocks.indexOf(block) + 1;
  }
}
