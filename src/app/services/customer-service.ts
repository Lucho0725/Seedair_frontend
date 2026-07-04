import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDTO } from '../models/customerDTO';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  
  ruta_servidor: string = "http://localhost:8080/seedair";
  recurso: string = "customers";
  
  constructor(private http: HttpClient){}

  registerCustomer(customerDTO: CustomerDTO) {
      return this.http.post<CustomerDTO>(this.ruta_servidor + "/" + this.recurso + "/register", customerDTO);
  }

  getCustomerIdByUserId(userId: number) {
      return this.http.get<number>(this.ruta_servidor + "/" + this.recurso + "/getByUserId/" +  userId);
    }
  

}
