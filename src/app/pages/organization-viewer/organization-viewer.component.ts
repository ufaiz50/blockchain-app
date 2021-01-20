import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
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
  


  constructor(private db: AngularFireDatabase) {
    this.items = db.list('organization').valueChanges();
    console.log(this.items);
  }    

  ngOnInit() {
  }

}
