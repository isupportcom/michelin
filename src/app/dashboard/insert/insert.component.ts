import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
})
export class InsertComponent implements OnInit {
  products: any;
  window:boolean = false;

  constructor(private productsServcie: ProductsService,private cartService:CartService,private modalService:ModalService,private main:DashboardComponent) {}

  async ngOnInit() {
    this.products = await this.productsServcie.getProducts();
    this.main.products.subscribe((res:any)=>{
      console.log(res
        );

      this.products = res.data;
    })
    this.modalService.isClicked.subscribe((res:any)=>{
      this.window = false;
    })
  }
  openMain(item:any) {
    this.cartService.sendAddImagePopup(item);
  }
}
