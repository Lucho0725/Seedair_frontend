import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DroneAvailableDTO } from '../models/droneAvailableDTO';

@Injectable({
  providedIn: 'root',
})
export class DroneService {

  ruta_servidor: string = "http://localhost:8080/seedair";
  recurso: string = "drones";
  
  constructor(private http: HttpClient){}

  
  listActive() {
    
    return this.http.get<DroneAvailableDTO[]>(this.ruta_servidor + "/" + this.recurso + "/available");
  }

}