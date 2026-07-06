import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DroneBrandResponseDTO } from '../models/droneBrandResponseDTO';
import { DroneBrandRegisterDTO } from '../models/droneBrandRegisterDTO';

@Injectable({
  providedIn: 'root',
})
export class DroneBrandService {

  ruta_servidor: string = "http://localhost:8080/seedair";
  recurso: string = "brands";
  
  constructor(private http: HttpClient){}

  
  delete(id: number){
    return this.http.delete<void>(this.ruta_servidor+"/"+this.recurso + "/" + id);
  }
  edit(droneBrandDTO: DroneBrandResponseDTO){
          
    return this.http.put<DroneBrandResponseDTO>(this.ruta_servidor+"/"+this.recurso+"/update", droneBrandDTO);
  }
  
  add(droneBrandDTO: DroneBrandRegisterDTO){
    return this.http.post<DroneBrandRegisterDTO>(this.ruta_servidor+"/"+this.recurso +"/register" , droneBrandDTO);
  }
  
  listDroneBrands(){  
    return this.http.get<DroneBrandResponseDTO[]>(this.ruta_servidor + "/" + this.recurso);
  }
  getDroneBrandById(idDroneBrand: number){
      return this.http.get<DroneBrandResponseDTO>(this.ruta_servidor+ "/" +this.recurso + "/" + idDroneBrand)
    }
  
}
