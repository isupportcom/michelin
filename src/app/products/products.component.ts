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
  avaliable: any = [];
  qty:number|any;
  serchProd: FormGroup | any;
  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.serchProd = this.fb.group({
      code: null,
      quantity: [50],
      name: null,
    });

    // this.products = await this.productsService.getProducts();
  }

  async findProduct() {
    this.avaliable=[];

    console.log(this.serchProd.value);
    if (this.serchProd.value.name != null && this.serchProd.value.name != '') {
      console.log('hello 1');
      this.products = await this.productsService.findProduct(
        this.serchProd.value.code,
        this.serchProd.value.quantity,
        this.serchProd.value.name,
        2
      );

    } else {

      console.log('hello 2');
      this.avaliable.push(
        await this.productsService.findProduct(
          this.serchProd.value.code,
          this.serchProd.value.quantity,
          this.serchProd.value.name,
          1
        )

      );
      this.serchProd.setValue({name:null,quantity:50,code:null});
    }


  }
  async selectProd(cai: string) {

    console.log(cai, this.serchProd.value.quantity);

    this.avaliable.push(
      await this.productsService.findProduct(
        cai,
        this.serchProd.value.quantity,
        '',
        1
      )
    );
    this.removeFromProd(cai);
  }
  removeFromProd(cai:string){
    for(let i = 0 ; i < this.products.length;i++){
      if(cai == this.products[i].cai){
        this.products.splice(i,1)
        break;
      }
    }
  }

  addToCart(product:any){

    console.log(product);
    this.productsService.addToCart(product,this.qty);

  }

}
