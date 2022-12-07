import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Materia } from 'src/app/modelos/Catalogos';
import { ModalMateriaOptativaComponent } from './modal-materia-optativa/modal-materia-optativa.component';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
@Component({
  selector: 'vex-materia-optativa',
  templateUrl: './materia-optativa.component.html',
  styleUrls: ['./materia-optativa.component.scss']
})
export class MateriaOptativaComponent implements OnInit {

  materias: Materia[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['materia', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Materia', property: 'nombre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Abreviatura', property: 'abre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Espacio Academico', property: 'espacio', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Rama', property: 'rama', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl,
              private catalogosServices: CatalogosServices,
              private swalService: SwalServices,
              private toastService:VariablesService) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  async deleteGrupo(row: any){
    let res = await this.catalogosServices.eliminarMateria(row.id);
    if(res.exito==true){
      this.swalService.alertaPersonalizado(res.exito,res.mensaje);
      this.ngOnInit();
    }else{
      this.toastService.toastErr(res.mensaje);
    }
  }
  async ngOnInit() {
    this.materias = [];
    let res = await this.catalogosServices.consultarMaterias();
    console.log('todos los  materias',res);
    for (let i = 0; i < res.objeto.length; i++) {
      this.materias.push({
        idMateria: res.objeto[i].idMateria,
        materia: res.objeto[i].materia,
        abreviatura: res.objeto[i].abreviatura,
        catEspaciosAcademicosId: res.objeto[i].catEspaciosAcademicosId,
        catRamaId: res.objeto[i].catRamaId,
        status: res.objeto[i].status
      });
      let espacioId = await this.catalogosServices.consultarEspacioId(this.materias[i].catEspaciosAcademicosId);
      this.materias[i].espacio = espacioId.objeto[0].espacio;
      let ramaId = await this.catalogosServices.consultarRamaId(this.materias[i].catRamaId);
      this.materias[i].rama = ramaId.objeto[0].rama;
    }
    
    this.dataSource = new MatTableDataSource<Materia>(this.materias);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Materias por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    this.dialog.open(ModalMateriaOptativaComponent,{
      height: '50%',
      width: '70%',
      autoFocus: false,
      data: 0
   }).afterClosed().subscribe(( materia: any) => {
      /**
       * Customer is the updated  materia (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  openModalUpdate( materia: any) {
    console.log('editar', materia);
    this.dialog.open(ModalMateriaOptativaComponent, {
      data:  materia,
      height: '50%',
      width: '70%',
      autoFocus: false
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated  materia (if the user pressed Save - otherwise it's null)
       */
      this.ngOnInit();
    });
  }

}
