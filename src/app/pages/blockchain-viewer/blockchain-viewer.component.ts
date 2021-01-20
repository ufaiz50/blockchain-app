import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BlockchainService } from '../../services/blockchain.service';
@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {
  @Input()
  public selectedBlock = null;
  
  blocks: any[];
  kirim = [];
  transactions = []
  constructor(private firestore: AngularFirestore, private blockchainService: BlockchainService) {
    firestore.collection('block', ref => ref.orderBy("height", "desc")).snapshotChanges().subscribe( data =>{
      this.blocks = data.map(e=>{
        return{
          id: e.payload.doc.id,
          hash: e.payload.doc.data()['hash'],
          height: e.payload.doc.data()['height'],
          nonce: e.payload.doc.data()['nonce'],
          previousHash: e.payload.doc.data()['previousHash'],
          timestamp: e.payload.doc.data()['timestamp'],
          transactions: e.payload.doc.data()['transactions']
        }
      })
      for(const transactions of this.blocks){
          this.kirim.push(transactions.transactions)
      }
      for(let index = 0; index < this.kirim.length; index++){
        for(const tx of this.kirim[index]){
          this.transactions.push(tx)
        }
      }
      
    })
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
