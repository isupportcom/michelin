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

    let order = await axios.post('https://michelinNodeRest.vinoitalia.gr/michelin/placeOrder',{
      cai : products[0].cai,
      dates:products[0].date,
      qtys: products[0].qty_on_dates
    })
      console.log(order.data)
      return order.data.response.DocumentID;


  }
}
