import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
export interface AuthResponseData{
  kind: string;

  token: string;
  idToken: string;
  username: string;



  refreshToken: string;
  expiresIn: string;
  localId: string;
  success: number;
  registered?: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:[null],
      password:[null]
    });
  }
  login(){
    console.log(this.loginForm.value);
    let authObs:Observable<AuthResponseData>;
    authObs = this.authService.login(this.loginForm.value.username,this.loginForm.value.password);
    authObs.subscribe(resData=>{
      console.log(resData);
      axios.post('https:///michelinApi.vinoitalia.gr/products/updateStock.php',{method:"STOCKUPDATE"})
                .then(resData=>{
                  console.log(resData.data);
                  this.router.navigate(['home']);
                })


    })
  }
}
