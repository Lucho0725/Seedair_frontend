import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { ListParcels } from './components/parcels/list-parcels/list-parcels';
import { SaveParcel } from './components/parcels/save-parcel/save-parcel';
import { consultarGuard } from './components/guards/consultar-guard';
import { SaveReservation } from './components/reservations/save-reservation/save-reservation';
import { ListCustomerReservations } from './components/reservations/list-customer-reservations/list-customer-reservations';
import { RegisterCustomerForm } from './components/register-customer-form/register-customer-form';
import { MainLayout } from './components/main-layout/main-layout';
import { ListDrone } from './components/drone/list-drone/list-drone';
import { SaveOperator } from './components/operators/save-operator/save-operator';
import { ListOperators } from './components/operators/list-operators/list-operators';
import { grabarGuard } from './components/guards/grabar-guard';
import { ListDronesAdmin } from './components/drone/list-drones-admin/list-drones-admin';
import { SaveDrone } from './components/drone/save-drone/save-drone';
import { ListDroneModels } from './components/drone/drone-models/list-drone-models/list-drone-models';
import { SaveDroneModel } from './components/drone/drone-models/save-drone-model/save-drone-model';
import { ListDroneBrands } from './components/drone/drone-brands/list-drone-brands/list-drone-brands';
import { SaveDroneBrand } from './components/drone/drone-brands/save-drone-brand/save-drone-brand';

const routes: Routes = [
  
  {path:"", component:Login},
  {path:"login", component:Login},
  {path:"register-customer-form", component: RegisterCustomerForm},
  
    
  {
    path: "",
    component: MainLayout,
    // El Guard general aquí protege a todas las rutas hijas de un solo golpe
    canActivate: [consultarGuard, grabarGuard], 
    children: [
      {path:"home", component:Home, canActivate:[consultarGuard]},
      {path:"parcels/list-parcels", component: ListParcels, canActivate:[consultarGuard]},
      {path:"parcels/save-parcel", component: SaveParcel, canActivate:[consultarGuard]},  
      {path:"parcels/save-parcel/:id", component: SaveParcel, canActivate:[consultarGuard]},
      {path:"reservations/list-customer-reservations", component: ListCustomerReservations, canActivate:[consultarGuard]},
      {path:"reservations/save-reservation", component: SaveReservation, canActivate:[consultarGuard]}, 
      {path:"drone/list-drone", component: ListDrone, canActivate:[consultarGuard]},
      {path:"operators/list-operators", component: ListOperators, canActivate:[consultarGuard]},
      {path:"operators/save-operator", component: SaveOperator, canActivate:[grabarGuard]},
      {path:"operators/edit-operator/:id", component: SaveOperator, canActivate:[grabarGuard]},
      {path:"drone/list-drones-admin", component: ListDronesAdmin, canActivate:[consultarGuard]},
      {path:"drone/save-drone", component: SaveDrone, canActivate:[consultarGuard]},  
      {path:"drone/save-drone/:id", component: SaveDrone, canActivate:[consultarGuard]},  
      {path:"drone/drone-models/list-drone-models", component: ListDroneModels, canActivate:[consultarGuard]},   
      {path:"drone/drone-models/save-drone-model", component: SaveDroneModel, canActivate:[consultarGuard]},     
      {path:"drone/drone-models/save-drone-model/:id", component: SaveDroneModel, canActivate:[consultarGuard]},
      {path:"drone/drone-brands/list-drone-brands", component: ListDroneBrands, canActivate:[consultarGuard]},   
      {path:"drone/drone-brands/save-drone-brand", component: SaveDroneBrand, canActivate:[consultarGuard]},     
      {path:"drone/drone-brands/save-drone-brand/:id", component: SaveDroneBrand, canActivate:[consultarGuard]}

    ]
  },
  
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }