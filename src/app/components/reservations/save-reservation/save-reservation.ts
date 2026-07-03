import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParcelService } from '../../../services/parcel-service';
import { ReservationService } from '../../../services/reservation-service';
import { DroneService } from '../../../services/drone-service';
import { OperatorService } from '../../../services/operator-service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-reservation',
  standalone: false,
  templateUrl: './save-reservation.html',
  styleUrl: './save-reservation.css',
})
export class SaveReservation{

  reservationForm!: FormGroup;
  
  misParcelas: any[] = [];
  dronesDisponibles: any[] = [];
  operadoresDisponibles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private parcelService: ParcelService,
    private droneService: DroneService,
    private operatorService: OperatorService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      parcelId: [null, Validators.required],
      droneId: [null, Validators.required],
      operatorId: [null, Validators.required],
      scheduledStartDate: ['', Validators.required],
      scheduledEndDate: ['', Validators.required]
    });

    this.cargarDatosDesplegables();
  }

  cargarDatosDesplegables(): void {
    const currentCustomerId = this.userService.getIdLogeadoInt(); 

    this.parcelService.listParcelsByCustomerId(currentCustomerId).subscribe(data => {
      this.misParcelas = data;
    });

    this.operatorService.listAvailable().subscribe(data => {
      this.operadoresDisponibles = data;
    });
    
    this.droneService.listActive().subscribe(data => {
      this.dronesDisponibles = data;
    });
  }

  registrarReserva(): void {
    if (this.reservationForm.invalid) { 
      return; 
    }

    
    const formValues = this.reservationForm.value;

    
    const startDateFormateada = new Date(formValues.scheduledStartDate).toString().split('T')[0];
    const endDateFormateada = new Date(formValues.scheduledEndDate).toString().split('T')[0];

    
    const reservationDTOregister  = {
      ...formValues,
      scheduledStartDate: startDateFormateada,
      scheduledEndDate: endDateFormateada
    };      

    
    this.reservationService.registerReservation(reservationDTOregister).subscribe({
      next: (response) => {
        this.snackBar.open('¡Reserva registrada exitosamente!', 'Cerrar', { duration: 3000 });
        
        
        this.router.navigate(['/reservations/list-customer-reservations']);
      },
      error: (err) => {
        console.error('Error al registrar la reserva', err);
        
        const mensajeError = err.error?.message || 'Ocurrió un error al registrar. Revisa los datos.';
        this.snackBar.open(mensajeError, 'Cerrar', { duration: 5000 }); 
      }
    });
  }
}