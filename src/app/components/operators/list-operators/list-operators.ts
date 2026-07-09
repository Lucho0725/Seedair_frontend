import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OperatorResponseDTO } from '../../../models/operatorResponseDTO';
import { OperatorService } from '../../../services/operator-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';

@Component({
  selector: 'app-list-operators',
  standalone: false,
  templateUrl: './list-operators.html',
  styleUrl: './list-operators.css',
})
export class ListOperators {
  dsListaOperadores = new MatTableDataSource<OperatorResponseDTO>();
  displayedColumns: string[] = ['id','name', 'lastname', 'licenseCode', 'certificationLevel', 'experienceYears', 'availabilityStatus', 'isActive', 'edit', 'delete'];

  constructor(
    private operatorService: OperatorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.CargaLista();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsListaOperadores.filter = filterValue.trim().toLowerCase();
  }  

  CargaLista() {
    this.operatorService.getOperators().subscribe({
      next: (data: OperatorResponseDTO[]) => {
        this.dsListaOperadores.data = data;
        this.dsListaOperadores.filter = ''; 
      },
      error: (err) => {
        console.log('Error al cargar operadores:', err);
      }
    });
  }

  Eliminar(operatorId: number){
    let dialogRef = this.dialog.open(ConfirmacionEliminar);
    dialogRef.afterClosed().subscribe(
      accionSeleccionada=>{
        if (accionSeleccionada) {
          this.operatorService.delete(operatorId).subscribe({
                next:()=>{
                  this.snackBar.open("Se eliminó el Operador con Id:"+operatorId.toString(),"",{duration: 1000});
                  this.CargaLista();
                },

          })
        }
    })
  }

}
