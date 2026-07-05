import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { DroneService } from '../../../services/drone-service';
import { DroneDTOList } from '../../../models/droneDTOList';

@Component({
  selector: 'app-list-drones-admin',
  standalone: false,
  templateUrl: './list-drones-admin.html',
  styleUrl: './list-drones-admin.css',
})
export class ListDronesAdmin{

  
  dsListaDrones = new MatTableDataSource<DroneDTOList>();
  displayedColumns: string[] = ['id' , 'code', 'serialNumber', 'droneBrand', 'droneModel', 'acquisitionDate', 'opciones'];
  
  
  viendoActivos: boolean = true;

  constructor (
    private droneService: DroneService,
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
    this.dsListaDrones.filter = filterValue.trim().toLowerCase();
  }

  Eliminar(droneId: number){
    let dialogRef = this.dialog.open(ConfirmacionEliminar);
    
    dialogRef.afterClosed().subscribe(
      selectedEvent => {
        if (selectedEvent) {
          this.droneService.delete(droneId).subscribe({
            next: () => {
              this.snackBar.open("Se eliminó el Dron con Id: " + droneId.toString(), "", {duration: 2000});
              this.CargaLista();
            },
            error: (err) => {
              console.log(err);
              this.snackBar.open("Ocurrió un error al intentar eliminar el dron", "", {duration: 3000});
            }
          });
        }
      }
    );
  }

  CargaLista(){
    
    this.droneService.listByIsActive(this.viendoActivos).subscribe({
      next: (data: DroneDTOList[]) => {
          this.dsListaDrones.data = data;
          this.dsListaDrones.filter = '';
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open("Error al cargar la base de datos de drones", "", {duration: 3000});
      }
    });
  }
}