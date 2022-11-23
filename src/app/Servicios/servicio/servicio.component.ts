import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/assets/servicioS.service';
import {FormGroup, FormBuilder, Validator, FormControl, Validators} from '@angular/forms'
import { ServicioM } from 'src/app/Modelos/ServicioM';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  CreateFormGroup(){
    return new FormGroup ({
      idServicio: new FormControl(0),
      nombreServicio: new FormControl('',[Validators.required]),
      precio: new FormControl('',[Validators.required]),
      duracion: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.servicio.obtenerServicios();
    this.servicio.obtener$().subscribe(data =>{
      console.log(data);
      this.clienteSeleccionado=data;
      this.form.patchValue({
        idServicio: this.clienteSeleccionado?.idServicio,
        nombreServicio:  this.clienteSeleccionado?.nombreServicio,
        precio:  this.clienteSeleccionado?.precio,
        duracion:  this.clienteSeleccionado?.duracion
      })
      this.idServicio = this.clienteSeleccionado.idServicio;
    })   

  }
  
  form: FormGroup;
  clienteSeleccionado?: ServicioM;
  idServicio = 0;
  filterPost= '';

  constructor(public servicio: ServicioService, private toasr: ToastrService) {
    this.form = this.CreateFormGroup();
   }

  guardarServicio() {
    const servicio : ServicioM = {
    idServicio: 0,
    nombreServicio : this.form.get('nombreServicio')?.value,
    precio :JSON.parse(this.form.get('precio')?.value),
    duracion : JSON.parse(this.form.get('duracion')?.value),
  }

  this.servicio.guardarServicio(servicio).subscribe(data=>{
    this.toasr.success('Servicio agregado','Exitoso');
    this.servicio.obtenerServicios();
    this.form.reset();
  });

 }
 
 GuardarOActualizar(){
  if(this.idServicio === 0 || this.idServicio=== undefined){
    this.guardarServicio();
    this.servicio.obtenerServicios();
  }
  else{
     this.Actualizar();
     console.log('actualizado con éxito');
  }
 }
 eliminarServicio(servicio: ServicioM){
  this.servicio.eliminarServicio(servicio).subscribe(data =>{
    console.log('eliminado');
    this.servicio.obtenerServicios();
  });
}

actualizarServicio(servicio: ServicioM){
  this.servicio.actualizarFormulario(servicio);
  
  }

  Actualizar(){
    const cli : ServicioM = {
      idServicio: this.idServicio,
      nombreServicio : this.form.get('nombreServicio')?.value,
      precio :JSON.parse(this.form.get('precio')?.value),
    duracion : JSON.parse(this.form.get('duracion')?.value)
  }
 
    this.servicio.actualizarServicio(cli).subscribe(data =>{
      this.servicio.obtenerServicios();
    });
    this.idServicio=0;
    this.form.reset();

  }

  page_size : number = 8
  page_number: number = 1
  pageSizeOptions = [5,10,15]

  handlePage(e: PageEvent){
    this.page_size= e.pageSize;
    this.page_number = e.pageIndex + 1
  }
}
