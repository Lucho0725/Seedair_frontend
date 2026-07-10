import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
})
export class Cabecera{

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isCustomer: boolean = false;

  constructor (private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = this.userService.getJwtTokenLogeado();
    
    if (token) {
      this.isLoggedIn = true;
      
      const roles = this.userService.getAuthoritiesLogeado(); 
      
      //Paraa valida las credenciales con condcional
      this.isAdmin = roles?.includes('ADMIN') || false;
      this.isCustomer = roles?.includes('CUSTOMER') || false;
      
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.isCustomer = false;
    }
  }

  Logout() {
    this.userService.logout();
    this.isLoggedIn = false; 
    this.isAdmin = false;
    this.isCustomer = false;
    this.router.navigate(["/login"]);
  }
}