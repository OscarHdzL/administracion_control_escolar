import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { CicloEscolar } from 'src/app/modelos/Catalogos';
import { ModalCicloEscolarComponent } from './modal-ciclo-escolar/modal-ciclo-escolar.component';
import { ModalConfigurarPeriodoEscolarComponent } from './modal-configurar-periodo-escolar/modal-configurar-periodo-escolar.component';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'vex-ciclo-escolar',
  templateUrl: './ciclo-escolar.component.html',
  styleUrls: ['./ciclo-escolar.component.scss']
})
export class CicloEscolarComponent implements OnInit {

  ciclos: CicloEscolar[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [' espacio', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Fecha Inicio', property: 'fechaI', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Fin', property: 'fechaF', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Estatus', property: 'estatus', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl,
              private catalogosServices: CatalogosServices,
              private swalService: SwalServices,
              private toastService:VariablesService,) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  async deleteCiclo(row: CicloEscolar){

    row.catEstatusCicloEscolarId = 4;
    let res = await this.catalogosServices.actualizarCiclo(row);
    if(res.exito==true){
      this.swalService.alertaPersonalizado(res.exito,res.mensaje);
      this.ngOnInit();
    }else{
      this.toastService.toastErr(res.error);
    }
  }
  async vigente(row: CicloEscolar){

    row.catEstatusCicloEscolarId = 2;
    let res = await this.catalogosServices.actualizarCiclo(row);
    if(res.exito==true){
      this.swalService.alertaPersonalizado(res.exito,res.mensaje);
      this.ngOnInit();
    }else{
      this.toastService.toastErr(res.error);
    }
  }
  async programado(row: CicloEscolar){

    row.catEstatusCicloEscolarId = 1;
    let res = await this.catalogosServices.actualizarCiclo(row);
    if(res.exito==true){
      this.swalService.alertaPersonalizado(res.exito,res.mensaje);
      this.ngOnInit();
    }else{
      this.toastService.toastErr(res.error);
    }
  }
  async ngOnInit() {
    this.ciclos = [];
    let res = await this.catalogosServices.consultarCiclos();
    console.log('todos los  ciclos',res);
    for (let i = 0; i < res.objeto.length; i++) {
      this.ciclos.push({
        id: res.objeto[i].id,
        inicio: res.objeto[i].inicio,
        fin: res.objeto[i].fin,
        catEstatusCicloEscolarId: res.objeto[i].catEstatusCicloEscolarId
      });
      let resEstatus = await this.catalogosServices.consultarEstatusCicloId(this.ciclos[i].catEstatusCicloEscolarId);
      this.ciclos[i].estatus = resEstatus.objeto[0].estatus;
    }

    console.log(this.ciclos);

    this.dataSource = new MatTableDataSource<CicloEscolar>(this.ciclos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Espacios por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    this.dialog.open(ModalCicloEscolarComponent,{
      height: '50%',
      width: '70%',
      autoFocus: false,
      data: 0,
      disableClose: true
   }).afterClosed().subscribe((  espacio: any) => {
      /**
       * Customer is the updated   espacio (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  openModalSettings(  espacio: any) {
    console.log('editar',  espacio);
    this.dialog.open(ModalConfigurarPeriodoEscolarComponent, {
      data:   espacio,
      height: '90%',
      width: '95%',
      autoFocus: false,
      disableClose: true
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated   espacio (if the user pressed Save - otherwise it's null)
       */
      this.ngOnInit();
    });
  }
  openCicliModalCreate(tipo:number,row:any) {
    let objeto = {tipo,row}
    this.dialog.open(ModalCicloEscolarComponent,{
      height: '90%',
      width: '95%',
      autoFocus: false,
      data: objeto,
      disableClose: true
   }).afterClosed().subscribe(( materia: any) => {
      console.log('se guardo bien');
      this.ngOnInit();
    });
  }


}


