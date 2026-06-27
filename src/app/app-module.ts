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


@NgModule({
  declarations: [App, Login, Home, Cabecera],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, ReactiveFormsModule, MatToolbarModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
