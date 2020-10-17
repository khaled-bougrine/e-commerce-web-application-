import { Component, OnInit ,Input} from '@angular/core';
import {ModelService} from '../service/Model.service';
import { Accesoire } from '../models/Model.accesoire';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sameseries',
  templateUrl: './sameseries.component.html',
  styleUrls: ['./sameseries.component.css']
})
export class SameseriesComponent implements OnInit {
   //nbserie:string;
	@Input() list:any[];

	d:number=0;
  f:number=2;
  @Input() index:number;
  retrieveResonse:any;
  retrievedImage:any;


  constructor( public service: ModelService) { }

  ngOnInit(): void {
       this.service.getImages(this.service.composant[this.index].images[0])
    .subscribe(
        res => {
          this.retrieveResonse = res;
         
          this.retrievedImage= 'data:image/jpeg;base64,' + this.retrieveResonse.picByte;
        },
           (error) => {
        console.log('Uh-oh, an--------- error occurred! : ' + error);
      }
      );


  
        console.log('serie')
    console.log(this.list)
  }

  next(){
    if(this.f+5<this.list.length)
          {this.f=this.f+5;
                  this.d=this.d+5;}
        else
       {   this.f=this.list.length
               this.d=this.d+5}
  }
  previes(){

       if(this.d-5>0){
          this.d=this.d-5;
       
        this.f=this.d+5;}
        else{
          this.d=0;
        
        this.f=5;
      }
  }
  
  change(i,pro){
    console.log(pro)
    this.service.composant[i]=pro;
       this.service.getImages(this.service.composant[this.index].images[0])
    .subscribe(
        res => {
          this.retrieveResonse = res;
         
          this.retrievedImage= 'data:image/jpeg;base64,' + this.retrieveResonse.picByte;
        },
           (error) => {
        console.log('Uh-oh, an--------- error occurred! : ' + error);
      }
      );
  
  }

  

  

}
