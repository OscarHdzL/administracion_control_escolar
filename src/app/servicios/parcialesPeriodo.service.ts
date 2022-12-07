import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeriodoParcialesService extends MainService {
  constructor(public http: HttpClient) {
    super(http);
  }
  public async getId(id:number) : Promise <any> {
    console.log(this.periodo + 'Servicios/api/ParcialesPeriodo/GetParcialesPeriodo?idPeriodo='+id);
    return await this.getAsync(this.periodo + 'Servicios/api/ParcialesPeriodo/GetParcialesPeriodo?idPeriodo='+id);
  }
  public post(objeto: any)
  {
      return this.postAsync(this.periodo + 'Servicios/api/ParcialesPeriodo/ActualizarAperturaParcialPeriodo', objeto);
  }
  public postFin(objeto: any)
  {
      return this.postAsync(this.periodo + 'Servicios/api/ParcialesPeriodo/FinalizarAperturaParcialPeriodo', objeto);
  }
}
