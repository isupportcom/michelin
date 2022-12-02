import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  handleOver(el: any){
    setTimeout(() => {
      el.children[1].style.opacity = '1';
    },200)
    el.children[1].style.display = 'flex';

  }

  handleLeave(el: any){
      el.children[1].style.display = 'none';
      setTimeout(() => {
        el.children[1].style.opacity = '0';
      },200)
  }
}
