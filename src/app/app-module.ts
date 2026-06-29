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


@NgModule({
  declarations: [App, Login, Home, Cabecera, ConfirmacionEliminar, ListParcels, SaveParcel],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, ReactiveFormsModule, MatToolbarModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(
      withInterceptors([
        autorizacionInterceptor
      ])
    )],
  bootstrap: [App],
})
export class AppModule {}
