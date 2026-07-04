import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { MaterialModule } from './module/material/material-module';
import { Home } from './components/home/home';
import { Cabecera } from './components/cabecera/cabecera';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListParcels } from './components/parcels/list-parcels/list-parcels';
import { SaveParcel } from './components/parcels/save-parcel/save-parcel';
import { ConfirmacionEliminar } from './components/confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { autorizacionInterceptor } from './components/interceptors/autorizacion-interceptor';
import { ListCustomerReservations } from './components/reservations/list-customer-reservations/list-customer-reservations';
import { SaveReservation } from './components/reservations/save-reservation/save-reservation';
import { HomeAdmin } from './components/home/home-admin/home-admin';
import { HomeCustomer } from './components/home/home-customer/home-customer';

import { RegisterCustomerForm } from './components/register-customer-form/register-customer-form';

import { MainLayout } from './components/main-layout/main-layout';
import { RouterModule } from '@angular/router';
import { ListDrone } from './components/drone/list-drone/list-drone';
import { SaveDrone } from './components/drone/save-drone/save-drone';


@NgModule({
  declarations: [
    App,
    Login,
    Home,
    Cabecera,
    ConfirmacionEliminar,
    ListParcels,
    SaveParcel,
    ListCustomerReservations,
    SaveReservation,
    RegisterCustomerForm,
    MainLayout,
    ListDrone,
    SaveDrone,
    HomeAdmin,
    HomeCustomer,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([autorizacionInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
