import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlockchainService} from '../../services/blockchain.service'

@Component({
  selector: 'app-detail-organization-viewer',
  templateUrl: './detail-organization-viewer.component.html',
  styleUrls: ['./detail-organization-viewer.component.scss']
})
export class DetailOrganizationViewerComponent implements OnInit {
  namaOrganization = '';
  dataOrganization = [];
  items: Observable<any[]>;
  blocks: any[];
  kirim =[];
  transactions = [];
  dataTransaction= [];
  dataTx= []
  data= []

  constructor(private db: AngularFireDatabase, private route:ActivatedRoute , private blockchainService: BlockchainService, private firestore: AngularFirestore ) {
    this.items = db.list('organization').valueChanges()
   }

  ngOnInit() {
    this.route.params.subscribe( (params) =>{
      this.namaOrganization = params['address'];

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
          if(transaction.organization === this.namaOrganization){   
            this.dataTransaction.push(transaction)
            }
          }

          this.dataTx = this.dataTransaction;
          console.log(this.dataTransaction)      
        })
      
        

      const organization = this.db.list('organization').valueChanges();
      // for(const listOrganization of organization ){

      // }

      const blockchain = this.blockchainService.blockchainInstance.chain;
      for(const block of blockchain){
        for(const transaction of block.transactions){
          if(transaction.organization === this.namaOrganization){
            this.dataOrganization.push(transaction)
          }
        }
        this.data = this.dataOrganization
      }
      console.log(this.data)
    })
  }

}
