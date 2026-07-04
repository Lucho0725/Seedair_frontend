import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userService = inject(UserService)

  isAdmin = false;
  isCustomer = false;

  constructor(){
    const authorities = this.userService.getAuthoritiesLogeado();

    if(authorities){
      if(authorities.indexOf('ADMIN')>=0){
          this.isAdmin = true;
      } else if (authorities.indexOf('CUSTOMER')>=0){
        this.isCustomer = true;
      }
    }
  }
}
