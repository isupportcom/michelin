import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {
  products:any;
  constructor(private productsService:ProductsService) { }

  async ngOnInit() {
    this.products = await  this.productsService.getProducts()
    console.log(this.products);

  }

}
