import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  loadedUser:any = JSON.parse(localStorage.getItem('user')||'{}');
  constructor() { }

 async addToCart(product:any){
    if(product.qty == undefined){
      product.qty = 1;
    }
    let req = await axios.post("https://michelinapi.vinoitalia.gr/cart/addToCart.php",{
        mtrl:product.mtrl,
        code:product.code,
        name:product.name,
        cai:product.cai,
        tipos_elastikou:product.tipos_elastikou,
        omada:product.omada,
        marka:product.marka,
        zanta:product.zanta,
        epoxi:product.epoxi,
        upddate:product.upddate,
        apothema_thess:product.apothema_thess,
        apothema_athens:product.apothema_athens,
        trdr:this.loadedUser.id,
        qty:product.qty

    })
    return req.data;

}
async removeOne(product:any){

  let req = await axios.post("https://michelinapi.vinoitalia.gr/cart/removeOne.php",
  {
    trdr:this.loadedUser.id,
    mtrl:product.mtrl
  });
  return req.data;
}
async clearAll(){
  let req = await axios.post("https://michelinapi.vinoitalia.gr/cart/clearAll.php",
  {
    trdr:this.loadedUser.id
  });
  return req.data;
}
addImagePopup = new Subject<any>();
cast = this.addImagePopup.asObservable();
sendAddImagePopup(prod:any){
  this.addImagePopup.next(prod);
}

}
