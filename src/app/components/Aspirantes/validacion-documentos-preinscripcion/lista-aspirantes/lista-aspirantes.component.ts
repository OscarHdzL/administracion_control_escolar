import { PreregistroAspiranteService } from './../../../../servicios/preregistro-aspirante.service';
import { ListaDocumentosAspiranteComponent } from './../lista-documentos-aspirante/lista-documentos-aspirante.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { PlanEstudiosModel } from 'src/app/modelos/PlanEstudios.model';
import { PreRegistroSelect } from 'src/app/modelos/PreregistroModel';

@Component({
  selector: 'vex-lista-aspirantes',
  templateUrl: './lista-aspirantes.component.html',
  styleUrls: ['./lista-aspirantes.component.scss']
})
export class ListaAspirantesComponent implements OnInit {

  listaAspirantes = new Array<PreRegistroSelect>();
  planes: PlanEstudiosModel[] = [];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns: TableColumn<any>[] = [
    { label: 'Nombre', property: 'nombre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Apellido Paterno', property: 'paterno', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Apellido Materno', property: 'materno', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha nacimiento', property: 'fechaNacimiento', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Curp', property: 'curp', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Número pasaporte', property: 'numeroPasaporte', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true }
  ];



  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private preregistroService: PreregistroAspiranteService,
    private dialog: MatDialog) {

  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {

    this.listaAspirantes = await this.obtenerAspirantes();


    this.dataSource = new MatTableDataSource<PreRegistroSelect>(this.listaAspirantes);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'Aspirantes por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }




  openModalDocumentosAspirante(model: PreRegistroSelect) {

    this.dialog.open(ListaDocumentosAspiranteComponent, {
      width: '90%',
      height: '60%',
      autoFocus: false,
      data: model,
      disableClose: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  public async obtenerAspirantes(){

    const respuesta = await this.preregistroService.obtenerAspirantesXOfertaEducativa(1);

    return (respuesta.objeto) ? respuesta.objeto : [];
  }

}
