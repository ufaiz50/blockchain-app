import { Component, OnInit } from '@angular/core';

import { BlockchainService } from './services/blockchain.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import { AuthenticationService } from '../app/page/_services';
import { User } from '../app/page/_models';

import '../app/page/_content/app.less';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  currentUserValue: User;
  pencarian ="";
  items = [];
  transactions= [];
  aktor = '';

  public blockchain;
  public showInfoMessage = true;
  pending: { id: string; signature: any; organization: any; title: any; year: any; timestamp: any; data: any; fromAddress: any; }[];


  constructor(private blockchainService: BlockchainService, private fireStore: AngularFirestore,
    private router: Router,    
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.blockchain = blockchainService.blockchainInstance;
      
      if(this.currentUser){
        this.currentUserValue = this.authenticationService.currentUserValue;
        this.aktor = this.currentUserValue.level
        console.log(this.aktor)
      }
      

  }

  logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
        window.location.reload()
    }


  ngOnInit() {
    this.fireStore.collection('block').snapshotChanges().subscribe( data =>{
      this.items = data.map(e =>{
        return {
          id: e.payload.doc.id,
          hash: e.payload.doc.data()['hash'],
          height: e.payload.doc.data()['height'],
          nonce: e.payload.doc.data()['nonce'],
          previousHash: e.payload.doc.data()['previousHash'],
          timestamp: e.payload.doc.data()['timestamp'],
          transactions: e.payload.doc.data()['transactions']
        }
      })
      for(let items of this.items){
        for(let tx of items.transactions){
          this.transactions.push(tx)
        }
      }   
    })

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
    })
  }

  thereArePendingTransactions() {
    return this.blockchain.pendingTransactions.length > 0;
  }

  dismissInfoMessage() {
    this.showInfoMessage = false;
  }
}
