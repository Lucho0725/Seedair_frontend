import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { ReservationService } from '../../../services/reservation-service';
import { UserService } from '../../../services/user-service';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { ReservationDTOByCustomer } from '../../../models/reservationDTOByCustomer';

@Component({
  selector: 'app-list-reservations',
  standalone: false,
  templateUrl: './list-customer-reservations.html',
  styleUrl: './list-customer-reservations.css',
})
export class ListCustomerReservations{

  todasLasReservas: ReservationDTOByCustomer[] = [];
  dsListaReservas = new MatTableDataSource<ReservationDTOByCustomer>();

  
  displayedColumns: string[] = [
    'parcelLocation',
    'fechas', 
    'droneModel',
    'hectares',
    'totalAmount',
    'reviewRating',
    'opciones'
    
  ];

  estadoActual = 'PENDIENTE';

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const currentCustomerId = this.userService.getIdLogeadoInt();
    this.CargaLista(currentCustomerId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsListaReservas.filter = filterValue.trim().toLowerCase();
  }

  cambiarPestana(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.estadoActual = 'PENDIENTE';
        break;
      case 1:
        this.estadoActual = 'FINALIZADO';
        break;
      case 2:
        this.estadoActual = 'CANCELADO';
        break;
    }
    this.filtrarPorEstado();
  }

  CargaLista(customerId: number) {
    this.reservationService.listByCustomerId(customerId)
      .subscribe({
        next: (data: ReservationDTOByCustomer[]) => {
          this.todasLasReservas = data;
          this.filtrarPorEstado();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  filtrarPorEstado() {
    this.dsListaReservas.data = this.todasLasReservas.filter(
      r => r.state === this.estadoActual
    );
    this.dsListaReservas.filter = '';
  }
/*
  CancelarReserva(id: number) {

    //PENDIENTE DE CAMBIAR, UN PUT AL RESERVATION CONTROLLER PARA ACTUALIZAR EL STATE
    const dialogRef = this.dialog.open(ConfirmacionEliminar);

    dialogRef.afterClosed().subscribe(accionSeleccionada => {
      if (accionSeleccionada) {
        this.reservationService.cancelReservation(id)
          .subscribe({
            next: () => {
              this.snackBar.open(
                'La reserva fue cancelada correctamente.',
                '',
                { duration: 1500 }
              );

              setTimeout(() => {
                const currentCustomerId = this.userService.getIdLogeadoInt();
                this.CargaLista(currentCustomerId);
              }, 150);
            },
            error: (err) => {
              console.log(err);
              this.snackBar.open('Hubo un error al cancelar la reserva.', '', { duration: 2000 });
            }
          });
      }
    });
  }*/
}