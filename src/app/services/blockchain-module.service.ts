import { Injectable } from '@angular/core';

const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

@Injectable({
  providedIn: 'root'
})
export class BlockchainModuleService {

  constructor() {   
   }

}


