import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DroneModelDTO } from '../models/droneModelDTO';
import { DroneModelListDTO } from '../models/droneModelListDTO';

@Injectable({
  providedIn: 'root',
})
export class DroneModelService {

  ruta_servidor: string = "http://localhost:8080/seedair";
  recurso: string = "droneModels";
  
  constructor(private http: HttpClient){}

  
  listDroneModels() {  
    return this.http.get<DroneModelListDTO[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getDroneModelById(idDroneModel: number){
    return this.http.get<DroneModelDTO>(this.ruta_servidor+ "/" +this.recurso + "/" + idDroneModel)
  }
  
  listByIsActive(isActive: boolean) { 
    return this.http.get<DroneModelListDTO[]>(this.ruta_servidor + "/" + this.recurso + "/isActive/" + isActive);
  }

  delete(id: number){
    return this.http.delete<void>(this.ruta_servidor+"/"+this.recurso+"/logicalDelete/"+id);
  }
  edit(droneModelDTO: DroneModelDTO){
        
    return this.http.put<DroneModelDTO>(this.ruta_servidor+"/"+this.recurso+"/update", droneModelDTO);
  }
  add(droneModelDTO: DroneModelDTO){
      return this.http.post<DroneModelDTO>(this.ruta_servidor+"/"+this.recurso +"/add" , droneModelDTO);
  }



}