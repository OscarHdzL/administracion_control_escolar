import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListaFormulariosService extends MainService {

  constructor(public http: HttpClient) {
    super(http);
  }
  //Endpoints Formulario
  public async obtenerFormularios() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Formulario/Consultar');
  }
  altaFormulario(objeto: any)
  {
      return this.postAsync(this.urlServicioControlEscolar + 'Formulario/Agregar', objeto);
  }

  actualizarFormulario(objeto: any)
  {
      return this.postAsync(this.urlServicioControlEscolar + 'Formulario/Actualizar', objeto);
  }

  ofertaEducativa() {
    return this.getAsync(this.urlServicioControlEscolar + 'Catalogos/OfertaEducativa');
  }

  tiposRespuesta() {
    return this.getAsync(this.urlServicioControlEscolar + 'TiposRespuesta/Consultar');
  }

  //Endpoints Preguntas
  consultarPreguntasFormulario(id: number){
    return this.getAsync(this.urlServicioControlEscolar + 'Preguntas/Consultar?tbl_formulario_id=' + id)
  }

  agregarPregunta(objeto: any){
    return this.postAsync(this.urlServicioControlEscolar + 'Preguntas/Agregar', objeto)
  }

  actualizarPregunta(objeto: any){
    return this.postAsync(this.urlServicioControlEscolar + 'Preguntas/Actualizar', objeto)
  }
}
