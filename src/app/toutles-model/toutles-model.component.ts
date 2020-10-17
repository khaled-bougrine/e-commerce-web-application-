import { Component, OnInit } from '@angular/core';
import { ModelService } from '../service/Model.service';

@Component({
  selector: 'app-toutles-model',
  templateUrl: './toutles-model.component.html',
  styleUrls: ['./toutles-model.component.css']
})
export class ToutlesModelComponent implements OnInit {
	list:any[];
  mode:string='model';
  images:string[]=[];
  retrieveResonse:any

  constructor( public service: ModelService) { }

  ngOnInit(): void {
    
  
  this.service.getAll('getallModels').subscribe(res=>{

      this.list=res;
      console.log(this.list)


    });

  	}
    getallimages(){
      this.images=[];
      for(let i in this.list){
        this.service.getImages(this.list[i].images[0]).subscribe(
          
            res => {
          this.retrieveResonse = res;
         
           this.images.push ( 'data:image/jpeg;base64,' + this.retrieveResonse.picByte);
        },
           (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      }
          )
      }
    

      console.log(this.images)
      
      

    }
     accesoire(){
         this.service.getAll('getallAccesoire').subscribe(res=>{
           this.mode='accesoire'
      this.list=res;
      this.getallimages();
       console.log(this.list)

    });
      
    }
    tissus(){
      console.log('hhhhhhhh ;)')
        this.service.getAll('getallTissus').subscribe(res=>{
          this.mode='tissus'
      this.list=res;
      this.getallimages();
      
    
      console.log(this.list)

    });
    }
    model(){
             this.service.getAll('getallModels').subscribe(res=>{
               this.mode='model'
      this.list=res;
      this.getallimages();
      console.log(this.list)

    });

    }
    deleteModel(id){
      this.service.delete(this.mode,id).subscribe(
        res=>{
          this.model();
          console.log('hhhhhh:)')
        }
        )
      
    }



   
  	}
  


