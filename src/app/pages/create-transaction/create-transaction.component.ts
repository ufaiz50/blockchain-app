import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
import { Transaction } from 'SavjeeCoin/src/blockchain';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction();
  public dataS = [
    {}
  ];
  public ownWalletKey: IWalletKey;



  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.newTx = new Transaction();
    this.ownWalletKey = blockchainService.walletKeys[0];
  }

  ngOnInit() {
  }


  createTransaction() {
    const newTx = this.newTx;

    // Set the FROM address and sign the transaction
    newTx.fromAddress = this.ownWalletKey.publicKey;
    newTx.signTransaction(this.ownWalletKey.keyObj);
    newTx.data = this.dataS;


    try {
      this.blockchainService.addTransaction(this.newTx);
    } catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/new/transaction', { addedTx: true }]);
    this.newTx = new Transaction();
  }

  addData(){
    let newData = {};
    this.dataS.push(newData);
    console.log(this.dataS);
  }
  removeData(data){
    var index = this.dataS.indexOf(data);
    this.dataS.splice(index,1);
  }
}
