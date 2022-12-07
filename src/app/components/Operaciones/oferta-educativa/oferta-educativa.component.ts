import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Oferta } from 'src/app/modelos/Catalogos';
import { ModalOfertaEducativaComponent } from './modal-oferta-educativa/modal-oferta-educativa.component';

@Component({
  selector: 'vex-oferta-educativa',
  templateUrl: './oferta-educativa.component.html',
  styleUrls: ['./oferta-educativa.component.scss']
})
export class OfertaEducativaComponent implements OnInit {

  ofertas: Oferta[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [' oferta', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Semestre', property: 'semestre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Sigla', property: 'sigla', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl) {
                this.ofertas.push(
                  {
                    id: 0,
                    semestre: "semestre",
                    sigla: "sigla"
                  }
                );
  }

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
    //let res = await this.grupoOpcionesServices.obtenerGrupos();
    // console.log('todos los ofertas',res);
    // this.ofertas = res;

    this.dataSource = new MatTableDataSource<Oferta>(this.ofertas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Ofertas por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    this.dialog.open(ModalOfertaEducativaComponent,{
      height: '50%',
      width: '70%',
      autoFocus: false,
      data: 0
   }).afterClosed().subscribe((  oferta: any) => {
      /**
       * Customer is the updated   oferta (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  openModalUpdate(  oferta: any) {
    console.log('editar',  oferta);
    this.dialog.open(ModalOfertaEducativaComponent, {
      data:   oferta,
      height: '50%',
      width: '70%',
      autoFocus: false
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated   oferta (if the user pressed Save - otherwise it's null)
       */
      this.ngOnInit();
    });
  }

}
