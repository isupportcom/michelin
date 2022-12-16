import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {
  message :string ="";
  constructor() { }

  ngOnInit(): void {
    console.log("Hello")
  }
  updte(){
    axios.post('https://michelinNodeRest.vinoitalia.gr/products/updateProducts',{method:"MTRLUPDATE"})
    .then(resData=>{
      console.log(resData.data)
      axios.post('https://michelinNodeRest.vinoitalia.gr/products/updateModel',{method:"MTRMODEL"})
      .then(resData=>{
        console.log(resData.data)
        axios.post('https://michelinNodeRest.vinoitalia.gr/products/updateCategories',{method:"MTRCATEGORY"})
        .then(resData=>{
          console.log(resData.data);
          axios.post('https://michelinNodeRest.vinoitalia.gr/products/updateGroup',{method:"MTRGROUP"})
          .then(resData=>{
            console.log(resData.data);
            axios.post("https://michelinNodeRest.vinoitalia.gr/products/updateManfctr",{method:"MTRMANFCTR"})
            .then(resData=>{
              console.log(resData.data);
              axios.post('https://michelinNodeRest.vinoitalia.gr/products/updateMark',{method:"MTRMARK"})
              .then(resData=>{
                console.log(resData.data);
                axios.post('https://michelinNodeRest.vinoitalia.gr/products/updateStock',{method:"STOCKUPDATE"})
                .then(resData=>{
                  console.log(resData.data);
                  this.message = "Products Updated";
                })
              })
            })
          })
        })
      })
    })
  }
}
