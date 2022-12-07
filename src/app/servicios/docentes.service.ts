import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class DocentesServices extends MainService {

    constructor(public http: HttpClient) {
      super(http);
    }
    //Estatus Docente
    catalogoEstatusDocentes() {
        return this.getAsync(this.gatewayCatalogos + 'api/EstatusDocente/SelectEstatusDocente');
    }
    //Perfil Academico
    catalogoPerfilAcademico() {
        return this.getAsync(this.gatewayCatalogos + 'api/PerfilAcademico/SelectPerfilAcademico');
    }
    //Categoria Academico
    catalogoCategoriaAcademico() {
        return this.getAsync(this.gatewayCatalogos + 'api/CategoriaAcademico/SelectCategoriaAcademico');
    }
    consultarOfertaEducativaId(id: any) {
        return this.getAsync(this.gatewayCatalogos + 'api/OfertaEducativa/GetOfertaEducativaById?idOfertaEducativa=' + id);
    }
    //Validar CURP
    validarCurp(CURP: any) {
      return this.getAsync(this.gatewayCatalogos + 'api/OfertaEducativa/GetOfertaEducativaById?idOfertaEducativa=' + CURP);
    }




}
