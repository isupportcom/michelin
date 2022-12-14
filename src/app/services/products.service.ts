import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loadedUser = JSON.parse(localStorage.getItem('userData')||'{}');
  delivery_date_arr:any = [];
  available_dates:any = [];
  constructor() { }

  async getProducts(){
    let request = await axios.post("https://michelinapi.vinoitalia.gr/products/getProducts.php",{method:"ALLPRODUCTS"})
    console.log(request.data.data)
    return request.data.data;
  }
  async findProduct(code:string,qty:number,name:string,id:number){
    let req;
    if(id ==2 ){
       req = await axios.post("https://michelinNodeRest.vinoitalia.gr/michelin/order",{
        name:name,
        qty:qty
    })
    console.log(req.data);
    return req.data.product
    }else{
      console.log(code,qty);
       req = await axios.post("https://michelinNodeRest.vinoitalia.gr/michelin/order",{
        cai:code,
        qty:qty
    })

    console.log(req.data)
    for(let i =0 ; i <req.data.response.delivery_dates.length;i++){
        this.delivery_date_arr[i] = req.data.response.delivery_dates[i].delivery_dates
        this.available_dates[i] =req.data.response.delivery_dates[i].quantity_valiue
    }
    return {
      name: req.data.product_name[0],
      available : req.data.response.availability[0].avaliable,
      dates : this.delivery_date_arr,
      qtys_on_date : this.available_dates,
      product: req.data.product
    }

    }


  }
  async getProds(){
    let req = await axios.post("https://michelinapi.vinoitalia.gr/xmls/getAllSaved.php",{
      trdr:this.loadedUser.id
    })
    return req.data;
  }

  addToCart(product:any,qty:any){
    console.log(this.loadedUser);
    console.log(product);
    console.log(qty);
    axios.post('https://michelinNodeRest.vinoitalia.gr/products/addToCart',{
      mtrl : product.product.mtrl,
      trdr : this.loadedUser.id,
      qty :qty,
      availability :product.available,
      dates : product.dates.join(',')
    })
    .then(resData=>{
      console.log(resData.data)
    })
  }

}
