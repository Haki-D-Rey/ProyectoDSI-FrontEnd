import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpleadoM } from '../Modelos/EmpleadoM';
import { EmpleadoMSave } from '../Modelos/EmpleadoMSave';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoServService {

  AppUrlListar= '/Empleado/ListarEmpleado';
  AppUrlAgregar= '/Empleado/AgregarEmpleado';
  AppUrlEliminar= '/Empleado/EliminarEmpleado';
  AppUrlActualizar= '/Empleado/ActualizarEmpleado';
  
  constructor(public http: HttpClient) { }

  private actualizarForm = new BehaviorSubject<EmpleadoM>({} as any)
  lista: EmpleadoM[]=[];

  obtenerEmpleados(){
    this.http.get(`${environment.BASE_URL}`+this.AppUrlListar).toPromise().then(data => { 
      this.lista = data as EmpleadoM[];
    })
  }

  obtener$(): Observable<EmpleadoM>{
    return this.actualizarForm.asObservable();
  }

  actualizarFormulario (empleado: EmpleadoM){
    this.actualizarForm.next(empleado);
   }

   guardarEmpleado(empleado: EmpleadoMSave): Observable<EmpleadoMSave>{
    return this.http.post<EmpleadoMSave>(`${environment.BASE_URL}`+this.AppUrlAgregar,empleado);
   }
 
   eliminarEmpleado(empleado: EmpleadoM):Observable<EmpleadoM> {
     return this.http.post<EmpleadoM>(`${environment.BASE_URL}`+this.AppUrlEliminar,empleado);
   }
 
   actualizarempleado (empleado: EmpleadoMSave): Observable<EmpleadoMSave> {
     return this.http.post<EmpleadoMSave>(`${environment.BASE_URL}`+this.AppUrlActualizar, empleado);
 }
}
