import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { AlumnoNuevoIngreso } from 'src/app/modelos/Catalogos';


@Component({
  selector: 'app-inscripcion-nuevo-ingreso',
  templateUrl: './inscripcion-nuevo-ingreso.component.html',
  styleUrls: ['./inscripcion-nuevo-ingreso.component.scss']
})
export class InscripcionNuevoIngresoComponent implements OnInit {

  alumnos: AlumnoNuevoIngreso[] = [];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: TableColumn<any>[] = [
    { label: 'Alumno', property: 'nombreAlumno', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Matrícula', property: 'matricula', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'RFC', property: 'rfc', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Deporte', property: 'deporte', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true }
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService
  ) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {


    this.alumnos = await this.obtenerAlumnos();


    this.dataSource = new MatTableDataSource<AlumnoNuevoIngreso>(this.alumnos);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'Alumnos por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }



  public async obtenerAlumnos(){
    const respuesta = await this.catalogosService.consultarAlumnosNuevoIngreso();
    return respuesta.exito ? respuesta.objeto : [];
  }

  public async inscribir() {
    const respuesta = await this.catalogosService.inscribirAlumnosNuevoIngreso({});

    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje)
      this.ngOnInit();
    } else {
      this.toastService.toastErr(respuesta.error)
    }
  }


}
