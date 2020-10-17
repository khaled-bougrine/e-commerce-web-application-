import { Model } from '../models/Model.model';
import { Tissus } from '../models/Model.tissus';
import { Accesoire } from '../models/Model.accesoire';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdEtLength } from '../models/Model.IdEtLength';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class  ModelService{
	composant:any[]=[];
	list:Model[];
	

	  constructor(private httpClient: HttpClient) { 

	     
          
        
   
	  }

	  //---------------postModel------------------
	  postModel(model:Model){
	  	  this.httpClient
      .post('http://localhost:8080/addModel', model)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

	  }
	  //------------------postTissus-----------------
	  postTissus(tissus:Tissus){
	  	  this.httpClient
      .post('http://localhost:8080/addTissus', tissus)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

	  }
	  //====================GetImages=====================

	  getImages(imageName:string){
	  	return this.httpClient.get('http://localhost:8080/get/' + imageName);
      
  }

	  
	    //------------------postAccesiore-----------------
	  postAccesiore(accesoire:Accesoire){
	  	  this.httpClient
      .post('http://localhost:8080/addAccesiore', accesoire)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );

	  }
	  //---------get----Element---par---id -----------

	  getElementParId(id1:string,id2:string):Observable<Model>{
	  	return this.httpClient.get<Model>('http://localhost:8080/getById/'+id1+'/'+id2)

	  }
	  //================GET ALL======================
	  getAll(id:string):Observable<any[]>{
	  	return this.httpClient.get<any[]>('http://localhost:8080/'+id)

	  }


	  //------------------postImages------------------
	  postImage(image:File){

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', image, image.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log('Image uploaded successfully')
        } else {
          console.log('Image not uploaded successfully')
        }
      }
      );

	  }
	  //-=======================getModelsByUtilisation==============-
	  getModelsByUtilisation(id1:string ,id2:string):Observable<Model[]>{

	     return this.httpClient.get< Model[]>('http://localhost:8080/get/'+id1+'/'+id2)
      
	  }
	  //=====================get PAR NBSERIE===============
	  getByNbserie(id1:string ,id2:string):Observable<Accesoire[]>{
	  	return this.httpClient.get<Accesoire[]>('http://localhost:8080/getByNbserie/'+id1+'/'+id2)


	  }
	  //======================DELETE=======================
	  delete(id:string,name:number){
	  	return this.httpClient.delete('http://localhost:8080/delete/'+id+'/'+name)
	  }
	


	testlist(list:string[],element:string):boolean{
		
		for(var color in list ){
	  				if(element===color){
	  					console.log('bonjo')
	  					
	  					return true;
	  				}
	  			}return false;


	}
	//======================filtrage================//

	  Filter(min,max,colore,modele,list1:Model[]):any[]{
	 
		/*

	  	
	  	if(colore!=null){
	  	console.log(colore)
	  	
	  		  	var n=list1.length;
	  	do {
	  		console.log(n);
	  		n=n-1;
	  		var model =this.list1.pop()
	  		if(this.testlist(model.colore,colore)){
	  			this.list1.push(model);

	  		}
	  		// code...
	  	} while (n>0);
	  	
	  		
	  		
	  	  list1=list1.filter(rest=>{   return rest.colore===colore})
	  			console.log(this.list1)
	  	}

   
      if (min!=null){
      list1=list1.filter(rest=>{   return rest.price>=min;})
  }
    if(max!=null){
      list1= list1.filter(rest=>{   return rest.price<=max;})
  }
  if(modele!=null){
  	list1= list1.filter(rest=>{   return rest.modele===modele;})

  }
  */
  return list1;

      }
/*
      getsameseries(){
      	return this.list2;

      }

*/




}

