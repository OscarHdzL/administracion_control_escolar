import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCURP } from '../modelos/respuestaCURP.model';

import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class RenapoService extends MainService {

  constructor(public http: HttpClient) {
    super(http);
  }

  //Codigo postal
  public async ObtieneDatosCurp(curp:string)  : Promise<RespuestaCURP>
  {
      return await this.getAsync(this.url_renapo + 'Consulta?CURP=' + curp)
  }

}
