import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ModelService} from '../service/Model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
	modelshow:any;
	composant:any[]=[];

	j:number=0;
  length:Number;
  sameseries:any[][]=[];
   retrieveResonse:any;
  retrievedImage: any[]=[];
  same:any;


  constructor(private route: ActivatedRoute, public service: ModelService){} 

  ngOnInit(): void {
    const id1 = this.route.snapshot.params['id1'];
    const id2= this.route.snapshot.params['id2'];
    this.service.getElementParId(id1,id2).subscribe(res=>{
      this.modelshow=res;
       for(var i in this.modelshow.images ){
        this.service.getImages(this.modelshow.images[i])
    .subscribe(
        rest => {
          this.retrieveResonse = rest;
         
          this.retrievedImage.push ( 'data:image/jpeg;base64,' + this.retrieveResonse.picByte);
        },
           (error) => {
        console.log('Uh-oh, an error----------- occurred! : ' + error);
      }
      );

    }

     console.log(this.modelshow.composants)
      for(var i in this.modelshow.composants ){
        this.service.getElementParId(this.modelshow.composants[i].composant,this.modelshow.composants[i].idModel)
    .subscribe(
        res7t => {
          this.service.composant.push(res7t);
     
          ////////////////////////////////



        },
           (error) => {
        console.log('Uh-oh, an error ------occurred! : ' + error);
      }
      );
          this.service.getByNbserie(this.modelshow.composants[i].composant, this.modelshow.composants[i].nbserie)
    .subscribe(
      restt=>{
        console.log('dddddd')
        this.sameseries.push(restt);
      },
      (error) => {
        console.log('Uh-oh, an e-----rror occurred! : ' + error);
      }
      );
  
 

    }
         /*  for(var i in this.composant ){
      this.service.getByNbserie('accesoire', this.same.nbserie)
    .subscribe(
      res=>{
        this.sameseries.push(res);
      },
      (error) => {
        console.log('Uh-oh, an e-----rror occurred! : ' + error);
      }
      );
  }*/
  console.log("ggggggggggggggggggggggggggggggggggggg")
  console.log( this.sameseries)

  })

  }
  






  nextimg(){
  	this.j=(this.j+1)%this.modelshow.images.length
  }
  previesimg(){
  	if(this.j==0){
  		this.j=this.modelshow.images.length
  	}
  	this.j=(this.j-1)

  }
  passimg(e){
  	this.j=e;

  }
  donnerclass(e){
  	if(e==this.j){
  		return 'classActive'
  	}else
  	    return 'classInActive'
  }

}
