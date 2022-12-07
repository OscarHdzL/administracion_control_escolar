import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { AltaPlanComponent } from '../alta-plan/alta-plan.component';
import { PlanEstudiosModel } from './../../../../modelos/PlanEstudios.model';

@Component({
  selector: 'vex-lista-planes',
  templateUrl: './lista-planes.component.html',
  styleUrls: ['./lista-planes.component.scss'],
})
export class ListaPlanesComponent implements OnInit {

  planes: PlanEstudiosModel[] = [];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns: TableColumn<any>[] = [
    { label: 'Fecha Inicio', property: 'fechaInicio', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Fin', property: 'fechaFin', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Carrera', property: 'carrera', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Créditos', property: 'creditos', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Semestres', property: 'semestres', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true }
  ];



  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private catalogosServices: CatalogosServices) {  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {
    this.planes = [];
    let res = await this.catalogosServices.consultarPlanesEstudio();
    for (let i = 0; i < res.objeto.length; i++) {
      this.planes.push({
        id: res.objeto[i].id,
        inicio: res.objeto[i].inicio,
        fin: res.objeto[i].fin,
        creditos: res.objeto[i].creditos,
        semestres: res.objeto[i].semestres,
        carrera: res.objeto[i].carrera
      });
    }
    console.log("planes ",this.planes)

    this.dataSource = new MatTableDataSource<PlanEstudiosModel>(this.planes);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'Planes por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }
  eliminarPlan(model: PlanEstudiosModel)
  {
    console.log("eliminar", model);
    
  }

  openModalPlanEstudios(alta: boolean = true) {
    this.dialog.open(AltaPlanComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: alta, plan: null },
      disableClose: true
    }).afterClosed().subscribe(( plan: any) => {
      /**
       * Customer is the updated  materia (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  updateModalPlanEstudios(model: PlanEstudiosModel) {
    this.dialog.open(AltaPlanComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: false, plan: model },
      disableClose: true
    }).afterClosed().subscribe(( plan: any) => {
      /**
       * Customer is the updated  materia (if the user pressed Save - otherwise it's null)
       */

       this.ngOnInit();
    });
  }
}
