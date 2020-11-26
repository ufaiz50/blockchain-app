import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BlockchainService } from '../../services/blockchain.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-organization-viewer',
  templateUrl: './organization-viewer.component.html',
  styleUrls: ['./organization-viewer.component.scss']
})
export class OrganizationViewerComponent implements OnInit {
  title = 'Angular8Firebase';
  description = 'Angular-Fire-Demo';

  itemValue = '';
  items: Observable<any[]>;


  constructor(public db: AngularFireDatabase, private blockchainService: BlockchainService) {
    this.items = db.list('block').valueChanges();
    console.log(db.list('block'));
  }

  onSubmit() {
    this.db.list('block').push({ content: this.itemValue});
    this.itemValue = '';
  }

  ngOnInit() {
  }

}
