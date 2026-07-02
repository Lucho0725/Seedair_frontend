import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParcelDTOByCustomerId } from '../../../models/parcelDTOByCustomerId';
import { Parcel } from '../../../models/parcel';
import { ParcelService } from '../../../services/parcel-service';


@Component({
  selector: 'app-save-parcel',
  standalone: false,
  templateUrl: './save-parcel.html', 
  styleUrl: './save-parcel.css',
})
export class SaveParcel{
  
  parcelId: number = 0; 
  saveForm!: FormGroup;
  createdAtOriginal: string = '';

  constructor(
    private parcelService: ParcelService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.saveForm = this.formBuilder.group({
      id: [""],
      locationText: ["", [Validators.required, Validators.minLength(4)]],
      totalHectares: ["", [Validators.required, Validators.min(0.1)]], 
      latitude: ["", [Validators.required, Validators.min(-90), Validators.max(90)]], 
      longitude: ["", [Validators.required, Validators.min(-180), Validators.max(180)]] 
    });

    const paramId = this.activatedRoute.snapshot.params["id"];
    this.parcelId = paramId ? parseInt(paramId) : 0;
  }

  ngAfterViewInit() {
    if (this.parcelId > 0 && !isNaN(this.parcelId)) {
   
      this.parcelService.getById(this.parcelId).subscribe({
        next: (data: ParcelDTOByCustomerId) => {
          this.createdAtOriginal = data.createdAt; 
          
          this.saveForm.patchValue({
            id: data.id,
            locationText: data.locationText,
            totalHectares: data.totalHectares,
            latitude: data.latitude,
            longitude: data.longitude
          });
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open("Error al cargar los datos de la parcela", "", { duration: 2000 });
        }
      });
    }
  }

  Grabar() {
    if (this.saveForm.valid) {
      if (this.parcelId > 0) {
      
        const parcelToUpdate: ParcelDTOByCustomerId = {
          id: Number(this.saveForm.get("id")?.value),
          locationText: this.saveForm.get("locationText")?.value,
          totalHectares: Number(this.saveForm.get("totalHectares")?.value),
          latitude: Number(this.saveForm.get("latitude")?.value),
          longitude: Number(this.saveForm.get("longitude")?.value),
          createdAt: this.createdAtOriginal,
          isActive:true
          
        };

        this.parcelService.edit(parcelToUpdate).subscribe({
          next: () => {
            this.router.navigate(["/parcels/list-parcels"]);
            this.snackBar.open("Se actualizó la Parcela correctamente", "", { duration: 2000 });
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open("Ocurrió un error al actualizar", "", { duration: 2000 });
          }
        });

      } else {
        
        const newParcel: Parcel = {
          locationText: this.saveForm.get("locationText")?.value,
          totalHectares: Number(this.saveForm.get("totalHectares")?.value),
          latitude: Number(this.saveForm.get("latitude")?.value),
          longitude: Number(this.saveForm.get("longitude")?.value)
        };

        this.parcelService.add(newParcel).subscribe({
          next: () => {
            this.router.navigate(["/parcels/list-parcels"]);
            this.snackBar.open("Se registró la nueva Parcela con éxito", "", { duration: 2000 });
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open("Error: Ya existe una parcela en esas coordenadas o los datos son inválidos", "", { duration: 4000 });
          }
        });
      }
    } else {
      this.saveForm.markAllAsTouched();
      this.snackBar.open("Por favor, verifica que los datos sean correctos", "", { duration: 3000 });
    }
  }
}