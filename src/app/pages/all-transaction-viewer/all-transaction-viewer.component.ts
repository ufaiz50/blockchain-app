import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-all-transaction-viewer',
  templateUrl: './all-transaction-viewer.component.html',
  styleUrls: ['./all-transaction-viewer.component.scss']
})
export class AllTransactionViewerComponent implements OnInit {
  
  public blocks = [];
  kirim = [];
  public transactions = [];

  constructor(blockchainService : BlockchainService, private firestore: AngularFirestore) {
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
      for(let blocks of this.blocks){
        for(let transactions of blocks.transactions){
          this.transactions.push(transactions)
        }
      }
      for(let i = 0; i > this.transactions.length; i++){
        console.log(this.transactions[i])
      }
    })
  }

  ngOnInit() {
  }

}
