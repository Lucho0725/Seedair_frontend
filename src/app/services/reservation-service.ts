import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationDTOByCustomer } from '../models/reservationDTOByCustomer';
import { ReservationDTORegister } from '../models/reservationDTORegister';    

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  ruta_servidor: string = "http://localhost:8080/seedair";
  recurso: string = "reservations";
  
  constructor(private http: HttpClient){}

  listByCustomerId(id: number) {
    return this.http.get<ReservationDTOByCustomer[]>(this.ruta_servidor + "/" + this.recurso + "/list/" + id);
  }

  registerReservation(reservationDTO: ReservationDTORegister) {
    return this.http.post<ReservationDTORegister>(this.ruta_servidor + "/" + this.recurso + "/register", reservationDTO);
  }

  
}