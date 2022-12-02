import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;
  avaliable :any = [];

  serchProd: FormGroup | any;
  constructor(private productsService: ProductsService,private fb:FormBuilder) {}

  async ngOnInit() {
    this.serchProd = this.fb.group({

      code : [null],
      quantity:[null]

    });


    // this.products = await this.productsService.getProducts();
  }


  async findProduct(){
    this.avaliable.push(await this.productsService.findProduct(this.serchProd.value.code,this.serchProd.value.quantity)) ;
    console.log(this.avaliable);



  }

}
