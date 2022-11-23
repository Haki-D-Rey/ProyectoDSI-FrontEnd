import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioM } from 'src/app/Modelos/Usuario';
import { UserServiceService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  form: FormGroup;
  contador = 1;
  intentos=3;

  constructor(public servicio: UserServiceService, private router:Router, private toasr: ToastrService) {
    this.form = this.CreateFormGroup();
   }

  ngOnInit(): void {
  }

  ListarUsuario(){
    this.servicio.obtenerUsuario();
  }

  CreateFormGroup(){
    return new FormGroup ({
      usuario: new FormControl('',[Validators.required]),
      contraseña: new FormControl('',[Validators.required])
    });
  }


  Entrar(){
      const usuario : UsuarioM = {
      usuario : this.form.get('usuario')?.value,
      contraseña : this.form.get('contraseña')?.value,
      currentException: ""

    }
    this.servicio.Login(usuario).subscribe(data=>{
   
      if(this.contador != 3){
        if(data.currentException==='Bienvenido'){
          console.log(data.currentException);
          this.router.navigateByUrl("/contenedor");
          }
            else {
            console.log("Usuario o contraseña incorrecto");
            ++this.contador;
            this.toasr.warning('Le quedan '+ --this.intentos +' intentos restantes');
                }
      }else{
        console.log("Agotó sus intentos");
        this.toasr.error('Intentelo de nuevo en 5 segundos');
        this.deshabilitar_btnEnviar();
        this.contador=1;
        this.intentos=3;
      }
    });

  }

   deshabilitar_btnEnviar(){
    setTimeout(function() {
      const input = (document.getElementById('boton') as HTMLInputElement).disabled = false;
    }, 5000);
    const input = (document.getElementById('boton') as HTMLInputElement).disabled = true;

}

page_size : number = 10
page_number: number = 1

}
