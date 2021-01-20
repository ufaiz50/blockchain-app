import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlockchainService } from '../../services/blockchain.service';
import { Block } from 'SavjeeCoin/src/blockchain';
import { AuthenticationService } from 'src/app/page/_services';
import { User } from 'src/app/page/_models';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {
  public block = new Block(); 
  public pendingTransactions = [];
  items : Observable<any[]>
  public miningInProgress = false;
  public justAddedTx = false;
  pendingTx: Observable<unknown[]>;
  pending: any[];
  latestBlock: any[];
  jumlahTx: number;
  latesthash: any;
  latestheigth: any;
  currentUserValue: User;
  dataArray = []

  constructor(private blockchainService: BlockchainService, private router: Router, private route: ActivatedRoute, 
    private db: AngularFireDatabase, public fireStore: AngularFirestore, private authenticationService: AuthenticationService) {
    // this.pendingTransactions = blockchainService.getPendingTransactions();
    this.block = new Block();
    this.pendingTx = db.list('transaction').valueChanges();
    this.items = this.getPendingTX();
    
    this.fireStore.collection('transaction').snapshotChanges().subscribe(data => {
      this.pending = data.map(e =>{
        return{
          id: e.payload.doc.id,
          signature: e.payload.doc.data()['signature'],
          organization: e.payload.doc.data()['organization'],
          title: e.payload.doc.data()['title'],
          year: e.payload.doc.data()['year'],
          timestamp: e.payload.doc.data()['timestamp'],
          data: e.payload.doc.data()['data'],
          fromAddress: e.payload.doc.data()['fromAddress']
        }
      })
      this.jumlahTx = this.pending.length;
      for(let i = 0; i < this.jumlahTx ; i++){
        this.dataArray.push(this.pending[i].data)
      }
      console.log(this.pending)
    })

    this.fireStore.collection('block', ref =>
    ref.orderBy("height", "asc")).snapshotChanges().subscribe(item => {
      this.latestBlock = item.map(e =>{
        return{
          id: e.payload.doc.id,
          hash: e.payload.doc.data()['hash'],
          height: e.payload.doc.data()['height']
        }
      })
      this.latesthash = this.latestBlock[this.latestBlock.length - 1].hash;
      this.latestheigth = this.latestBlock[this.latestBlock.length - 1].height + 1; 
    })

    this.currentUserValue = this.authenticationService.currentUserValue;
  }

  ngOnInit() {    
    if (this.route.snapshot.paramMap.get('addedTx')) {
      this.justAddedTx = true;

      setTimeout(() => {
        this.justAddedTx = false;
      }, 4000);
    }
  } 

  minePendingTransactions() {
    this.miningInProgress = true;
    const createBlock = new Block(Date.now(), this.pending, this.latesthash, this.latestheigth);
    createBlock.mineBlock(this.blockchainService.diffculty);
    this.fireStore.collection('block').add(Object.assign({}, createBlock));
    this.deletependingTx()
    console.log(createBlock)
    this.miningInProgress = false;
    this.router.navigate(['/new/transaction/pending']);
  }

  getPendingTX(){
    return this.db.list('transaction').valueChanges()
  }

  getLatestBlock(){
    return this.latestBlock;
  }

  addBlock(block){
    return this.fireStore.collection('block').add(Object.assign({}, block))
  }

  deletependingTx(){
    for(const document of this.pending){
    this.fireStore.collection('transaction').doc(document.id).delete().then(function() {
      console.log("document succesfull delete")
    }).catch(function(error){
      console.error("error Remove document: ", error);
    })
  }
  }
}
