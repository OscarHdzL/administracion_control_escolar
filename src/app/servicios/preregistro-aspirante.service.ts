import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PreregistroAspiranteService extends MainService {

  constructor(public http: HttpClient) {
    super(http);
  }
  //Endpoints Formulario
 /*  public async obtenerFormularios() : Promise <any> {
    return await this.getAsync(this.gatewayFormularioDinamico + 'Formulario/Consultar');
  }
  altaFormulario(objeto: any)
  {
      return this.postAsync(this.gatewayFormularioDinamico + 'Formulario/Agregar', objeto);
  } */




  public async obtenerAspirantesXOfertaEducativa(idOfertaEducativa) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'PreRegistro/SelectAspirantesByOfertaEducativa/' + idOfertaEducativa);
  }

  public async obtenerDocumentosAspirante(idAspirante) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Documentos/GetDocumentosByAspirante/' + idAspirante);
  }

  public agregarValidacionDocumento(objeto: any)
  {
      return this.postAsync(this.urlServicioControlEscolar + 'Documentos/AltaDocAspObservaciones', objeto);
  }


  public async obtenerObservacionesDocumento(DocumentoAspiranteId: number) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Documentos/GetObservacionesDocumento/'+ DocumentoAspiranteId);
  }


  public async obtenerEscalafonByIdaspirante(AspiranteId: number) : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Escalafones/GetByIdAspirante?idAspirante='+ AspiranteId);
  }

  public async cargaIndividualEscalafon(escalafon: any) : Promise <any> {
    return await this.postAsync(this.urlServicioControlEscolar + 'Escalafones/CargaIndividualEscalafon', escalafon);
  }





  /* catalogos */
  public async obtenerCatalogoEstatusDocumentoAspirante() : Promise <any> {
    return await this.getAsync(this.urlServicioControlEscolar + 'Catalogos/EstatusDocumentoAspirante');
  }


}
