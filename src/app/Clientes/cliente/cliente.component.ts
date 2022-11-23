import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ClienteM } from 'src/app/Modelos/Cliente';
import { ClienteServiceService } from '../cliente-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  
  CreateFormGroup(){
    return new FormGroup ({
      idCliente: new FormControl(0,),
      primerNombre: new FormControl('',[Validators.required]),
      primerApellido: new FormControl('',[Validators.required]),
      celular: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.servicio.obtenerClientes();
    this.servicio.obtener$().subscribe(data =>{
      console.log(data);
      this.clienteSeleccionado=data;
      this.form.patchValue({
        idCliente: this.clienteSeleccionado?.idCliente,
        primerNombre:  this.clienteSeleccionado?.primerNombre,
        primerApellido:  this.clienteSeleccionado?.primerApellido,
        celular:  this.clienteSeleccionado?.celular
      })
      this.idCliente = this.clienteSeleccionado?.idCliente;
    })   

  }
  
  form: FormGroup;
  clienteSeleccionado?: ClienteM;
  idCliente = 0;
  filterPost= '';
  datos? : ClienteM

  constructor(public servicio: ClienteServiceService, private toasr:ToastrService, formBuilder: FormBuilder ) {
    this.form = this.CreateFormGroup();
   }

  guardarCliente() {
    const cli : ClienteM = {
    idCliente: 0,
    primerNombre : this.form.get('primerNombre')?.value,
    primerApellido : this.form.get('primerApellido')?.value,
    celular : this.form.get('celular')?.value
  }

  this.servicio.guardarCliente(cli).subscribe(data=>{
    this.toasr.success('Cliente agregado','Exitoso');
    console.log(data);
    this.servicio.obtenerClientes();
    this.form.reset();
  });

 }
 
 GuardarOActualizar(){
  if(this.idCliente === 0 || this.idCliente=== undefined){
    this.guardarCliente();
    this.servicio.obtenerClientes();
  }
  else{
     this.Actualizar();
     console.log('actualizado con éxito');

  }
 }
 eliminarCliente(cliente: ClienteM){
  this.servicio.eliminarCliente(cliente).subscribe(data =>{
    console.log('eliminado');
    this.servicio.obtenerClientes();
  });
}

actualizarCliente(cliente: ClienteM){
  this.servicio.actualizarFormulario(cliente);
  
  }

  Actualizar(){
    const cli : ClienteM = {
      idCliente: this.idCliente,
      primerNombre : this.form.get('primerNombre')?.value,
      primerApellido : this.form.get('primerApellido')?.value,
      celular : this.form.get('celular')?.value
  }
 
    this.servicio.actualizarCliente(cli).subscribe(data =>{
      this.servicio.obtenerClientes();
      this.form.reset();
    });
    this.idCliente=0;
   

  }

  
  page_size : number = 5
  page_number: number = 1
  pageSizeOptions = [5,10,15]

  handlePage(e: PageEvent){
    this.page_size= e.pageSize;
    this.page_number = e.pageIndex + 1
  }

}
