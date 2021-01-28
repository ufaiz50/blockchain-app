import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
import { Transaction } from 'SavjeeCoin/src/blockchain';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/page/_services';
import { User } from 'src/app/page/_models';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction();
  public ownWalletKey: IWalletKey;
  items: Observable<any[]>;
  recordtitle: string;
  publicKey: string;
  publicKey1: string;
  currentUser: User;
  currentUserValue: User;
  bantuanIJK = {
    kecamatan: 'a',
    kota: 'b',
    APBN: 'c',
  }
  bantuanIJK1 = {
    kecamatan: 'd',
    kota: 'e'
  }
  contoh: any;
  temp = ''

  dataObj = {};
  public dataArray = [];

  constructor(
    private blockchainService: BlockchainService, 
    private router: Router, public db:AngularFirestore, 
    public database:AngularFireDatabase,
    private authenticationService: AuthenticationService) {
      this.items = database.list('organization').valueChanges()
      this.newTx = new Transaction();
      this.ownWalletKey = blockchainService.walletKeys[0];
      this.publicKey = this.ownWalletKey.publicKey;
      this.currentUserValue = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      if(!this.currentUser){
        this.publicKey1 = this.currentUserValue.publicKey
      }
      console.log(this.dataObj)
  }

  ngOnInit() {
    this.dataArray.push(this.dataObj)
  }


  createTransaction() {    
    const newTx = this.newTx;

    // Set the FROM address and sign the transaction
    newTx.fromAddress = this.publicKey;
    
    newTx.signTransaction(this.ownWalletKey.keyObj);
    newTx.data = this.dataArray;


    try {
      this.addTransactions(this.newTx);
      this.dataArray = []
    } catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
    this.newTx = new Transaction();
  }

  addData(temp){
    const newData = {};
    this.dataArray.push(newData);
    console.log(this.dataArray);
  }
  removeData(data){
    var index = this.dataArray.indexOf(data);
    this.dataArray.splice(index,1);
  }

  addTransactions(transaction) {
    if (!transaction.fromAddress || !transaction.title) {
      throw new Error('Transaction must include from address and title');
    }

    // Verify the transactiion
    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction to chain');
    }
    // if (transaction.fromAddress !== this.currentUserValue.publicKey){
    //   throw new Error('cannot add transactions that are not from your account')
    // }

    return this.db.collection('transaction').add(Object.assign({}, transaction))
  }

  filterChange(value){
    this.temp = value
    this.dataArray = [{}]
    console.log(value)
  }
  changeValue(key, value){
    this.contoh[key] = value
    console.log(this.contoh)
  }
}
