import { AltaGrupoComponent } from './../alta-grupo/alta-grupo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { GrupoModel } from 'src/app/modelos/Grupo.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AltaMateriasGrupoComponent } from '../alta-materias-grupo/alta-materias-grupo.component';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { id } from 'date-fns/locale';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { CalendarioGrupoComponent } from '../calendario-grupo/calendario-grupo.component';

@Component({
  selector: 'vex-lista-grupo',
  templateUrl: './lista-grupo.component.html',
  styleUrls: ['./lista-grupo.component.scss']
})
export class ListaGrupoComponent implements OnInit {

  grupos: GrupoModel[] = [];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: TableColumn<any>[] = [
    { label: 'Grupo', property: 'grupo', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Deporte', property: 'deporte', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Aforo Máximo', property: 'aforomax', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true }
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService
  ) {
/*     this.grupos.push(
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


    this.grupos = await this.obtenerGrupos();


    this.dataSource = new MatTableDataSource<GrupoModel>(this.grupos);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'Grupos por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }

  openModalGrupo(model: GrupoModel) {
    this.dialog.open(AltaGrupoComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: true, grupo: model },
      disableClose: true
    }).afterClosed().subscribe(result => {

      if(result){
        this.ngOnInit();
      }
      console.log(result);
    });
  }


  openModalMaterias(model: GrupoModel) {
    this.dialog.open(AltaMateriasGrupoComponent, {
      width: '70%',
      height: '80%',
      autoFocus: false,
      data: { alta: false, grupo: model },
      disableClose: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  openModalCalendarioGrupo(model: GrupoModel) {
    this.dialog.open(CalendarioGrupoComponent, {
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: { alta: false, grupo: model },
      disableClose: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }



  public async obtenerGrupos(){
    const respuesta = await this.catalogosService.consultarGrupos();
    return respuesta.exito ? respuesta.objeto : [];
  }


  public async eliminarGrupo(idGrupo){


    const respuesta = await this.catalogosService.eliminarGrupo(idGrupo);
    if(respuesta.exito){
      this.toastService.toastSuccess('Se elimino correctamente')
      this.ngOnInit();
    } else {
      this.toastService.toastSuccess(respuesta.error);
    }
  }


}
