import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-searchdata',
  templateUrl: './searchdata.component.html',
  styleUrls: ['./searchdata.component.scss']
})
export class SearchdataComponent implements OnInit {

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
  }

}
