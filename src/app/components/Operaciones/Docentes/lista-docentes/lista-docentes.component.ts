import { MateriasNobaseDocenteComponent } from './../materias-nobase-docente/materias-nobase-docente.component';
import { MateriasDocenteComponent } from './../materias-docente/materias-docente.component';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { DocentesModel } from './../../../../modelos/Docentes.model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/servicios/params/data.service';
import { DocentesServices } from 'src/app/servicios/docentes.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'vex-lista-docentes',
  templateUrl: './lista-docentes.component.html',
  styleUrls: ['./lista-docentes.component.scss']
})
export class ListaDocentesComponent implements OnInit {

  listaDocentes: DocentesModel[] = [];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns: TableColumn<any>[] = [
    { label: 'Nombre', property: 'nombre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Departamento', property: 'departamento', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Perfil Academico', property: 'descripcionPerfil', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Categoria', property: 'categoriaAcademico', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true }
  ];



  constructor(public matPaginatorIntl: MatPaginatorIntl,
              private router: Router,
              private dataService: DataService,
              private catalogosServices: CatalogosServices,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private dialog: MatDialog,
              ) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {

    this.listaDocentes = await this.obtenerDocentes();
console.log(this.listaDocentes)
    this.dataSource = new MatTableDataSource<DocentesModel>(this.listaDocentes);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'Docentes por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }

  irEditarDocente(dato: any) {

    this.dataService.setData('docente', dato);
    this.router.navigate(['/components/editar-docentes/docente']);
  }
  irAltaDocente() {
    /* this.router.navigate(['/components/registro-docentes']); */
    this.router.navigateByUrl('/components/registro-docentes');
  }




  public async obtenerDocentes(){
    const respuesta = await this.catalogosServices.consultarDocentes();
    return respuesta.objeto ? respuesta.objeto : [];
  }


  openModalMateriasDocente(model: DocentesModel) {
    this.dialog.open(MateriasDocenteComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: true, docente: model },
      disableClose: true
    }).afterClosed().subscribe(result => {

      if(result){
        this.ngOnInit();
      }
      console.log(result);
    });
  }

  openModalMateriasNobaseDocente(model: DocentesModel) {
    this.dialog.open(MateriasNobaseDocenteComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: true, docente: model },
      disableClose: true
    }).afterClosed().subscribe(result => {

      if(result){
        this.ngOnInit();
      }
      console.log(result);
    });
  }

  public async eliminarDocente(idDocente){

    const respuesta = await this.catalogosServices.eliminarDocente(idDocente);
    if(respuesta.exito){
      this.toastService.toastSuccess('Se elimino correctamente')
      this.ngOnInit();
    } else {
      this.toastService.toastSuccess(respuesta.error);
    }
  }

}
