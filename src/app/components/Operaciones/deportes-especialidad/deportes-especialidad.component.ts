import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Deporte } from 'src/app/modelos/Catalogos';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { ModalDeportesEspecialidadComponent } from './modal-deportes-especialidad/modal-deportes-especialidad.component';

@Component({
  selector: 'vex-deportes-especialidad',
  templateUrl: './deportes-especialidad.component.html',
  styleUrls: ['./deportes-especialidad.component.scss']
})
export class DeportesEspecialidadComponent implements OnInit {

  deportes: Deporte[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [' espacio', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Deporte - Especialidad', property: 'deporte', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl,
              private catalogosServices: CatalogosServices,
              private swalService: SwalServices,
              private toastService:VariablesService,) {  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  async deleteGrupo(row: any){
    let res =  await this.catalogosServices.eliminarDeporte(row.id);
    if(res.exito==true){
      this.swalService.alertaPersonalizado(res.exito,res.mensaje);
      this.ngOnInit();
    }else{
      this.toastService.toastErr(res.mensaje);
    }   
  }
  async ngOnInit() {
    this.deportes = [];
    let res = await this.catalogosServices.consultarDeportes();
    console.log('todos los  ramas',res);
    for (let i = 0; i < res.objeto.length; i++) {
      this.deportes.push({
        id: res.objeto[i].id,
        deporte: res.objeto[i].deporte,
        activo: res.objeto[i].activo
      });
    }
    
    this.dataSource = new MatTableDataSource<Deporte>(this. deportes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Deportes por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    this.dialog.open(ModalDeportesEspecialidadComponent,{
      height: '50%',
      width: '70%',
      autoFocus: false,
      data: 0
   }).afterClosed().subscribe((  espacio: any) => {
      /**
       * Customer is the updated   espacio (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  openModalUpdate(  espacio: any) {
    console.log('editar',  espacio);
    this.dialog.open(ModalDeportesEspecialidadComponent, {
      data:   espacio,
      height: '50%',
      width: '70%',
      autoFocus: false
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated   espacio (if the user pressed Save - otherwise it's null)
       */
      this.ngOnInit();
    });
  }

}
