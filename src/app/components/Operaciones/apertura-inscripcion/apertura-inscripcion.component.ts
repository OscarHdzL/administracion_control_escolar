import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { AperturaInscripcion } from 'src/app/modelos/Catalogos';
import { ModalAperturaInscripcionComponent } from './modal-apertura-inscripcion/modal-apertura-inscripcion.component';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
@Component({
  selector: 'vex-apertura-inscripcion',
  templateUrl: './apertura-inscripcion.component.html',
  styleUrls: ['./apertura-inscripcion.component.scss']
})
export class AperturaInscripcionComponent implements OnInit {

  aperturas: AperturaInscripcion[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [' apertura', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Nombre', property: 'nombre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Inicio', property: 'fechaI', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Fin', property: 'fechaF', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Oferta Educativa', property: 'oferta', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl,
              private catalogosServices: CatalogosServices
              ) {
                this. aperturas.push(
                  {
                    id: 0,
                    nombre: "Nombre",
                    fechaInicio: "fechaInicio",
                    fechaFin: "fechaFin",
                    idOferta: 1
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
    let res = await this.catalogosServices.consultarOfertaEducativaId(this.aperturas[0].idOferta);
    console.log('oferta por id',res);
    this.aperturas[0].oferta = res.objeto[0].ofertaEducativa;

    this.dataSource = new MatTableDataSource<AperturaInscripcion>(this.aperturas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Aperturas por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    this.dialog.open(ModalAperturaInscripcionComponent,{
      height: '50%',
      width: '70%',
      autoFocus: false,
      data: 0
   }).afterClosed().subscribe((  apertura: any) => {
      /**
       * Customer is the updated   apertura (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  openModalUpdate(  apertura: any) {
    console.log('editar',  apertura);
    this.dialog.open(ModalAperturaInscripcionComponent, {
      data:   apertura,
      height: '50%',
      width: '70%',
      autoFocus: false
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated   apertura (if the user pressed Save - otherwise it's null)
       */
      this.ngOnInit();
    });
  }

}
