import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParcelService } from '../../../services/parcel-service';
import { ReservationService } from '../../../services/reservation-service';
import { DroneService } from '../../../services/drone-service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../services/customer-service';
import { DroneDTO } from '../../../models/droneDTO';

@Component({
  selector: 'app-save-reservation',
  standalone: false,
  templateUrl: './save-reservation.html',
  styleUrl: './save-reservation.css',
})
export class SaveReservation implements OnInit {

  reservationForm!: FormGroup;
  
  misParcelas: any[] = [];
  dronesFiltrados: DroneDTO[] = []; 

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private reservationService: ReservationService,
    private parcelService: ParcelService,
    private droneService: DroneService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      parcelId: [null, Validators.required],
      droneId: [null, Validators.required],
      scheduledStartDate: ['', Validators.required],
      scheduledEndDate: ['', Validators.required]
    });

    this.cargarDatosDesplegables();
  }

  cargarDatosDesplegables(): void {
    const currentUserId = this.userService.getIdLogeadoInt();
    this.customerService.getCustomerIdByUserId(currentUserId).subscribe({
      next: (currentCustomerId) => {
            
        this.parcelService.listParcelsByCustomerId(currentCustomerId).subscribe(data => {
          this.misParcelas = data;
        });

        
        
      }
    });
  }

  
  onDatesChanged(): void {
    const startDate = this.reservationForm.get('scheduledStartDate')?.value;
    const endDate = this.reservationForm.get('scheduledEndDate')?.value;

    // Solo llamamos al backend si ambas fechas han sido completamente seleccionadas
    if (startDate && endDate) {
      const startString = this.formatDate(startDate);
      const endString = this.formatDate(endDate);

      this.droneService.getAvailableDronesByDates(startString, endString).subscribe({
        next: (data) => {
          this.dronesFiltrados = data;

          // Si el usuario ya había seleccionado un dron pero cambia la fecha, 
          // verificamos si sigue disponible. Si no, limpiamos la selección.
          const selectedDroneCode = this.reservationForm.get('droneId')?.value;
          if (selectedDroneCode && !this.dronesFiltrados.some(d => d.code === selectedDroneCode)) {
            this.reservationForm.get('droneId')?.setValue(null);
          }
        },
        error: (err) => {
          console.error('Error al filtrar drones por rango de fechas', err);
          this.snackBar.open('Error al consultar drones disponibles para estas fechas.', 'Cerrar', { duration: 4000 });
        }
      });
    } else {
      // Si se limpian las fechas, vaciamos la lista de drones
      this.dronesFiltrados = [];
    }
  }

  
  private formatDate(date: any): string {
  if (!date) return '';
  const d = new Date(date);
  // Usamos el año, mes y día local para evitar que cambie el día por la zona horaria (UTC-5)
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`; // Retorna una cadena limpia sin caracteres ocultos
}

 registrarReserva(): void {
  if (this.reservationForm.invalid) { 
    return; 
  }

  const formValues = this.reservationForm.value;

  // Extraemos los strings perfectamente limpios "YYYY-MM-DD"
  const startDateFormateada = this.formatDate(formValues.scheduledStartDate);
  const endDateFormateada = this.formatDate(formValues.scheduledEndDate);

  // Armamos el DTO de forma explícita mapeando tipo por tipo sin arrastrar basura del formulario
  const reservationDTOregister = {
    parcelId: +formValues.parcelId,
    droneId: +formValues.droneId,
    scheduledStartDate: startDateFormateada, // Envía "2026-07-10" limpio
    scheduledEndDate: endDateFormateada       // Envía "2026-07-15" limpio
  };      

  console.log('Enviando DTO limpio al backend:', reservationDTOregister); // Para que verifiques en consola

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