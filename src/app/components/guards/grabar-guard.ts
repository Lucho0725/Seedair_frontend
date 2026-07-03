import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user-service';

export const grabarGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    let authorities = userService.getAuthoritiesLogeado();
  
    if(authorities) {
      if (authorities.indexOf("CUSTOMER")>=0 || authorities.indexOf("ADMIN")>=0) {
        return true;
      }
    }

    return false;
};
