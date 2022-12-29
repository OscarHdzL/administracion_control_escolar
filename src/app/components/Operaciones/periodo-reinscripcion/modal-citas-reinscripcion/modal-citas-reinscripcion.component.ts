import { CatalogosServices } from 'src/app/servicios/catalogos.service';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CitasPeriodoReinscripcion } from 'src/app/modelos/Catalogos';


@Component({
  selector: 'app-modal-citas-reinscripcion',
  templateUrl: './modal-citas-reinscripcion.component.html',
  styleUrls: ['./modal-citas-reinscripcion.component.scss']
})
export class ModalCitasReinscripcionComponent implements OnInit {

  citasPeriodo: CitasPeriodoReinscripcion[] = [];
  displayedColumns: string[] = ['opcion', 'acciones'];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ID_PERIODOREINSCRIPCION: number

  columns: TableColumn<any>[] = [
    { label: 'Alumno', property: 'nombreAlumno', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Inicio', property: 'fechaInicio', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Fin', property: 'fechaFin', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Finalizó alumno', property: 'finalizadoPorAlumno', type: 'text', visible: true, cssClasses: ['font-medium'] },
    /* { label: 'Acciones', property: 'actions', type: 'button', visible: true } */
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: number,
              private dialogRef: MatDialogRef<ModalCitasReinscripcionComponent>,
              private fb: UntypedFormBuilder,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl,
              public catalogosServices: CatalogosServices
              ) {
                this.ID_PERIODOREINSCRIPCION = this.objeto;
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {

      this.citasPeriodo = await this.obtenerCitasPeriodoReinscripcion();


      this.dataSource = new MatTableDataSource<CitasPeriodoReinscripcion>(this.citasPeriodo);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.matPaginatorIntl.itemsPerPageLabel = "Periodos por página";
      this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
      this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  public async obtenerCitasPeriodoReinscripcion(){
    const respuesta = await this.catalogosServices.consultarCitasPeriodoReinscripcion(this.ID_PERIODOREINSCRIPCION);
    return respuesta.exito ? respuesta.objeto : [];
  }

}
