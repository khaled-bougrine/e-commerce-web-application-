export class  ConfigService{

	//---listdeModeldetissus-------------------
	modelTissue={cotton:['ddddd','cgfgcfh'],voile:['vgghh','fdgghh'],organza:[],satin:[],silk:[],linen:[],plush:[]


	}
	getmodelTissus(name:string){
		if(name=='cotton')
	        return this.modelTissue.cotton
	    else if(name=='voile')
	        return this.modelTissue.voile
	        else if(name=='organza')
	        return this.modelTissue.organza
         else if(name=='satin')
	        return this.modelTissue.satin
         else if(name=='silk')
	        return this.modelTissue.silk
        else if(name=='linen')
	        return this.modelTissue.linen
         else if(name=='plush')
	        return this.modelTissue.plush


	}



	//'plaid','stripte'
	


	



	//-----------listdeFabricDeTissus------------
	fabricList:String[]=[
	'cotton','voile','organza','satin','silk','plush','linen'
	];
	//-----------listdetypedecomposant
	typeComposant:String[]=['embrasses','poteaux','frange','mercerie'];
	pour:String[]=['fenetre','salon','enfant','chambre']


	
}