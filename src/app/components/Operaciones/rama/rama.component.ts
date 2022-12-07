import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Rama } from 'src/app/modelos/Catalogos';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { ModalRamaComponent } from './modal-rama/modal-rama.component';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
@Component({
  selector: 'vex-rama',
  templateUrl: './rama.component.html',
  styleUrls: ['./rama.component.scss']
})
export class RamaComponent implements OnInit {

  ramas: Rama[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [' rama', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Rama', property: 'rama', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl,
              private catalogosServices: CatalogosServices,
              private swalService: SwalServices,
              private toastService:VariablesService,) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  async deleteGrupo(row: any){
    let res = await this.catalogosServices.eliminarRama(row.id);
    if(res.exito==true){
      this.swalService.alertaPersonalizado(res.exito,res.mensaje);
      this.ngOnInit();
    }else{
      this.toastService.toastErr(res.mensaje);
    }   
  }
  async ngOnInit() {
    this.ramas = [];
    let res = await this.catalogosServices.consultarRamas();
    console.log('todos los  ramas',res);
    for (let i = 0; i < res.objeto.length; i++) {
      this.ramas.push({
        id: res.objeto[i].id,
        rama: res.objeto[i].rama,
        activo: res.objeto[i].activo
      });
    }

    this.dataSource = new MatTableDataSource<Rama>(this.ramas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Ramas por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    this.dialog.open(ModalRamaComponent,{
      height: '50%',
      width: '70%',
      autoFocus: false,
      data: 0
   }).afterClosed().subscribe((  rama: any) => {
      /**
       * Customer is the updated   rama (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  openModalUpdate(  rama: any) {
    console.log('editar',  rama);
    this.dialog.open(ModalRamaComponent, {
      data:   rama,
      height: '50%',
      width: '70%',
      autoFocus: false
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated   rama (if the user pressed Save - otherwise it's null)
       */
      this.ngOnInit();
    });
  }

}
