import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaquinaComponent } from '../maquina/maquina.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ResumenComponent } from '../resumen/resumen.component';
import { Maquina } from '../../maquinas/models/maquina';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,MaquinaComponent,TopbarComponent,ResumenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  maquina: Maquina={
    id: 0,
    alias_name: '',
    descripcion: '',
    modelo: '',
    marca: '',
    estado: '',
    url: '',
    tipo: '',
    colaMQ: '',
    productos: [],
    direccion: '',
    longitud: '',
    latitud: ''
  };

  
  constructor(){
    $(document).ready(function(){
      $('select').formSelect();
    });
  }

  submit_maquina(){

  }
}
