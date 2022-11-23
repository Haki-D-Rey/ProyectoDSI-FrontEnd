import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicioComponent } from './Servicios/servicio/servicio.component';
import { UsuarioComponent } from './User/usuario/usuario.component';
import { ContenedorComponent } from './Contenedor/contenedor/contenedor.component';
import { Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './Clientes/cliente/cliente.component';
import { ClienteServiceService } from './Clientes/cliente-service.service';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EmpleadoComponent } from './Empleados/empleado/empleado.component';
import { ReservacionComponent } from './Reservaciones/reservacion/reservacion.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { PaginadoPipe } from './Pipes/paginado.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule  } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
const routes: Routes = [
  {
    path: '', component: UsuarioComponent
  },
{
  path: 'contenedor', component: ContenedorComponent
},
{
  path: 'clientes', component: ClienteComponent
},
{
  path: 'empleados', component: EmpleadoComponent
},
{
  path: 'reservaciones', component: ReservacionComponent
},
{
  path: 'servicio', component: ServicioComponent
}
] ;

@NgModule({
  declarations: [
    AppComponent,
    ServicioComponent,
    UsuarioComponent,
    ContenedorComponent,
    ClienteComponent,
    EmpleadoComponent,
    ReservacionComponent,
    FilterPipe,
    PaginadoPipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatProgressBarModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
