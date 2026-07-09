import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DroneAvailableDTO } from '../models/droneAvailableDTO';
import { DroneDTOUpdate } from '../models/droneDTOUpdate';
import { DroneDTOList } from '../models/droneDTOList';
import { DroneDTO } from '../models/droneDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DroneService {

  ruta_servidor: string = "http://localhost:8080/seedair";
  recurso: string = "drones";
  resourcePath: any;
  
  constructor(private http: HttpClient){}

  
  listAvailable() {
    
    return this.http.get<DroneAvailableDTO[]>(this.ruta_servidor + "/" + this.recurso + "/available");
  }
  //listo
  listByIsActive(isActive: boolean) { 
    return this.http.get<DroneDTOList[]>(this.ruta_servidor + "/" + this.recurso + "/isActive/" + isActive);
  }
  getDroneById(droneId: number) { 
    return this.http.get<DroneDTO>(this.ruta_servidor + "/" + this.recurso + "/" + droneId);
  }

  add(droneDTO: DroneDTO){
    return this.http.post<DroneDTO>(this.ruta_servidor+"/"+this.recurso +"/add" , droneDTO);
  }

getAvailableDronesByDates(startDate: string, endDate: string): Observable<DroneDTO[]> {
  const token = sessionStorage.getItem('token');
  // Usamos el DTO de fechas esperado por el backend
  const rangeDateDTO = {
    scheduledStartDate: startDate,
    scheduledEndDate: endDate
  };
 return this.http.post<DroneDTO[]>(
    this.ruta_servidor + "/" + this.recurso + "/available-by-dates", 
    rangeDateDTO, 
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

  //listo
  delete(id: number){
    return this.http.delete<void>(this.ruta_servidor+"/"+this.recurso+"/logicalDelete/"+id);
  }
  //listo
  edit(droneDTO: DroneDTOUpdate){
      
    return this.http.put<DroneDTOUpdate>(this.ruta_servidor+"/"+this.recurso+"/update", droneDTO);
  }

  
}