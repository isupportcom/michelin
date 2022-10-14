import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { AuthResponseData } from './login/login.component';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin:boolean = false;
  isAuth:boolean = false;
  loggedIn = new Subject<boolean>();
  cast = this.loggedIn.asObservable();
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log(username, password);
    return this.http
      .post<AuthResponseData>('https://michelinapi.vinoitalia.gr/login.php', {
        name: username,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError),
      tap((resData:any)=>{
        console.log(resData);

        if(resData.isAdmin==0){
          this.isAdmin = false;
        }else if(resData.isAdmin ==1 ){
          this.isAdmin = false;
        }
        localStorage.setItem('username',resData.username);
        this.handleAuthentication(resData.username,resData.id,resData.token,600,resData.isAdmin);
      })
      );
  }
  sendLoggedIn(flag: boolean){
    this.loggedIn.next(flag);
  }
  getAuthentication():boolean
  {
    return this.isAuth;
  }
  setAdmin(value:boolean){
    this.isAdmin = value;
  }
  getAdmin(){
    return this.isAdmin;
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'username_EXISTS':
        errorMessage = 'This username already exists.';
        break;
      case 'username_NOT_FOUND':
        errorMessage = 'This username does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(username:string,userId:string,token:string,expiresIn:number,isAdmin:number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000*6);
    console.log(expirationDate);

    const user = new User(username,userId,token,expirationDate,isAdmin);
    this.user.next(user);
    localStorage.setItem('user',JSON.stringify(user));

    this.autoLogin();
  }
  logout(){

    this.user.next(null);
    // console.log("hello");
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));


    localStorage.removeItem('user');
    localStorage.removeItem('username');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    window.location.reload();

  }
  autoLogin(){
    const userData: {
      username: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
      isAdmin:number

  } = JSON.parse(localStorage.getItem('user')|| '{}');
  console.log(userData);

  if(!userData){
    return;
  }else{
    let expiresIn = 600;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 * 6);

    const user = new User(userData.username,userData.id,userData._token,expirationDate,userData.isAdmin);
    this.user.next(user);
    localStorage.setItem("user",JSON.stringify(user));
    const loadedUser = new User(userData.username,userData.id,userData._token, new Date(userData._tokenExpirationDate),userData.isAdmin);
    console.log(new Date().getTime());
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log(expirationDuration);


       this.autoLogout(expirationDuration);
    }
  }
}
autoLogout(expirationDuration: number){
  console.log(expirationDuration/6000);
  console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
  this.tokenExpirationTimer = setTimeout(() => {
    this.logout();
  }, expirationDuration);

}
}
