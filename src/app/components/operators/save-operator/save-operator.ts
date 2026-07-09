import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, isActive, Router } from '@angular/router';
import { OperatorService } from '../../../services/operator-service';
import { OperatorRegisterDTO } from '../../../models/operatorRegisterDTO';
import { Operator } from '../../../models/operator';
import { OperatorResponseDTO } from '../../../models/operatorResponseDTO';

@Component({
  selector: 'app-save-operator',
  standalone: false,
  templateUrl: './save-operator.html',
  styleUrl: './save-operator.css',
})
export class SaveOperator{
  operatorForm!: FormGroup;
  operatorId: number = 0;

  constructor(
    private fb: FormBuilder,
    private operatorService: OperatorService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.operatorForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      licenseCode: ['', Validators.required],
      certificationLevel: ['', Validators.required],
      experienceYears: [null, [Validators.required, Validators.min(0)]],
      availabilityStatus:[true],
      isActive: [true]
    });
    this.operatorId = parseInt(this.route.snapshot.params["id"]);
    if (this.operatorId>0 && this.operatorId != undefined) {
      this.operatorService.getById(this.operatorId).subscribe({
        next:(data: Operator)=>{
          console.log(data)
          this.operatorForm.get("name")?.setValue(data.name);
          this.operatorForm.get("lastname")?.setValue(data.lastname);
          this.operatorForm.get("licenseCode")?.setValue(data.licenseCode);
          this.operatorForm.get("certificationLevel")?.setValue(data.certificationLevel);
          this.operatorForm.get("experienceYears")?.setValue(data.experienceYears);
          this.operatorForm.get("availabilityStatus")?.setValue(data.availabilityStatus);
          this.operatorForm.get("isActive")?.setValue(data.isActive)
        }, error: (err) => {
          console.log(err);
        },
      });
    } else{
      this.operatorId = 0
    }
  }

  guardarOperador(){
    
    if (this.operatorId > 0) {
      const operatorUpdate: OperatorResponseDTO = {
        id: this.operatorId,
        name: this.operatorForm.get("name")?.value,
        lastname: this.operatorForm.get("lastname")?.value,
        licenseCode: this.operatorForm.get("licenseCode")?.value,
        certificationLevel: this.operatorForm.get("certificationLevel")?.value,
        experienceYears: this.operatorForm.get("experienceYears")?.value,
        availabilityStatus: this.operatorForm.get("availabilityStatus") ?.value,
        isActive: this.operatorForm.get("isActive") ?.value
      }

              this.operatorService.updateOperator(operatorUpdate).subscribe({
                next: (data: OperatorResponseDTO) => {
                  
                  this.router.navigate(["/operators/list-operators"]);
                  this.snackBar.open("Se actualizó el Operador con Id: " + data.id.toString(), "", {duration: 2000});
                },
                error: (err) => {
                  console.log('Error al grabar al operador',err);
                  const mensajeError = err.error?.message || 'Ocurrió un error al actualizar. Revisa los datos.';
                  this.snackBar.open(mensajeError, 'Cerrar', { duration: 5000 }); 
                }
              });
    } else {
      const operatorRegistered: OperatorRegisterDTO = {
        name: this.operatorForm.get("name")?.value,
        lastname: this.operatorForm.get("lastname")?.value,
        licenseCode: this.operatorForm.get("licenseCode")?.value,
        certificationLevel: this.operatorForm.get("certificationLevel")?.value,
        experienceYears: this.operatorForm.get("experienceYears")?.value,
      }
              this.operatorService.registerOperator(operatorRegistered).subscribe({
                next: (data: OperatorRegisterDTO) => {
                  
                  this.router.navigate(["/operators/list-operators"]);
                  this.snackBar.open("Se creó exitosamente el operador", "", {duration: 2000});
                },
                error: (err) => {
                  console.log('Error al grabar al operador',err);
                  const mensajeError = err.error?.message || 'Ocurrió un error al registrar. Revisa los datos.';
                  this.snackBar.open(mensajeError, 'Cerrar', { duration: 5000 }); 
                }
              });
            }

  }
}
