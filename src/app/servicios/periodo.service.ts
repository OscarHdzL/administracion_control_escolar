import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeriodoService extends MainService {

  constructor(public http: HttpClient) {
    super(http);
  }
  public async get() : Promise <any> {
    return await this.getAsync(this.periodo + 'api/Periodo/GetAllPeriodo');
  }
  public async getId(id: number) : Promise <any> {
    return await this.getAsync(this.periodo + 'api/Periodo/GetPeriodoById?id='+ id);
  }
  public async getIdList(id: number) : Promise <any> {
    return await this.getAsync(this.periodo + 'api/Periodo/GetPeriodoByIdCicloEscolar?idCicloEscolar='+ id);
  }
  public post(objeto: any)
  {
      return this.postAsync(this.periodo + 'api/Periodo/AltaPeriodo', objeto);
  }
  public put(objeto: any)
  {
      return this.putAsync(this.periodo + 'api/Periodo/ActualizacionPeriodo', objeto);
  }
  public async Delate(id: number) : Promise <any> {
    return await this.deleteAsync(this.periodo + 'api/Periodo/Pendiente'+ id);
  }

  public finalizarPeriodo(objeto: any)
  {
      return this.postAsync(this.periodo + 'api/Periodo/FinalizarPeriodo', objeto);
  }
}
