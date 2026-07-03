import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParcelDTOByCustomerId } from '../models/parcelDTOByCustomerId';
import { Parcel } from '../models/parcel';

@Injectable({
  providedIn: 'root',
})
export class ParcelService {

  ruta_servidor: string = "http://localhost:8080/seedair";
  recurso: string = "parcels";
  
  constructor(private http:HttpClient){}

  listParcelsByCustomerId(id: number){
    return this.http.get<ParcelDTOByCustomerId[]>(this.ruta_servidor+"/"+this.recurso+"/list/"+id);
  }

  getById(id: number){    
    return this.http.get<ParcelDTOByCustomerId>(this.ruta_servidor + "/" + this.recurso + "/getById/" + id.toString());
  }

  add(parcel: Parcel){
    return this.http.post<Parcel>(this.ruta_servidor+"/"+this.recurso +"/register" , parcel);
  }

  delete(id: number){
    return this.http.delete<void>(this.ruta_servidor+"/"+this.recurso+"/logical_delete/"+id);
  }

  edit(parcelDTO: ParcelDTOByCustomerId){
    
    return this.http.put<ParcelDTOByCustomerId>(this.ruta_servidor+"/"+this.recurso+"/update", parcelDTO);
  } 

}