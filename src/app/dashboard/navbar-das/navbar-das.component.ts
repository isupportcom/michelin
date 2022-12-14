import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-das',
  templateUrl: './navbar-das.component.html',
  styleUrls: ['./navbar-das.component.css']
})
export class NavbarDasComponent implements OnInit {

  constructor(private router:Router,) { }

  ngOnInit(): void {
  }

    navigateTo(destination:string){

      this.router.navigate([destination])


  }
}
