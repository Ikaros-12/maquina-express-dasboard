import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaquinaService } from '../../maquinas/services/maquina.service';
import { CommonModule } from '@angular/common';
import { Maquina } from '../../maquinas/models/maquina';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-maquina',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterLink],
  templateUrl: './maquina.component.html',
  styleUrl: './maquina.component.css'
})
export class MaquinaComponent implements OnInit{
  listmaquina : Maquina[]= [];
  a:any; 
  maquina: Maquina= {
    id: 0,
    alias: '',
    descripcion: '',
    modelo: '',
    marca: '',
    estado: '',
    url: ''
  };




  constructor(private service: MaquinaService){
    $(document).ready(function(){
      $('.modal').modal();
    });
     
     this.service.findAll().subscribe(listmaquina => this.a);
    console.log(this.a)
  }

  ngOnInit(): void {
    this.service.listmaquinas().subscribe(listmaquina=> this.listmaquina = listmaquina );
    this.service.findbyId(1).subscribe(maquina=> this.maquina= maquina);
    console.log("En este instante el componente ha cargado" + this.listmaquina);
    console.log("En este instante el componente ha cargado" + this.maquina.id);
  }
  
}
