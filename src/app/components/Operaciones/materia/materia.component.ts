import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Materia } from 'src/app/modelos/Catalogos';
import { ModalMateriaComponent } from './modal-materia/modal-materia.component';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'vex-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent implements OnInit {

  materias: Materia[] = [];
  dataSource:any;
  TIPOMATERIA: String
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['materia', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Materia', property: 'materia', type: 'text', visible: true, cssClasses: ['font-medium'] },
     { label: 'Abreviatura', property: 'abreviatura', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Semestre', property: 'semestre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Espacio Academico', property: 'espacio', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Rama', property: 'rama', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Creditos', property: 'creditos', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Tipo materia', property: 'tipoMateria', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl,
              private catalogosServices: CatalogosServices,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private route: ActivatedRoute) {
                this.TIPOMATERIA = this.route.snapshot.url[1].path;
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
   this.materias = await this.obtenerMaterias();
    /* let res = await this.catalogosServices.consultarMaterias();
    console.log('todos los  materias',res);
    for (let i = 0; i < res.objeto.length; i++) {
      this.materias.push({
        idMateria: res.objeto[i].idMateria,
        materia: res.objeto[i].materia,
        abreviatura: res.objeto[i].abreviatura,
        catEspaciosAcademicosId: res.objeto[i].catEspaciosAcademicosId,
        catRamaId: res.objeto[i].catRamaId,
        status: res.objeto[i].status,
        base: res.objeto[i].base,
        creditos: res.objeto[i].creditos,
        idPlanEstudio: res.objeto[i].idPlanEstudios,
        idSemestre: res.objeto[i].idSemestre,
        semestre: res.objeto[i].semestre

      });
      if (this.materias[i].base) {
        this.materias[i].estatus = "Base"
      } else {
        this.materias[i].estatus = "Especialidad"
      }
      let espacioId = await this.catalogosServices.consultarEspacioId(this.materias[i].catEspaciosAcademicosId);
      this.materias[i].espacio = espacioId.objeto[0].espacio;
      let ramaId = await this.catalogosServices.consultarRamaId(this.materias[i].catRamaId);
      this.materias[i].rama = ramaId.objeto[0].rama;
    }
    console.log("materias",this.materias); */

    this.dataSource = new MatTableDataSource<Materia>(this.materias);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Materias por p??gina";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior p??gina';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente p??gina';

  }

  public async obtenerMaterias(){
    const respuesta = await this.catalogosServices.consultarMaterias();
    return respuesta.exito ? respuesta.objeto : [];
  }

  openModalCreate() {
    this.dialog.open(ModalMateriaComponent,{
      height: '70%',
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

  openModalUpdate( materia: Materia) {
    console.log('modal editar', materia);
    this.dialog.open(ModalMateriaComponent, {
      data:  materia,
      height: '70%',
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
