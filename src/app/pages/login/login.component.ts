import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockchainService } from 'src/app/services/blockchain.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class TryLoginComponent implements OnInit {
  datalogin: {privateKey: string, publicKey: string} ;
  dataNode: any[];
  node: any;
  


  constructor( 
    private router: Router, 
    private BS: BlockchainService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    ) {
    this.dataNode = BS.node;
    console.log(this.dataNode)
   }

  ngOnInit() {
    // this.buildForm();
  }

  login(){
    for(const data of this.BS.node){
      if (data.privateKey === this.datalogin.privateKey && data.publicKey === this.datalogin.publicKey) {
        this.node = data
        console.log("data ada")
      } else{
        console.log("data tidak ada")
      }
    }
    console.log(this.node.level)
  }

  // buildForm() {
  //   this.formLogin = new FormGroup({
  //     'email': new FormControl(null, [Validators.required]),
  //     'password': new FormControl(null, [Validators.required])
  //   });
  // }
  
  // onSubmit() {
  //   const data = this.formLogin.value;
  //   if (data.email && data.password) {
  //     this.authService.post(data).subscribe(
  //       response => {
  //         this.data = response;
  //         localStorage.setItem('id_token', this.data.token);
  //         this.router.navigate(['/students'])
  //       },
  //       error => {console.log('gagal');
  //       console.log(error);
  //     });
  //   }
  // }

}
