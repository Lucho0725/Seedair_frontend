import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDTO } from '../../models/customerDTO';

@Component({
  selector: 'app-register-customer-form',
  standalone: false,
  templateUrl: './register-customer-form.html',
  styleUrl: './register-customer-form.css',
})
export class RegisterCustomerForm {
registerForm!: FormGroup;

  passwordVisibility = true; 

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newCustomer: CustomerDTO = this.registerForm.value;

      this.customerService.registerCustomer(newCustomer).subscribe({
        next: (response) => {
          this.snackBar.open('¡Registro exitoso!', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error al registrar, verifique sus datos.', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.registerForm.markAllAsTouched(); 
    }
  }

  goBack(): void {
    this.router.navigate(['./login']);
  }

}
