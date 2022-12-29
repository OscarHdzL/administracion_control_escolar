import { ModalCitasReinscripcionComponent } from './modal-citas-reinscripcion/modal-citas-reinscripcion.component';
import { PeriodoReinscripcionModel } from './../../../modelos/Catalogos';
import { ModalPeriodoReinscripcionComponent } from './modal-periodo-reinscripcion/modal-periodo-reinscripcion.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { GrupoModel } from 'src/app/modelos/Grupo.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { id } from 'date-fns/locale';
import { VariablesService } from 'src/app/servicios/variableGL.service';


@Component({
  selector: 'app-periodo-reinscripcion',
  templateUrl: './periodo-reinscripcion.component.html',
  styleUrls: ['./periodo-reinscripcion.component.scss']
})
export class PeriodoReinscripcionComponent implements OnInit {

  PeriodosReinscripcion: PeriodoReinscripcionModel[] = [];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: TableColumn<any>[] = [
    { label: 'Periodo', property: 'descripcion', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Inicio', property: 'fechaInicio', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Fin', property: 'fechaFin', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Hora Inicio', property: 'horaInicio', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Hora Fin', property: 'horaFin', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true }
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService
  ) {
/*     this.PeriodosReinscripcion.push(
      {
        id: number;
        grupo: string;
        aforomax: number;
        inclusion: string;
        catDeporteId?: number;
      }
    ); */
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {


    this.PeriodosReinscripcion = await this.obtenerPeriodosReinscripcion();


    this.dataSource = new MatTableDataSource<PeriodoReinscripcionModel>(this.PeriodosReinscripcion);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'PeriodosReinscripcion por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }

  openModalPeriodoReinscripcion(model) {

    this.dialog.open(ModalPeriodoReinscripcionComponent, {
      width: '70%',
      autoFocus: false,
      data: model,
      disableClose: true
    }).afterClosed().subscribe(result => {

      if(result){
        this.ngOnInit();
      }
      console.log(result);
    });
  }


  openModalCitasPeriodoReinscripcion(idPeriodoReinscripcion) {

    this.dialog.open(ModalCitasReinscripcionComponent, {
      width: '70%',
      autoFocus: false,
      data: idPeriodoReinscripcion,
      disableClose: true
    }).afterClosed().subscribe(result => {

      if(result){
        this.ngOnInit();
      }
      console.log(result);
    });
  }



  public async obtenerPeriodosReinscripcion(){
    const respuesta = await this.catalogosService.consultarPeriodosReinscripcion();
    return respuesta.exito ? respuesta.objeto : [];
  }


  public async generarCitasReinscripcion(periodo){
    debugger
    const respuesta = await this.catalogosService.generarCitasPeriodoReinscripcion(periodo);

    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);
      this.ngOnInit();
    } else {
      this.toastService.toastErr(respuesta.error);
    }

  }

}
