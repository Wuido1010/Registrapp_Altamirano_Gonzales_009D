import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../services/registroservice.service';
import { ToastController } from '@ionic/angular';
import  {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup; 
  newUsuario: Usuario = <Usuario>{};


  constructor(private alertController: AlertController,
              private registroService: RegistroserviceService,
              private toast: ToastController, 
              private fb:FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombre' : new FormControl("", Validators.required), 
                  'correo' : new FormControl("", Validators.required), 
                  'password': new FormControl("", Validators.required)
                })
               }

  ngOnInit() {
  }

  async CrearUsuario(){
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      this.alertError();
    }
    else{
            this.newUsuario.nomUsuario=form.nombre;
            this.newUsuario.correoUsuario=form.correo;
            this.newUsuario.passUsuario = form.password;
            this.registroService.addUsuario(this.newUsuario).then(dato=>{ 
              this.newUsuario=<Usuario>{};
              this.showToast('Usuario Creado!');
              
            });
              }
      }
      async alertError(){
        const alert = await this.alertController.create({ 
          header: 'Error..',
          message: 'Debe completar todos los datos',
          buttons: ['Aceptar']
        })
        await alert.present();
      }
      
      async alertError2(){
        const alert = await this.alertController.create({ 
          header: 'Error..',
          message: 'Formato de correo inválido',
          buttons: ['Aceptar']
        })
        await alert.present();
      }
      async showToast(msg){
        const toast = await this.toast.create({
          message: msg,
          duration: 4000
        })
        await toast.present();
      }
    
    }
    

 


