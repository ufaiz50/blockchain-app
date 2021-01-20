import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Key } from 'protractor';
import { BlockchainService } from 'src/app/services/blockchain.service';

@Component({
  selector: 'app-detail-transaction-viewer',
  templateUrl: './detail-transaction-viewer.component.html',
  styleUrls: ['./detail-transaction-viewer.component.scss']
})
export class DetailTransactionViewerComponent implements OnInit {
  transactionsign= '';
  public dataTransaction = [];
  data: [];
  blocks: any[];
  kirim= [];
  transactions= [];
  datas= [];
  detail: any;

  constructor(private route: ActivatedRoute, private blockchainService: BlockchainService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe( (params) => {
        this.transactionsign = params['address'];

        this.firestore.collection('block', ref => ref.orderBy("height", "desc")).snapshotChanges().subscribe( data =>{
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
          
          for(const transaction of this.transactions){
          if(transaction.signature === this.transactionsign){   
            this.dataTransaction.push(transaction)
            }
          }
          this.detail = this.dataTransaction[0];
          this.data = this.detail.data;
          console.log(this.dataTransaction[0].data[0].Nama)   
        })
      
        


          
        //   for( const dataS of this.data.data){
        //     this.datas.push(dataS);
        //   }
        //   console.log(this.datas)
    })
  }

}
