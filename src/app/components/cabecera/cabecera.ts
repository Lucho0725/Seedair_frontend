import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
})
export class Cabecera implements OnInit {

  // Variable para controlar la vista en el HTML
  isLoggedIn: boolean = false;

  constructor (private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Obtenemos el token usando el método que ya tienes en tu servicio
    const token = this.userService.getJwtTokenLogeado();
    
    // Si el token existe (no es null ni está vacío), isLoggedIn será true.
    // De lo contrario, será false.
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  Logout() {
    this.userService.logout();
    this.isLoggedIn = false; // Actualizamos la variable para que el HTML reaccione
    this.router.navigate(["/login"]);
  }
}