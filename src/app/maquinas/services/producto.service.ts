import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../environments/environments';
import { message } from '../models/message';

@Injectable({
  providedIn: 'root'
})


export class ProductoService {

  
   /*
  private productos : Producto[]=[{
    id: 1,
    descripcion:'',
    producto: 'coca-cola',
    precio: 100,
    cantidad: 10,
    fechavencimiento: new Date('1994-1-1')
  },{
    id: 2,
    descripcion:'',
    producto: 'pepsi lata',
    precio: 120,
    cantidad: 10,
    fechavencimiento: new Date('1994-1-1')
  },{
    id: 3,
    descripcion:'',
    producto: 'manaos',
    precio: 50,
    cantidad: 23,
    fechavencimiento: new Date('1994-1-1')
  }
  ]*/

  listproductos(id:string):Observable<Producto[]>{
    //return of(this.productos)

    return this.http.get<Producto[]>(environments.baseUrl+environments.ruta_maquina+'/'+id+environments.prefijo_producto);
  }

  loadproducto(producto:Producto,id:string):Observable<Producto[]>{
    let data={
      'producto':producto.producto,
      'cantidad':producto.cantidad,
      'precio':producto.precio,
      'fechavencimiento':producto.fechavencimiento,
      'imagen':producto.imagen,
      'activo': true
    }
    const headers = new HttpHeaders();                
    headers.set('Content-Type','application/json'); 

    return this.http.post<Producto[]>(environments.baseUrl+environments.ruta_maquina+'/'+id+environments.prefijo_producto,data,{ "headers" : headers });
  }


  constructor(private http: HttpClient) {}


  prueba():void{
    const headers = new HttpHeaders();                
    headers.set('Content-Type','application/json');
    /*.set('Access-Control-Allow-Origin', '*')   
    .set("Access-Control-Max-Age","3600")
    .set("X-Requested-With","XMLHttpRequests")
    .set("Origin","http://localhost:8100") 
    .set("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept, Authorization");*/

    var data={
      'id':1
    }

    var response=this.http.post<String>('http://localhost:8090/pedido/pagar', data,{ "headers" : headers })
    response.subscribe((res) => console.log(res))
  }
  
  guardar_imagen(image: Blob ,name:string){
    const headers = new HttpHeaders();
    headers.set("X-Requested-With", "XMLHttpRequests")                
    .set('Content-Type','multipart/form-data');

    const formdata = new FormData();
    formdata.append("file", image );
    formdata.append("name", name);

    return this.http.post(environments.baseUrl+environments.ruta_cargar_imagen,formdata,{'responseType' :'text'});
    
  } 

  borrar_producto(id:any){
    const headers = new HttpHeaders();                
    headers.set('Content-Type','application/json');

    return this.http.delete<message>(environments.baseUrl+environments.ruta_producto+'/'+id,{ "headers" : headers })
  }
}
