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
  async findProduct(code:string,qty:number){

    let req = await axios.post("https://michelinapi.vinoitalia.gr/xmls/xmlReq.php",{
        cai:code,
        qty:qty
    })
      // return req.data;
    console.log(req.data.response.deliver_dates);
    for(let i =0 ; i <req.data.response.deliver_dates.length;i++){
        this.delivery_date_arr[i] = req.data.response.deliver_dates[i].delivery_date
        this.available_dates[i] =req.data.response.deliver_dates[i].quantity_valiue
    }
    return {
      name: req.data.product_name[0],
      available : req.data.response.availability.avaliable[0],
      dates : this.delivery_date_arr,
      qtys_on_date : this.available_dates
    }
    // console.log(req.data);

    // for(let i =0; i< req.data.response.deliver_dates.length;i++){
    //   this.delivery_date_arr[i] = req.data.response.deliver_dates[i].delivery_date[0];
    //   this.available_dates[i]=req.data.response.deliver_dates[i].quantity_valiue[0];

    // }
    // console.log(req.data.product_name[0]);
    // console.log(this.delivery_date_arr);
    // console.log(this.available_dates)
    // console.log(this.available_dates.join(','));
    // console.log(this.delivery_date_arr.join(","),);
    // console.log(req.data.response.availability.avaliable[0]);
    // console.log(this.loadedUser.id);




    // let req2 = await axios.post("https://michelinapi.vinoitalia.gr/xmls/saveProduct.php",{
    //   name:req.data.product_name[0],
    //   price:"10$",
    //   delivery_date:this.delivery_date_arr.join(","),
    //   available: req.data.response.availability.avaliable[0],
    //   trdr: this.loadedUser.id,
    //   delivery_availability: this.available_dates.join(',')
    // })
    // return req2.data;
  }
  async getProds(){
    let req = await axios.post("https://michelinapi.vinoitalia.gr/xmls/getAllSaved.php",{
      trdr:this.loadedUser.id
    })
    return req.data;
  }

}
