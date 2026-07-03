import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorAvailableDTO } from '../models/operatorAvailableDTO';



@Injectable({
  providedIn: 'root',
})
export class OperatorService {

  ruta_servidor: string = "http://localhost:8080/seedair";
  recurso: string = "operators";
  
  constructor(private http: HttpClient){}

  
  listAvailable() {
    
    return this.http.get<OperatorAvailableDTO[]>(this.ruta_servidor + "/" + this.recurso + "/" + "available");
  }

  
}