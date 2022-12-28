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
        return this.postAsync(this.gatawayArchivos + 'AdminArchivos/adArchivos/Agregar/8f59966c-c3a8-4c45-8230-d9c227858526', objeto);
    }
    obtenerUrlCompleta(token: string) {
        return this.gatawayArchivos + 'AdminArchivos/adArchivos/visor/8f59966c-c3a8-4c45-8230-d9c227858526/' + token;
    }
  
  }