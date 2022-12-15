import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loadedUser = JSON.parse(localStorage.getItem('userData')||'{}');
  message:string = ""
  products:any;
  constructor(
    private cartService : CartService
  ) { }

  ngOnInit(): void {

    axios.post('https://michelinNodeRest.vinoitalia.gr/products/fetchCart',{
      trdr : this.loadedUser.id
    })
    .then(resdata=>{
      console.log(resdata.data)
      this.products = resdata.data.products;
    })

  }

  async removeCartItem(product:any){
      this.products = await this.cartService.removeCartItem(product);
      console.log(this.products);
  }
  async order(){
   this.message=await this.cartService.order(this.products) + " Order Completed";
  }
}
