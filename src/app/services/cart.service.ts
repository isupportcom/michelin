import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  loadedUser = JSON.parse(localStorage.getItem('userData')||'{}');
  constructor() { }



  async removeCartItem(product:any){

    let remove = await axios.post('https://michelinNodeRest.vinoitalia.gr/products/removeCartItem',{
      trdr: this.loadedUser.id,
      mtrl: product.mtrl
    })

      console.log(remove.data);
      return remove.data.products


  }
}
