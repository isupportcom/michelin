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
    axios.post('https:///michelinApi.vinoitalia.gr/products/updateProduct.php',{method:"MTRLUPDATE"})
    .then(resData=>{
      console.log(resData.data)
      axios.post('https://michelinApi.vinoitalia.gr/categories/updateModel.php',{method:"MTRMODEL"})
      .then(resData=>{
        console.log(resData.data)
        axios.post('https://michelinApi.vinoitalia.gr/categories/updateCategories.php',{method:"MTRCATEGORY"})
        .then(resData=>{
          console.log(resData.data);
          axios.post('https://michelinApi.vinoitalia.gr/categories/updateGroup.php',{method:"MTRGROUP"})
          .then(resData=>{
            console.log(resData.data);
            axios.post("https://michelinApi.vinoitalia.gr/categories/updateManfctr.php",{method:"MTRMANFCTR"})
            .then(resData=>{
              console.log(resData.data);
              axios.post('https://michelinApi.vinoitalia.gr/categories/updateMark.php',{method:"MTRMARK"})
              .then(resData=>{
                console.log(resData.data);
                axios.post('https:///michelinApi.vinoitalia.gr/products/updateStock.php',{method:"STOCKUPDATE"})
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
