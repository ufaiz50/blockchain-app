import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-all-block-viewer',
  templateUrl: './all-block-viewer.component.html',
  styleUrls: ['./all-block-viewer.component.scss']
})
export class AllBlockViewerComponent implements OnInit {
  public blocks= [];
  public allBlock = []

  constructor(private blockchainService:BlockchainService, private firestore: AngularFirestore) {
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
    })
    this.allBlock = blockchainService.blockchainInstance.chain;
   }
   

  ngOnInit() {
  }

  getBlockNumber(block) {
    return this.allBlock.indexOf(block) + 1;
  }

}
