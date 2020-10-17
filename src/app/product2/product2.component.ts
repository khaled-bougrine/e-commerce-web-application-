import { Component, OnInit,Input } from '@angular/core';
import {ModelService} from '../service/Model.service';


@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.css']
})
export class Product2Component implements OnInit {
	 @Input() product : any ;
	 retrieveResonse:any;
	 retrievedImage:any;

  constructor( public service:ModelService) {
  

  }

  ngOnInit(): void {
             this.service.getImages(this.product.images[0])
    .subscribe(
        rest => {
          this.retrieveResonse = rest;
         
          this.retrievedImage ='data:image/jpeg;base64,' + this.retrieveResonse.picByte;
        },
           (error) => {
        console.log('Uh-oh, an error----------- occurred! : ' + error);
      }
      );
  }

}
