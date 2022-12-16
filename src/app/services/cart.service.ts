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
  async order(products : any){

    console.log(products);
// http://localhost:3001/michelin/placeOrder
//https://michelinNodeRest.vinoitalia.gr/michelin/placeOrder
    let order = await axios.post('https://michelinNodeRest.vinoitalia.gr/michelin/placeOrder',{
     products : products,
     trdr : "5785"
    })
      console.log(order.data)
      return order.data.response.DocumentID;


  }
}
