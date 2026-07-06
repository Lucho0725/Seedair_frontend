import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DroneBrandService } from '../../../../services/drone-brand-service';



@Component({
  selector: 'app-save-drone-brand',
  standalone: false,
  templateUrl: './save-drone-brand.html',
  styleUrl: './save-drone-brand.css',
})
export class SaveDroneBrand{

   id: number = 0;
   saveForm!: FormGroup;

   constructor (
        private droneBrandService: DroneBrandService, 
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute, 
        private formBuilder: FormBuilder,
        private router: Router
   ) {} 

  ngOnInit() {
    
    this.saveForm = this.formBuilder.group(
      {
            id: [""],
            name: ["", [Validators.required, Validators.minLength(2)]]
      }
    );
    
    this.id = parseInt(this.activatedRoute.snapshot.params["id"]);    
    if (this.id > 0 && this.id !== undefined && !isNaN(this.id)) {
     
        this.droneBrandService.getDroneBrandById(this.id).subscribe({
          next: (data: any) => {
              console.log(data);
              this.saveForm.get("id")?.setValue(data.id);
              this.saveForm.get("name")?.setValue(data.name);
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
    else {
      
        this.id = 0;
    }   
  }

  Grabar() {
    
    const brandUpdate = {
      id: this.saveForm.get("id")?.value,
      name: this.saveForm.get("name")?.value
    };
    const brandRegister = {
      name: this.saveForm.get("name")?.value
    }

    if (this.saveForm.valid) {

          if (this.id > 0) {
              this.droneBrandService.edit(brandUpdate).subscribe({
                next: (data: any) => {
                  this.router.navigate(["/drone/drone-brands/list-drone-brands"]);
                  this.snackBar.open("Se actualizó la Marca con Id:" + data.id.toString(), "", {duration: 2000});
                },
                error: (err) => {
                  console.log(err);
                }
              });
            } else {
              this.droneBrandService.add(brandRegister).subscribe({
                next: (data: any) => {
                  this.router.navigate(["/drone/drone-brands/list-drone-brands"]);
                  this.snackBar.open("Se insertó la nueva Marca con Id:" + data.id.toString(), "", {duration: 2000});
                },
                error: (err) => {
                  console.log(err);
                }
              });
            }
    }
  }

}