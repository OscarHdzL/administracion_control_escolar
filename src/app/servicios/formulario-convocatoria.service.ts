import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
import { TblRespuesta } from '../modelos/ModelosPreguntasFormulario';
@Injectable({
  providedIn: 'root'
})
export class FormularioConvocatoriaService extends MainService {

  constructor(public http: HttpClient) {
    super(http);
  }
  //Endpoints Formulario
  public async obtenerPreguntasXIdFormulario(idFormulario: number) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar  + 'Preguntas/Consultar/?tbl_formulario_id=' + idFormulario);
  }

  public async agregarVariasRespuestasFormulario(respuestas: Array<TblRespuesta>) : Promise <any> {
    return await this.postAsync(this.urlServicioControlEscolar  + 'Respuestas/AgregarVarias', respuestas);
  }

  public async obtenerRespuestasFormularioAspirante(idFormulario: number, idAspirante: number) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Respuestas/ConsultarFormularioAspirante?formulario=' + idFormulario + '&aspirante=' + idAspirante);
  }

}
