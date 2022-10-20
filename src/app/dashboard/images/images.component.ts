import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  products:any;
  constructor(private productsService:ProductsService) { }

 async ngOnInit() {
        this.products = await this.productsService.getProducts();
  }

}
