import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Espacio } from 'src/app/modelos/Catalogos';
import { ModalEspaciosAcademicosComponent } from './modal-espacios-academicos/modal-espacios-academicos.component';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';

@Component({
  selector: 'vex-espacios-academicos',
  templateUrl: './espacios-academicos.component.html',
  styleUrls: ['./espacios-academicos.component.scss']
})
export class EspaciosAcademicosComponent implements OnInit {

   espacios: Espacio[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [' espacio', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Espacio Academico', property: 'espacio', type: 'text', visible: true, cssClasses: ['font-medium'] },
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
    //
    // console.log('clic eliminar',row);
    // row.activo = false;
    // let res = await this.grupoOpcionesServices.actualizarGrupo(row);
    // console.log('se elimino',res);
    this.ngOnInit();
  }
  async ngOnInit() {
    this.espacios = [];
    let res = await this.catalogosServices.consultarEspacios();
    console.log('todos los  ramas',res);
    for (let i = 0; i < res.objeto.length; i++) {
      this.espacios.push({
        id: res.objeto[i].id,
        espacio: res.objeto[i].espacio
      });
    }
    
    this.dataSource = new MatTableDataSource<Espacio>(this. espacios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Espacios por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    this.dialog.open(ModalEspaciosAcademicosComponent,{
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
    this.dialog.open(ModalEspaciosAcademicosComponent, {
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
