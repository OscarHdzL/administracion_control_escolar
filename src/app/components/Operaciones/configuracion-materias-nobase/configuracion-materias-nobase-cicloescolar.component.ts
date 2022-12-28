import { AgregarMateriaNobaseCicloescolarComponent } from './agregar-materia-nobase-cicloescolar/agregar-materia-nobase-cicloescolar.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Materia, MateriaNoBaseCicloEscolar } from 'src/app/modelos/Catalogos';

import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuracion-materias-nobase',
  templateUrl: './configuracion-materias-nobase-cicloescolar.component.html',
  styleUrls: ['./configuracion-materias-nobase-cicloescolar.component.scss']
})
export class ConfiguracionMateriasNobaseCicloEscolarComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  displayedColumns: string[] = ['materia', 'acciones'];
  materias: MateriaNoBaseCicloEscolar[] = []

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
}

  async ngOnInit() {


    this.materias = await this.obtenerMaterias();

    this.dataSource = new MatTableDataSource<Materia>(this.materias);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Materias por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

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

  public async obtenerMaterias(){
    const respuesta = await this.catalogosServices.consultarMateriasNobaseCicloEscolar();
    return respuesta.exito ? respuesta.objeto : [];
  }

  openModalCreate() {
    this.dialog.open(AgregarMateriaNobaseCicloescolarComponent,{
      height: '40%',
      width: '70%',
      autoFocus: false,
      data: 0,
      disableClose: true
   }).afterClosed().subscribe(( materia: any) => {
      /**
       * Customer is the updated  materia (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');
      this.ngOnInit();
    });
  }

}
