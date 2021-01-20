import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  blocks = [];
  data: any;
  transaction = []

  constructor(private route: ActivatedRoute, private blockchainService: BlockchainService, private firestore:AngularFirestore) {}

  ngOnInit() {
    this.route.params.subscribe( (params) => {
        this.blockHash = params['address'];
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
          console.log(this.blocks)
          for(const block of this.blocks){
            if( block.hash === this.blockHash ){
              this.dataBlock.push(block);  
            }
          }
          this.data = this.dataBlock[0];
          for(const transaction of this.data.transactions){
            this.transaction.push(transaction)
          }
          console.log(this.transaction)
        })

        const blockchain = this.blockchainService.blockchainInstance.chain;   

    });
  }

}
