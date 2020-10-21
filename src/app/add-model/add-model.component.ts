import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,FormArray} from '@angular/forms';
import { ModelService } from '../service/Model.service';
import { ConfigService } from '../service/Config.service';


import { Model } from '../models/Model.model';
import { Accesoire } from '../models/Model.accesoire';
import { Tissus } from '../models/Model.tissus';
import { IdEtLength } from '../models/Model.IdEtLength';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
	userForm:FormGroup;
	selectedFile:File;
	url:string;
  model:String;
  modelList:string[];
  coloreList:string[];

	listOfimage:String[]=[];



  constructor(private formBuilder: FormBuilder,public service: ModelService, private route: ActivatedRoute,public configservice:ConfigService) { }

    public onFileChanged(event) {
     //Select File
    var reader =new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
    	 this.url=event.target.result;
    }
   
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }
   onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    this.service.postImage(this.selectedFile)
    this.listOfimage.push(this.selectedFile.name)


}

  ngOnInit(): void {
    
     this.model = this.route.snapshot.params['model'];

     if(this.model==='tissus'){
       this.userForm = this.formBuilder.group({
           fabric:'',
         type:'',
         name:'',
      description: '',
      price: '',
      isnew: '',
      bestprice: '',
      solde:0,
      colore:'',
      modele:'',
      length:'',
      nbserie:'',
      idModels:this.formBuilder.array([]),
      fournisseur:''

     });
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
     if(this.model==='tissus'){
        this.userForm.get("fabric").valueChanges
      .subscribe(f => {
        console.log(f);
       this.modelList= this.configservice.getmodelTissus(f)
       this.coloreList=this.configservice.getColoreTissus(f);



      })
    }
  	    
  }
  onSubmitForm(){
  	 const formValue = this.userForm.value;
  	 console.log(formValue);
    

    if(this.model==='tissus'){
      const tissus= new Tissus(null,
           formValue['name'],
         formValue['type'],

    
       formValue['colore'],
       formValue['price'],
       formValue['isnew'],
       formValue['bestprice'],
       formValue['solde'],
       formValue['description'],
      formValue['modele'],
       this.listOfimage,
       formValue['nbserie'],
        formValue['length'],
          
          formValue['fabric'],
            formValue['idModels'],
   
            formValue['fournisseur']
      
      );
      console.log(tissus)
       this.service.postTissus(tissus)

    }else if(this.model==='accesoire'){
      const accesoire=new Accesoire(null,
        formValue['name'],
         formValue['type'],
       formValue['colore'],
       formValue['price'],
       formValue['isnew'],
       formValue['bestprice'],
       formValue['solde'],
       formValue['description'],
       this.listOfimage,
       formValue['idModels'],
       formValue['nbserie'],
       formValue['fournisseur']
      



        )
      this.service.postAccesiore(accesoire);
      console.log(accesoire)
    }

    else{
      const idetmodel:IdEtLength[]=formValue['composants'];
     const model= new Model(null,
       formValue['pourquoi'],
       formValue['name'],
       formValue['colore'],
       formValue['price'],
       formValue['isnew'],
       formValue['bestprice'],
       formValue['solde'],
       formValue['description'],
      formValue['modele'],
       this.listOfimage,
       idetmodel

      );

      //console.log(model);
     // const model= new Model(1,'khaled','hgh',25,true,true,2,'kjkj','gfg',[1,2],[1]);
       console.log(model);
     this.service.postModel(model);}
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

}
