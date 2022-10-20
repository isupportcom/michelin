import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'michelin';
  loggedIn: boolean = true;
  constructor(private authService:AuthService,private route:ActivatedRoute){}
  ngOnInit(){
    this.authService.autoLogin();
    if (localStorage.getItem('username') == 'Admin') {
      this.authService.setAdmin(true);
    }
    this.route.data.subscribe((data: Data) => {
      console.log(data);
    });
    this.authService.loggedIn.subscribe((res) => {


      this.loggedIn = res;

    });
  }
}
