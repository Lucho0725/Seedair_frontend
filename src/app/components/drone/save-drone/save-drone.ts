import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DroneService } from '../../../services/drone-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DroneModelService } from '../../../services/drone-model-service';
import { DroneDTO } from '../../../models/droneDTO';
import { DroneDTOUpdate } from '../../../models/droneDTOUpdate';

@Component({
  selector: 'app-save-drone',
  standalone: false,
  templateUrl: './save-drone.html',
  styleUrl: './save-drone.css',
})
export class SaveDrone {

  droneId: number = 0; 
  saveForm!: FormGroup;
  
  
  listaModelos: any[] = []; 

  constructor(
    private droneService: DroneService,
    private droneModelService: DroneModelService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.saveForm = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      code: ["", [Validators.required]],
      serialNumber: ["", [Validators.required]],
      acquisitionDate: ["", [Validators.required]], 
      droneModelId: ["", [Validators.required]] 
    });

    const paramId = this.activatedRoute.snapshot.params["id"];
    this.droneId = paramId ? parseInt(paramId) : 0;

    // Si estamos editando un id mayor que cer0 la fecha de adquisición tampoco debería poder cambiarse
    if (this.droneId > 0) {
      this.saveForm.get('acquisitionDate')?.disable();
    }

    this.cargarModelos();
  }

  cargarModelos() {
    this.droneModelService.listDroneModels().subscribe({
      next: (data: any[]) => {
        this.listaModelos = data;
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open("Error al cargar los modelos de drones", "", { duration: 2000 });
      }
    });
  }

  ngAfterViewInit() {
    if (this.droneId > 0 && !isNaN(this.droneId)) {
      this.droneService.getDroneById(this.droneId).subscribe({
        next: (data: DroneDTO) => {
          this.saveForm.patchValue({
            id: this.droneId,
            code: data.code,
            acquisitionDate: data.acquisitionDate,
            serialNumber: data.serialNumber,
            droneModelId: data.droneModelId
          });
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open("Error al cargar los datos del dron", "", { duration: 2000 });
        }
      });
    }
  }

  Grabar() {
    if (this.saveForm.valid) {
      
      const formValues = this.saveForm.getRawValue();

      if (this.droneId > 0) {
        
        const droneToUpdate: DroneDTOUpdate = {
          id: this.droneId,
          code: formValues.code, 
          serialNumber: formValues.serialNumber,
          acquisitionDate: formValues.acquisitionDate,
          droneModelId: formValues.droneModelId
        };

        this.droneService.edit(droneToUpdate).subscribe({
          next: () => {
            this.router.navigate(["/drone/list-drones-admin"]);
            this.snackBar.open("Se actualizó el Dron correctamente", "", { duration: 2000 });
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open("Ocurrió un error al actualizar. Verifica que el número de serie no esté duplicado.", "", { duration: 4000 });
          }
        });

      } else {     
        const newDrone: DroneDTO = {
          code: formValues.code,
          serialNumber: formValues.serialNumber,
          acquisitionDate: formValues.acquisitionDate.toISOString().split("T")[0],
          droneModelId: formValues.droneModelId
        };

        this.droneService.add(newDrone).subscribe({
          next: () => {
            this.router.navigate(["/drone/list-drones-admin"]);
            this.snackBar.open("Se registró el nuevo dron con éxito", "", { duration: 2000 });
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open("Error: Datos son inválidos", "", { duration: 4000 });
          }
        });
      }
    } else {
      this.saveForm.markAllAsTouched();
      this.snackBar.open("Por favor, verifica que todos los datos obligatorios estén llenos", "", { duration: 3000 });
    }
  }

}
