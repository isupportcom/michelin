import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
@Input() product:any;
  constructor(
    private cartService:CartService
  ) { }

  ngOnInit(): void {
  }
  addToCart(product:any){
    let loadedUser = JSON.parse(localStorage.getItem('user')||'{}');
    this.cartService.addToCart(product).then((res:any)=>{
      console.log(res);
    })


  }

}
