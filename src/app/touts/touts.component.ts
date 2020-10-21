import { Component, OnInit } from '@angular/core';
import { ModelService } from '../service/Model.service';
import { ConfigService } from '../service/Config.service'
import { Model } from '../models/Model.model';
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-touts',
  templateUrl: './touts.component.html',
  styleUrls: ['./touts.component.css']
})
export class ToutsComponent implements OnInit {
  //testColore='Aquamarine';
  ischecked=false;
	min:number=null;
   max:number=null;
   colore:string=null;
   modele:string=null;
   id1:string;id2:string;
   nul=null;
    modelTissus:string[];
    coloreTissus:string[];
  list:Model[];
  list1:Model[];


  contactForm:FormGroup;



  constructor( public service: ModelService, private fb:FormBuilder,private route:ActivatedRoute ,public sreviceConfig:ConfigService,public router:Router) { 

         
  }

  ngOnInit(): void {
       
   this.id1 = this.route.snapshot.params['id1'];
          this.id2 = this.route.snapshot.params['id2'];
          console.log(this.sreviceConfig.modelTissue.cotton)
          if(this.id1==='tissus'){
                this.modelTissus=this.sreviceConfig.getmodelTissus(this.id2)
                this.coloreTissus=this.sreviceConfig.getColoreTissus(this.id2)
            

          }

  	this.service.getModelsByUtilisation(this.id1,this.id2).subscribe(res=>{
      this.list1=res;
      this.list=res;
    }


    );
    console.log(this.list)

   this.contactForm = this.fb.group({
  
   modele:null,min:null,max:null,colore:null,length:null
      
    });
     this.contactForm.get("modele").valueChanges
      .subscribe(f => {
        console.log(f);
        this.modelfilter(f);

      })
       this.contactForm.get("min").valueChanges
      .subscribe(f => {
        console.log(f);
        this.pricemin(f);

      })
          this.contactForm.get("max").valueChanges
      .subscribe(f => {
        console.log(f);
        this.priceMax(f);

      })
          this.contactForm.get("min").valueChanges
      .subscribe(f => {
        console.log(f);
        this.pricemin(f);

      })
                this.contactForm.get("colore").valueChanges
      .subscribe(f => {
        console.log(f);
        this.colors(f);

      })

  }

  test(){
    console.log('hhhh');
  }
  

     colors(e){
    


    this.colore=e;
    console.log(this.colore )
    console.log(this.min )
    console.log(this.max )
    this.list=this.service.Filter(this.min,this.max,this.colore,this.modele,this.list1);

  }
  price(min,max){

     //this.list=this.curtainservice.priceFilter(this.min,this.max)
    this.min=min;
    this.max=max;
    console.log(this.colore )
    console.log(this.min )
    console.log(this.max )
    this.list=this.service.Filter(this.min,this.max,this.colore,this.modele,this.list1);

  }
  priceMin(min){
    this.min=min;
    this.max=null;
    console.log(this.colore )
    console.log(this.min )
    console.log(this.max )
    this.list=this.service.Filter(this.min,this.max,this.colore,this.modele,this.list1);
  }
    pricemin(min){
    this.min=min;
    //this.max=null;
    console.log(this.colore )
    console.log(this.min )
    console.log(this.max )
    this.list=this.service.Filter(this.min,this.max,this.colore,this.modele,this.list1);
  }
  priceMax(max){
    this.max=max;
        this.list=this.service.Filter(this.min,this.max,this.colore,this.modele,this.list1);

  }
  allprice(){
    this.min=null;
    this.max=null;
    this.ngOnInit();
  }
  modelfilter(e){
    this.modele=e;
    console.log(e);
         this.list=this.service.Filter(this.min,this.max,this.colore,this.modele,this.list1);


  }
  allModel(){
    this.modele=null;
    this.list=this.service.Filter(this.min,this.max,this.colore,this.modele,this.list1);


  }
  fabricChange(fabric:string){
    this.router.navigate(['/tout/tissus/'+fabric]).then(()=>{
       this.ngOnInit();

    })

   
  }

  
   

}
