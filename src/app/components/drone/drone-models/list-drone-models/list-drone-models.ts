import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DroneModelListDTO } from '../../../../models/droneModelListDTO';
import { DroneModelService } from '../../../../services/drone-model-service';
import { ConfirmacionEliminar } from '../../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';


@Component({
  selector: 'app-list-dron-model',
  standalone: false,
  templateUrl: './list-drone-models.html',
  styleUrl: './list-drone-models.css',
})
export class ListDroneModels{

  
  dsListaModelos = new MatTableDataSource<DroneModelListDTO>();
  
  
  displayedColumns: string[] = [
    'id', 
    'brandName', 
    'modelName', 
    'seedCapacityKg', 
    'coverageHectaresPerDay', 
    'autonomyMinutes', 
    'maxSpeedKmh', 
    'opciones'
  ];
  
  viendoActivos: boolean = true;

  constructor (
    private droneModelService: DroneModelService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){}

  ngOnInit(){
    this.CargaLista();
  }

  cambiarVista(estado: boolean) {
    this.viendoActivos = estado;
    this.CargaLista();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsListaModelos.filter = filterValue.trim().toLowerCase();
  }

  Eliminar(modeloId: number){
    let dialogRef = this.dialog.open(ConfirmacionEliminar);
    
    dialogRef.afterClosed().subscribe(
      selectedEvent => {
        if (selectedEvent) {
          this.droneModelService.delete(modeloId).subscribe({
            next: () => {
              this.snackBar.open("Se eliminó el Modelo con Id: " + modeloId.toString(), "", {duration: 2000});
              this.CargaLista();
            },
            error: (err) => {
              console.log(err);
              this.snackBar.open("Ocurrió un error al intentar eliminar el modelo", "", {duration: 3000});
            }
          });
        }
      }
    );
  }

  CargaLista(){
    
    this.droneModelService.listByIsActive(this.viendoActivos).subscribe({
      next: (data: DroneModelListDTO[]) => {
          this.dsListaModelos.data = data;
          this.dsListaModelos.filter = '';
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open("Error al cargar el catálogo de modelos", "", {duration: 3000});
      }
    });
  }
}