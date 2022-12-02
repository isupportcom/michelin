import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loadedUser:any = JSON.parse(localStorage.getItem('userData')||'{}');
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    console.log(this.loadedUser);
  }



  logout(){
    this.authService.logout();
  }

}
