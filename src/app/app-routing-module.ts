import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { ListParcels } from './components/parcels/list-parcels/list-parcels';
import { SaveParcel } from './components/parcels/save-parcel/save-parcel';
import { consultarGuard } from './components/guards/consultar-guard';
import { SaveReservation } from './components/reservations/save-reservation/save-reservation';
import { ListCustomerReservations } from './components/reservations/list-customer-reservations/list-customer-reservations';
import { MainLayout } from './components/main-layout/main-layout';
import { ListDrone } from './components/drone/list-drone/list-drone';

const routes: Routes = [
  {path:"", component:Login},
  {path:"login", component:Login},  
  
  {
    path: "",
    component: MainLayout,
    // El Guard general aquí protege a todas las rutas hijas de un solo golpe
    canActivate: [consultarGuard], 
    children: [
  {path:"home", component:Home, canActivate:[consultarGuard]},
  {path:"parcels/list-parcels", component: ListParcels, canActivate:[consultarGuard]},
  {path:"parcels/save-parcel", component: SaveParcel, canActivate:[consultarGuard]},  
  {path:"parcels/save-parcel/:id", component: SaveParcel, canActivate:[consultarGuard]},
  {path:"reservations/list-customer-reservations", component: ListCustomerReservations, canActivate:[consultarGuard]},
  {path:"reservations/save-reservation", component: SaveReservation, canActivate:[consultarGuard]},
  {path:"drone/list-drone", component: ListDrone, canActivate:[consultarGuard]},
  
  ]
  },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
