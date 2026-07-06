import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DroneBrandService } from '../../../../services/drone-brand-service';
import { ConfirmacionEliminar } from '../../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';

@Component({
  selector: 'app-list-drone-brands',
  standalone: false,
  templateUrl: './list-drone-brands.html',
  styleUrl: './list-drone-brands.css', 
})
export class ListDroneBrands{

  dsListaMarcas = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'opciones'];

  constructor (
    private droneBrandService: DroneBrandService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.CargaLista();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsListaMarcas.filter = filterValue.trim().toLowerCase();
  }

  CargaLista() {
    this.droneBrandService.listDroneBrands().subscribe({
      next: (data: any[]) => {
          this.dsListaMarcas.data = data;
          this.dsListaMarcas.filter = ''; 
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open("Error al cargar el listado de marcas", "", {duration: 3000});
      }
    });
  }

  Eliminar(id: number) {
    let dialogRef = this.dialog.open(ConfirmacionEliminar);
    
    dialogRef.afterClosed().subscribe(
      selectedEvent => {
        if (selectedEvent) {
          this.droneBrandService.delete(id).subscribe({
            next: () => {
              this.snackBar.open("Se eliminó la marca correctamente", "", {duration: 2000});
              this.CargaLista();
            },
            error: (err) => {
              console.log(err);
              this.snackBar.open("No se puede eliminar la marca porque está en uso o ocurrió un error.", "", {duration: 4000});
            }
          });
        }
      }
    );
  }
}