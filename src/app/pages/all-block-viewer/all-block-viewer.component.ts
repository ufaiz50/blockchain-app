import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-all-block-viewer',
  templateUrl: './all-block-viewer.component.html',
  styleUrls: ['./all-block-viewer.component.scss']
})
export class AllBlockViewerComponent implements OnInit {
  public allBlock= [];
  public latesBlock = []

  constructor(private blockchainService:BlockchainService) {
    this.allBlock = blockchainService.blockchainInstance.chain;
    for( let x = this.allBlock.length - 1 ; x>=0 ; x--){
      this.latesBlock.push(this.allBlock[x]);
    }
    console.log(this.allBlock);
   }
   

  ngOnInit() {
  }

  getBlockNumber(block) {
    return this.allBlock.indexOf(block) + 1;
  }

}
