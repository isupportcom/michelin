import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any ;
  constructor() { }

async ngOnInit() {

  let request = await axios.post("https://michelinapi.vinoitalia.gr/products/getProducts.php",{method:"ALLPRODUCTS"})
  console.log(request.data.data)
  this.products = request.data.data;

  }

}
