import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DroneModelService } from '../../../../services/drone-model-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DroneModelDTO } from '../../../../models/droneModelDTO';
import { DroneBrandService } from '../../../../services/drone-brand-service';

@Component({
  selector: 'app-save-drone-model',
  standalone: false,
  templateUrl: './save-drone-model.html',
  styleUrl: './save-drone-model.css',
})
export class SaveDroneModel {

  modeloId: number = 0; 
  saveForm!: FormGroup;
  
  // Lista para llenar el <mat-select>
  listaMarcas: any[] = []; 

  constructor(
    private droneModelService: DroneModelService,
    private droneBrandService: DroneBrandService, // Inyectamos el servicio de Marcas
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    // Inicializamos el formulario con las validaciones de números negativos
    this.saveForm = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      droneBrandId: ["", [Validators.required]],
      modelName: ["", [Validators.required]],
      seedCapacityKg: ["", [Validators.required, Validators.min(0)]],
      coverageHectaresPerDay: ["", [Validators.required, Validators.min(0)]],
      autonomyMinutes: ["", [Validators.required, Validators.min(0)]],
      maxSpeedKmh: ["", [Validators.required, Validators.min(0)]]
    });

    const paramId = this.activatedRoute.snapshot.params["id"];
    this.modeloId = paramId ? parseInt(paramId) : 0;

    this.cargarMarcas();
  }

  cargarMarcas() {
    
    this.droneBrandService.listDroneBrands().subscribe({
      next: (data: any[]) => {
        this.listaMarcas = data;
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open("Error al cargar las marcas", "", { duration: 2000 });
      }
    });
  }

  ngAfterViewInit() {
    if (this.modeloId > 0 && !isNaN(this.modeloId)) {
      this.droneModelService.getDroneModelById(this.modeloId).subscribe({
        next: (data: DroneModelDTO) => {
          this.saveForm.patchValue({
            id: this.modeloId,
            droneBrandId: data.droneBrandId,
            modelName: data.modelName,
            seedCapacityKg: data.seedCapacityKg,
            coverageHectaresPerDay: data.coverageHectaresPerDay,
            autonomyMinutes: data.autonomyMinutes,
            maxSpeedKmh: data.maxSpeedKmh
          });
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open("Error al cargar los datos del modelo", "", { duration: 2000 });
        }
      });
    }
  }

  Grabar() {
    if (this.saveForm.valid) {
      
      const formValues = this.saveForm.getRawValue();
      const modelDTO: DroneModelDTO = {
        id: this.modeloId > 0 ? this.modeloId : 0, 
        droneBrandId: formValues.droneBrandId,
        modelName: formValues.modelName,
        seedCapacityKg: formValues.seedCapacityKg,
        coverageHectaresPerDay: formValues.coverageHectaresPerDay,
        autonomyMinutes: formValues.autonomyMinutes,
        maxSpeedKmh: formValues.maxSpeedKmh
      };

      if (this.modeloId > 0) {
        
        this.droneModelService.edit(modelDTO).subscribe({
          next: () => {
            this.router.navigate(["/drone/drone-models/list-drone-models"]);
            this.snackBar.open("Se actualizó el modelo correctamente", "", { duration: 2000 });
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open("Error al actualizar. Verifique que el nombre no esté duplicado.", "", { duration: 4000 });
          }
        });

      } else {
        
        this.droneModelService.add(modelDTO).subscribe({
          next: () => {
            this.router.navigate(["/drone/drone-models/list-drone-models"]);
            this.snackBar.open("Se registró el nuevo modelo con éxito", "", { duration: 2000 });
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open("Error: Datos inválidos o modelo duplicado", "", { duration: 4000 });
          }
        });
      }
    } else {
      this.saveForm.markAllAsTouched();
      this.snackBar.open("Por favor, verifica que todos los datos obligatorios estén llenos", "", { duration: 3000 });
    }
  }

}
