import { Component, OnInit } from '@angular/core';
import { ModelService } from '../service/Model.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup ,FormBuilder,FormArray} from '@angular/forms';
import { ConfigService } from '../service/Config.service';


@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.component.html',
  styleUrls: ['./update-model.component.css']
})
export class UpdateModelComponent implements OnInit {
model:string;
id:string;
modelUpdate:any;
url:any;
userForm:FormGroup;
////

	selectedFile:File;
	
 
  modelList:string[];
  coloreList:string[];

	listOfimage:String[]=[];

  constructor(public service: ModelService, private formBuilder:FormBuilder,private route:ActivatedRoute,public configservice:ConfigService) { }

  ngOnInit(): void {
   this.model = this.route.snapshot.params['id1'];
    this.id = this.route.snapshot.params['id2'];
   this.service.getElementParId(this.model,this.id).subscribe(res=>{
      this.modelUpdate=res;
         if(this.model==='tissus'){
         	this.modelList= this.configservice.getmodelTissus(this.modelUpdate.fabric)
       this.coloreList=this.configservice.getColoreTissus(this.modelUpdate.fabric);

         
         	console.log(this.modelUpdate)
       this.userForm = this.formBuilder.group({
           fabric:this.modelUpdate.fabric,
         type:this.modelUpdate.type,
         name:this.modelUpdate.name,
      description:this.modelUpdate.description,
      price: this.modelUpdate.price,
      isnew: this.modelUpdate.isnew,
      bestprice: this.modelUpdate.bestprice,
      solde:this.modelUpdate.solde,
      colore:this.modelUpdate.colore,
      modele:this.modelUpdate.modele,
      length:this.modelUpdate.length,
      nbserie:this.modelUpdate.nbserie,
      idModels:this.formBuilder.array(this.modelUpdate.idModels),
      fournisseur:this.modelUpdate.formBuilder

     })

       


    
       	
   }else if(this.model==='accesoire'){
      this.userForm = this.formBuilder.group({


    
   name:'',
     colore:'',
    price:'',
    isnew:'',
     bestprice:'',
    solde:'',
     description:'',
     type:'',
     nbserie:'',
    
    idModels:this.formBuilder.array([]),
    fournisseur:''
  });
    }

   




   else{
  	   this.userForm = this.formBuilder.group({

         pourquoi:'',
  	   	name:'',
      description: '',
      price: '',
      isnew: '',
      bestprice: '',
      solde:0,
      colore:'',
      modele:'',
      composants: this.formBuilder.array([])
      //composantLenght:this.formBuilder.array([])

       




    }
    );

     }
  }

  )








  }

  getComposant(): FormArray {
    return this.userForm.get('composants') as FormArray;

}
 getIdModel(): FormArray {
    return this.userForm.get('idModels') as FormArray;

}
addIdModel(){
   const newComposant = this.formBuilder.control(null);
   this.getIdModel().push(newComposant)

}

  addcomposant() {
    const newComposant = this.formBuilder.group({
      id:null,
      idModel:'',
      length:'',
      composant:'',
      nbserie:''
    }

      );

    this.getComposant().push(newComposant);
     
}
onSubmitForm(){

}
onUpload(){

}
onFileChanged(d){

}


}
