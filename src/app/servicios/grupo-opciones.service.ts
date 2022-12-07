import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class GrupoOpcionesServices extends MainService {

  constructor(public http: HttpClient) {
    super(http);
  }

  //Codigo postal
  public async obtenerGrupos()  {
    return await this.getAsync(this.urlServicioControlEscolar + 'GrupoOpciones/Consultar')
  }
  public async obtenerOpcionesGrupo(id: number) {
    return await this.getAsync(this.urlServicioControlEscolar + 'OpcionesPregunta/Consultar?tbl_Grupo_Opciones_id=' + id)
  }
  public async agregarGrupo(grupo: any)
  {
      return await this.postAsync(this.urlServicioControlEscolar + 'GrupoOpciones/Agregar', grupo);
  }
  public async actualizarGrupo(grupo: any)
  {
      return await this.postAsync(this.urlServicioControlEscolar + 'GrupoOpciones/Actualizar', grupo);
  }

}
