import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class AspiranteServices extends MainService {

    constructor(public http: HttpClient) {
      super(http);
    }
    //Agregar
    obtenerAspirantes(idOferta: number) {
        return this.getAsync(this.gatewayAspirantes + 'Servicios/api/SeleccionAsp/ObtenerAspirantes?idOfertaEducativa=' + idOferta);
    }
    agregarAspirantes(objeto: any) {
        return this.postAsync(this.gatewayAspirantes + 'Servicios/api/SeleccionAsp/AgregarAspirante', objeto);
    }
    // obtenerUrlCompleta(token: string) {
    //     return this.gatawayArchivos + 'AdminArchivos/adArchivos/visor/30ce9955-e4d0-4c45-ac38-33a093900ab0/' + token;
    // }
  
  }