import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class ArchivoServices extends MainService {

    constructor(public http: HttpClient) {
      super(http);
    }
    //Agregar
    agregar(objeto: any) {
        return this.postAsync(this.gatawayArchivos + 'AdminArchivos/adArchivos/Agregar/30ce9955-e4d0-4c45-ac38-33a093900ab0', objeto);
    }
    obtenerUrlCompleta(token: string) {
        return this.gatawayArchivos + 'AdminArchivos/adArchivos/visor/30ce9955-e4d0-4c45-ac38-33a093900ab0/' + token;
    }
  
  }