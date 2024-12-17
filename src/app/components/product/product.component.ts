import { Component, inject } from '@angular/core';
import { Producto } from '../../maquinas/models/producto';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../maquinas/services/producto.service';
import { Console } from 'console';
import { FormsModule } from '@angular/forms';
import { environments } from '../../environments/environments';
import { MaterializeModule,MaterializeDirective } from 'angular2-materialize';

declare var $:any;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
  
})



export class ProductComponent {
  Waves:any;  
  Materialize:any;

  image_default = environments.image_default;
  listproducto : Producto[]= [];
  a:any; 
  producto: Producto= {
    id: 0,
    descripcion:'',
    producto: '',
    precio: 0,
    cantidad: 0,
    fechavencimiento: new Date('1994-1-1'),
    imagen: ''
  };
  dataimagen:any;
  input: Producto= {
    id: 0,
    descripcion:'',
    producto: '',
    precio: 0,
    cantidad: 0,
    fechavencimiento: new Date('1994-1-1'),
    imagen: ''
  };
  image:any=this.image_default

  Formproducto:string='';
  Formprecio:string='';
  Formcantidad:string='';
  Formfechavencimiento:string='';
  
  id;
  delete_id:string="";

  router = inject(Router);

  constructor(private service: ProductoService,private activatedRoute: ActivatedRoute){
    //this.Waves.displayEffect();
    this.id = this.activatedRoute.snapshot.paramMap.get('id')|| "";

    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  ngOnInit(): void {
    
    this.service.listproductos(this.id).subscribe(listproducto=> this.listproducto = listproducto );
    console.log("En este instante el componente ha cargado" + this.listproducto);
    //console.log("En este instante el componente ha cargado" + this.maquina.id);
  }


  onselectFile(e:any){
    
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    //console.log(this.service.guardar_imagen(e.target.files[0],this.Formproducto).subscribe())
    reader.onload=(event:any) =>{
      this.image=event.target.result;
      this.dataimagen=e.target.files[0];
      //console.log(this.image)
    }
  }

  submit(){
    //let fecha = new Date();
    //let s_fecha = fecha.getDate() + "-"+ fecha.getMonth()+ "-" +fecha.getFullYear() + " " +fecha.getHours +"-" +fecha.getMinutes +"-" +fecha.getSeconds
    //this.service.prueba();
    //guardado de la imagen
    //console.log(fecha);
    if (this.image != this.image_default){
      this.service.guardar_imagen(this.dataimagen,this.Formproducto+"-"+this.id).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
      this.image=this.image_default
    }  
    console.log(this.dataimagen.type);
    let extend: string = this.dataimagen.type.split('/');
    console.log(extend)
    //console.log(this.activatedRoute.snapshot)
    this.input.producto=this.Formproducto;
    this.input.imagen=this.input.producto+"-"+this.id+"."+extend[1];    
    this.input.cantidad= Number(this.Formcantidad);
    this.input.precio= Number(this.Formprecio);
    this.input.fechavencimiento=new Date(this.Formfechavencimiento);
    //console.log(this.input)
    this.service.loadproducto(this.input,this.id).subscribe(Producto=>{
      
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard/maquina/'+this.id+'/producto'])});
    });

    
  }

  borrar(){
    console.log("pase x aca")

    this.service.borrar_producto(this.delete_id).subscribe(res=>{
      if (res.status == '200')
        this.Materialize.toast('I am a toast', 4000)
    });



    this.service.loadproducto(this.input,this.id).subscribe(Producto=>{
      
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard/maquina/'+this.id+'/producto'])});
    });
  }

  edit(id:any){
    console.log(id)
  }

  mover(id:any){
    this.delete_id=id;
  }

}
