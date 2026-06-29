import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { ParcelDTOByCustomerId } from '../../../models/parcelDTOByCustomerId';
import { ParcelService } from '../../../services/parcel-service';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-list-parcels',
  standalone: false,
  templateUrl: './list-parcels.html',
  styleUrl: './list-parcels.css',
})
export class ListParcels{
  dsListaParcelas = new MatTableDataSource<ParcelDTOByCustomerId>();
  displayedColumns: string[] = ['id', 'locationText', 'totalHectares', 'latitude', 'longitude', 'createdAt', 'opciones'];

  constructor (
    private userService: UserService,
    private parcelService: ParcelService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){}


  ngOnInit(){
    
    const currentCustomerId = this.userService.getIdLogeadoInt();
    
    this.CargaLista(currentCustomerId);
    this.dsListaParcelas.filter = '';
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsListaParcelas.filter = filterValue.trim().toLowerCase();
  }

  Eliminar(id: number){
    let dialogRef = this.dialog.open(ConfirmacionEliminar);
    
    dialogRef.afterClosed().subscribe(
      accionSeleccionada => {
        if (accionSeleccionada) {
          this.parcelService.delete(id).subscribe({
            next: () => {
              this.snackBar.open("Se eliminó la Parcela con Id:" + id.toString(), "", {duration: 1000});

              //Para dalr tiempos a la base de datos para actualziarse (buena practica)
              setTimeout(() => {            
                const currentCustomerId = this.userService.getIdLogeadoInt();
                this.CargaLista(currentCustomerId); 
            }, 150);
              
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }
    )
    
  }

  CargaLista(customerId: number){
    this.parcelService.listParcelsByCustomerId(customerId).subscribe({
      next: (data: ParcelDTOByCustomerId[]) => {
          this.dsListaParcelas.data = data;
          this.dsListaParcelas.filter = '';
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}