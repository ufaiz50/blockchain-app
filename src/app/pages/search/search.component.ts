import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  items= [];
  temp= [];
  transactions= [];
  search= "";
  term= "asia";
  blocks: Observable<any[]>
  organizations: Observable<any[]>

  constructor(private fireStore: AngularFirestore, private route: ActivatedRoute) {
    fireStore.collection('block').snapshotChanges().subscribe( data =>{
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
    const strs = ['valval', 'bal', 'gal', 'dalval'];
    const result = strs.filter(s => s.includes('val'));
    const newarr = this.transactions.filter(param => param.includes('bantuan'));

    // console.log(strs);
    // console.log(result);
    // console.log(this.transactions)
    // console.log(newarr)
   }

  ngOnInit() {
    
    
    this.route.params.subscribe( (params) => {
        this.search = params['address'];
    })
  }

}
