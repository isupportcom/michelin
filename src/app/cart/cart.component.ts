import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any=[];
  constructor(private cartService:CartService) { }

  async ngOnInit() {

    this.fetchCart();

  }
  async fetchCart(){
    let loadedUser = JSON.parse(localStorage.getItem('user')||'{}');
    let req = await axios.post("https://michelinapi.vinoitalia.gr/cart/getCart.php",{trdr:loadedUser.id});
    this.products = req.data.cart;
    console.log(req.data);
  }
  removeFromCart(product:any){
      this.cartService.removeOne(product).then((resData:any)=>{
        console.log(resData);
        this.products = resData.cart;
      })
  }
  clearAll(){
    this.cartService.clearAll().then((resData:any)=>{
        console.log(resData);
        this.products = resData.cart;

    })
  }
  stepper(myInput:any,btn:any,item:any){

    let index: any;

      for(let i=0; i< this.products.length;i++){
        if(item.mtrl == this.products[i].mtrl){
          index = i;
        }
      }

      let id = btn.id;
      let min = myInput.getAttribute("min");
      let max = myInput.getAttribute("max");
      let step = myInput.getAttribute("step");
      let val = this.products[index].qty;
      let calcStep = (id == "increment") ? (step*1) : (step * -1);
      let newValue = +val + calcStep;
      this.products[index].qty = newValue;


      if(newValue >= min && newValue <= max){
        myInput.setAttribute("value", this.products[index].qty);
      }
      this.cartService.addToCart(this.products[index]).then(resData=>{
        this.fetchCart();
        console.log(resData);
      })


  }

}
