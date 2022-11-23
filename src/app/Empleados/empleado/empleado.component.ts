import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { EmpleadoM } from 'src/app/Modelos/EmpleadoM';
import { EmpleadoMSave } from 'src/app/Modelos/EmpleadoMSave';
import { EmpleadoServService } from '../empleado-serv.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {


  constructor(public servicio: EmpleadoServService, private toasr: ToastrService) {
    this.form = this.CreateFormGroup();
   }

  CreateFormGroup(){
    return new FormGroup ({
      idEmpleado: new FormControl(),
      primerNombre: new FormControl('',[Validators.required]),
      segundoNombre: new FormControl(''),
      primerApellido: new FormControl('',[Validators.required]),
      segundoApellido: new FormControl(''),
      direccion: new FormControl('',[Validators.required]),
      cedula: new FormControl('',[Validators.required]),
      celular: new FormControl('',[Validators.required]),
      privilegio: new FormControl(),
      estadoEmpleado: new FormControl(''),
      fechaCreacion : new FormControl(''),
    });
  }

  form : FormGroup;
  empleadoSeleccionado?: EmpleadoM;
  idEmpleado = 0;
  filterPost= '';

  ngOnInit(): void {
    this.servicio.obtenerEmpleados();
    this.servicio.obtener$().subscribe(data =>{
      console.log(data);
      this.empleadoSeleccionado=data;
      this.form.patchValue({
        idEmpleado: this.empleadoSeleccionado?.idEmpleado,
        primerNombre:  this.empleadoSeleccionado?.primerNombre,
        segundoNombre:  this.empleadoSeleccionado?.segundoNombre,
        primerApellido:  this.empleadoSeleccionado?.primerApellido,
        segundoApellido:  this.empleadoSeleccionado?.segundoApellido,
        direccion: this.empleadoSeleccionado?.direccion,
        cedula:  this.empleadoSeleccionado?.cedula,
        celular:  this.empleadoSeleccionado?.celular,
        privilegio:  this.empleadoSeleccionado?.privilegio,
        estadoEmpleado:  this.empleadoSeleccionado?.idEstadoEmpleado,
      })
      this.idEmpleado = this.empleadoSeleccionado?.idEmpleado;
    })   

  }

  guardarEmpleado() {
    const empleado : EmpleadoMSave = {
    idEmpleado : 0,
    primerNombre : this.form.get('primerNombre')?.value,
    segundoNombre : this.form.get('segundoNombre')?.value,
    primerApellido : this.form.get('primerApellido')?.value,
    segundoApellido : this.form.get('segundoApellido')?.value,
    direccion : this.form.get('direccion')?.value,
    cedula : this.form.get('cedula')?.value,
    celular : this.form.get('celular')?.value,
    privilegio : JSON.parse(this.form.get('privilegio')?.value),
    idEstadoEmpleado : this.form.get('estadoEmpleado')?.value,
    fechaCreacion : this.form.get('')?.value,
  }

  this.servicio.guardarEmpleado(empleado).subscribe(data=>{
    this.toasr.success('Empleado agregado','Exitoso');
    this.servicio.obtenerEmpleados();
    this.form.reset();
  });

 }

 GuardarOActualizar(){
  if(this.idEmpleado === 0 || this.idEmpleado=== undefined){
    this.guardarEmpleado();
    this.servicio.obtenerEmpleados();
  }
  else{
     this.Actualizar();
     console.log('actualizado con éxito');
  }
 }

 eliminarEmpleado(empleado: EmpleadoM){
  this.servicio.eliminarEmpleado(empleado).subscribe(data =>{
    console.log('eliminado');
    this.servicio.obtenerEmpleados();
  });
}


actualizarEmpleado(empleado: EmpleadoM){
  this.servicio.actualizarFormulario(empleado);
  }

  Actualizar(){
    const empleado : EmpleadoMSave = {
      idEmpleado: this.idEmpleado,
      primerNombre : this.form.get('primerNombre')?.value,
      segundoNombre : this.form.get('segundoNombre')?.value,
      primerApellido : this.form.get('primerApellido')?.value,
      segundoApellido : this.form.get('segundoApellido')?.value,
      direccion : this.form.get('direccion')?.value,
      cedula : this.form.get('cedula')?.value,
      celular : this.form.get('celular')?.value,
      privilegio : JSON.parse(this.form.get('privilegio')?.value),
      idEstadoEmpleado : this.form.get('estadoEmpleado')?.value,
      fechaCreacion : this.form.get('')?.value,
  }
 
    this.servicio.actualizarempleado(empleado).subscribe(data =>{
      this.servicio.obtenerEmpleados();
    });
    this.idEmpleado=0;
    this.form.reset();

  }

  page_size : number = 5
  page_number: number = 1
  pageSizeOptions = [5,10,15]

  handlePage(e: PageEvent){
    this.page_size= e.pageSize;
    this.page_number = e.pageIndex + 1
  }


  estadosEmpleados = [
    {
      estado: "Disponible"
    },
    {
      estado: "No disponible"
    },
    {
      estado: "Fuera de servicio"
    }
  ]

}
