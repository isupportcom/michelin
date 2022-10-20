import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-image-popup',
  templateUrl: './add-image-popup.component.html',
  styleUrls: ['./add-image-popup.component.css']
})
export class AddImagePopupComponent implements OnInit {
  images:any;
  constructor(private cartService:CartService,private modalService:ModalService) { }

  async ngOnInit() {

    let req =await axios.post('https://michelinapi.vinoitalia.gr/getAllImages.php')
    this.images = req.data;
    console.log(this.images);

  }
  close(){
    this.cartService.sendAddImagePopup(false);
}
sendNUDES(image:string){
  this.modalService.sendImage(image);
  this.cartService.sendAddImagePopup(false);
}
}
