import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService,
              private router : Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(){
    this.error = null;
  }

  onSubmit(form: NgForm){
  // console.log(form.value); 

  if(!form.value){
    return
  }

  let authObs: Observable<AuthResponseData>

  const email = form.value.email;
  const password = form.value.password;
  this.isLoading = true;
  if(this.isLoginMode){
    authObs = this.authService.login(email,password)
  }
  else{
    authObs = this.authService.login(email,password)
  }
  authObs.subscribe(
    resData => {
      console.log(resData)
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
    errorMessage => {
      //console.log(`This is the message`,error.error.error.message);
      this.error = errorMessage;
      this.isLoading = false;
    }    
  );
    form.reset()
  }
}

