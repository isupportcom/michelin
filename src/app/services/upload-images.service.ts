import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  constructor(
    private http : HttpClient
  ) { }

  imageUpload(image:File,mtrl:string) : Observable<any>{
    console.log(image)
    var formData :any = new FormData();
    formData.append("fileToUpload",image);

    return this.http.post("https://michelinapi.vinoitalia.gr/upload.php",formData,{
      reportProgress:true,
      observe:'events'
    }).pipe(

    )
  }

}
