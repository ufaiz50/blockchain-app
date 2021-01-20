import { Injectable } from '@angular/core';
import { Blockchain } from 'SavjeeCoin/src/blockchain'
import { BlockchainModuleService } from '../services/blockchain-module.service';

// import { Blockchain } from 'SavjeeCoin/src/blockchain';
import EC from 'elliptic';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchainInstance = new Blockchain();
  public walletKeys: Array<IWalletKey> = [];
  diffculty: number;
  node: any[];
  blocks: { id: string; hash: any; height: any; nonce: any; previousHash: any; timestamp: any; transactions: any; }[];
  
  

  constructor(private firestore: AngularFirestore) {
    console.log(this.blockchainInstance.createGenesisBlock(), this.blockchainInstance.isChainValid())
    firestore.collection('node').snapshotChanges().subscribe(data => {
      this.node = data.map(e =>{
        return {
          id: e.payload.doc.id,
          nama: e.payload.doc.data()['nama'],
          level: e.payload.doc.data()['level'],
          publicKey: e.payload.doc.data()['publicKey'],
          privateKey: e.payload.doc.data()['privateKey']
        }
      })
    })
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
      this.blockchainInstance.chain = this.blocks
    })
    
    this.blockchainInstance.difficulty = 1
    this.diffculty = this.blockchainInstance.difficulty
    this.blockchainInstance.minePendingTransactions('sempak');
    this.generateWalletKeys();
  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  addressIsFromCurrentUser(address) {
    return address === this.walletKeys[0].publicKey;
  }

  generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });

    console.log(this.walletKeys);
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx);
  }
}

export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}
