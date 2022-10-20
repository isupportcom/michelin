import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  flag:boolean = false;
  window:boolean = false;
  products= new Subject<any>();
  cast = this.products.asObservable();
  image: any;
  constructor(private cartService : CartService,private modalService:ModalService) { }

  ngOnInit(): void {

    this.cartService.addImagePopup.subscribe((resData) => {
      if(resData == false){
        this.flag = false;
        this.window =false;
      }
      else{
        console.log(resData);
        this.flag = true;
        this.window =true;

        this.modalService.image.subscribe((res:any)=> {
          this.image = res
          console.log(this.image);
          console.log(resData.mtrl);


            axios.post("https://michelinapi.vinoitalia.gr/updateSingleImage.php",{
              mtrl:resData.mtrl,
              image:'https://michelinapi.vinoitalia.gr/uploads/'+this.image.image
            })
              .then(res=> {
                console.log(res.data)
                this.products.next(res.data)


              } )
            // window.location.reload()
        })
      }
    })
  }

}
