import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { ParcelResponseDTO } from '../../../models/parcelResponseDTO';
import { ParcelService } from '../../../services/parcel-service';

@Component({
  selector: 'app-list-parcels-admin',
  standalone: false,
  templateUrl: './list-parcels-admin.html',
  styleUrl: './list-parcels-admin.css',
})
export class ListParcelsAdmin implements OnInit {
  dsListaParcelas = new MatTableDataSource<ParcelResponseDTO>();
  displayedColumns: string[] = ['id', 'locationText', 'totalHectares', 'coord1', 'coord2', 'customerName', 'createdAt', 'isActive', 'edit'];

  constructor(
    private parcelService: ParcelService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.CargaLista();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsListaParcelas.filter = filterValue.trim().toLowerCase();
  }

  CargaLista() {
    this.parcelService.getParcels().subscribe({
      next: (data: ParcelResponseDTO[]) => {
        this.dsListaParcelas.data = data;
        this.dsListaParcelas.filter = '';
      },
      error: (err) => {
        console.log('Error al cargar parcelas:', err);
        this.snackBar.open("Error al cargar la lista de parcelas", "", { duration: 3000 });
      }
    });
  }

  Desactivar(parcelId: number) {
    let dialogRef = this.dialog.open(ConfirmacionEliminar);
    dialogRef.afterClosed().subscribe(
      accionSeleccionada => {
        if (accionSeleccionada) {
          this.parcelService.delete(parcelId).subscribe({
            next: () => {
              this.snackBar.open("Se desactivó la Parcela con Id:" + parcelId.toString(), "", { duration: 1000 });
              this.CargaLista();
            },
            error: (err) => {
              console.log(err);
              this.snackBar.open("Ocurrió un error al desactivar la parcela", "", { duration: 3000 });
            }
          });
        }
      }
    );
  }
}
