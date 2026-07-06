import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorAvailableDTO } from '../models/operatorAvailableDTO';
import { OperatorRegisterDTO } from '../models/operatorRegisterDTO';
import { OperatorResponseDTO } from '../models/operatorResponseDTO';
import { Operator } from '../models/operator';



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

  registerOperator(newOperator: OperatorRegisterDTO){
    return this.http.post<OperatorRegisterDTO>(this.ruta_servidor+"/"+this.recurso+"/"+"register", newOperator);
  }
  
  updateOperator(updatedOperator: OperatorResponseDTO){
    return this.http.put<OperatorResponseDTO>(this.ruta_servidor+"/"+this.recurso+"/"+"update", updatedOperator);
  }

  getOperators(){
    return this.http.get<OperatorResponseDTO[]>(this.ruta_servidor+"/"+this.recurso)
  }
  getById(operatorId: number){
    return this.http.get<Operator>(this.ruta_servidor+"/"+this.recurso+"/"+operatorId.toString())
  }
  
  delete(operatorId: number){
    return this.http.delete<Operator>(this.ruta_servidor+"/"+this.recurso+"/"+operatorId.toString())
  }

  
}