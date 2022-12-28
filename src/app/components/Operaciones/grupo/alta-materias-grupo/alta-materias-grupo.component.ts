
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { GrupoMateriaPlantillaModel, GrupoModel } from 'src/app/modelos/Grupo.model';
import { MateriaModel, vwMateria } from 'src/app/modelos/Materia.model';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { AltaDocenteMateriaGrupoComponent } from './alta-docente-materia-grupo/alta-docente-materia-grupo.component';

@Component({
  selector: 'vex-alta-materias-grupo',
  templateUrl: './alta-materias-grupo.component.html',
  styleUrls: ['./alta-materias-grupo.component.scss']
})
export class AltaMateriasGrupoComponent implements OnInit {

  //options: string[] = ['One', 'Two', 'Three'];
  materiasNoBase: vwMateria[]
  filteredOptions: Observable<vwMateria[]>;
  PLACEHOLDER = 'SELECCIONE UNA OPCIÓN;'

  formGrupo: FormGroup;
  alta: boolean;
  grupoModel: GrupoModel;
/* tabla */

  materiasgrupo: GrupoMateriaPlantillaModel[] = [];
  materiasgrupoBase: GrupoMateriaPlantillaModel[] = [];
  materiasgrupoNoBase: GrupoMateriaPlantillaModel[] = [];
  dataSource: any;
  dataSource2: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('mitabla') table: MatTable<any>;
  @ViewChild('mitabla2') table2: MatTable<any>;

  columns1: TableColumn<any>[] = [
    { label: 'Materia', property: 'materia', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Rama', property: 'rama', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Créditos', property: 'creditos', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Base', property: 'base', type: 'text', visible: true, cssClasses: ['font-medium'] },
/*     { label: 'Docente', property: 'nombreDocente', type: 'text', visible: true, cssClasses: ['font-medium'] }, */
    /* { label: 'Acciones', property: 'acciones', type: 'button', visible: true, } */
  ];

  columns2: TableColumn<any>[] = [
    { label: 'Materia', property: 'materia', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Rama', property: 'rama', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Créditos', property: 'creditos', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Base', property: 'base', type: 'text', visible: true, cssClasses: ['font-medium'] },
    /* { label: 'Docente', property: 'nombreDocente', type: 'text', visible: true, cssClasses: ['font-medium'] }, */
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true, }
  ];

/*  */

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialogRef: MatDialogRef<AltaMateriasGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService,
    private dialog: MatDialog,

  ) {

    console.log(data);
    this.alta = data.alta;
    this.grupoModel = data.grupo;


   /*  this.formGrupo = this.formBuilder.group({
      materia: [null, [Validators.required]]
    }) */

    this.iniciarForm();
  }
  get visibleColumns1() {
    return this.columns1.filter(column => column.visible).map(column => column.property);
  }

  get visibleColumns2() {
    return this.columns2.filter(column => column.visible).map(column => column.property);
  }


  async ngOnInit() {

    this.iniciarForm()

    this.materiasNoBase = await this.obtenerMateriasNoBase(this.grupoModel.relPlantillaId);
    this.materiasNoBase.length > 0 ? this.PLACEHOLDER = 'SELECCIONE UNA OPCIÓN' : this.PLACEHOLDER = 'NO SE ENCONTRARON MATERIAS NO BASE';


    this.materiasgrupo = await this.obtenerMateriasGrupo(this.grupoModel.id);

    //this.materiasgrupoBase = this.materiasgrupo.filter((x)=> x.base == true);
    this.materiasgrupoBase = this.materiasgrupo;
    this.materiasgrupoNoBase = this.materiasgrupo.filter((x)=> x.base == false);

    this.dataSource = new MatTableDataSource<GrupoMateriaPlantillaModel>(this.materiasgrupoBase);
    this.dataSource2 = new MatTableDataSource<GrupoMateriaPlantillaModel>(this.materiasgrupoNoBase);

    //this.paginator.pageSizeOptions = [4,8,12]
    /* this.paginator._changePageSize(8);
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'materiasgrupo por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página'; */



    //this.inicializarForm();

    /* this.filteredOptions = this.formGrupo.get('materia').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    ); */

    this.filteredOptions = this.formGrupo.get('materia').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.materia;
        return name ? this._filter(name as string) : this.materiasNoBase.slice();
      }),
    );
  }


  public actualizarTabla(){

/*
    this.materiasgrupo.push(
      {
        id: 1,
        creditos: 1,
        materia: 'P',
        base: 'A',
        rama: 'A'
      }
    ); */

/*     this.materiasgrupo = await this.obtenerMateriasGrupo(this.grupoModel.id);
 */
    this.materiasgrupoBase = this.materiasgrupo.filter((x)=> x.base == true);
    this.materiasgrupoNoBase = this.materiasgrupo.filter((x)=> x.base == false);

    this.dataSource = new MatTableDataSource<GrupoMateriaPlantillaModel>(this.materiasgrupoBase);
    this.dataSource2 = new MatTableDataSource<GrupoMateriaPlantillaModel>(this.materiasgrupoNoBase);
/*     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'materiasgrupo por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página'; */

    this.table.renderRows();
    this.table2.renderRows();
  }

/*   private _filter(value: string): vwMateria[] {
    const filterValue = value.toLowerCase();

    return this.materiasNoBase.filter(option => option.materia.toLowerCase().includes(filterValue));
  } */

  private _filter(name: string): vwMateria[] {
    const filterValue = name.toLowerCase();

    return this.materiasNoBase.filter(option => option.materia.toLowerCase().includes(filterValue));
  }

  public iniciarForm() {
    this.formGrupo = this.formBuilder.group({
      materia: [null, [Validators.required]]
    })
  }

  get materia() { return this.formGrupo.get('materia') }

  public inicializarForm() {
    if (this.alta) { return; }
/*     this.periodo.setValue(this.grupoModel.idPeriodo);
    this.grupo.setValue(this.grupoModel.grupo);
    this.aforo.setValue(this.grupoModel.aforoMaximo); */
  }


  close(result: boolean) {
    this.dialogRef.close(result);
  }

  enviar() {
    this.close(true);
  }


  displayFn(mat: vwMateria): string {
    return mat && mat.materia ? mat.materia : '';
  }

public async obtenerMateriasGrupo(idGrupo){
  const respuesta = await this.catalogosService.consultarMateriasGrupoById(idGrupo);
  return respuesta.objeto ? respuesta.objeto : [];
}


public async obtenerMateriasNoBase(idPlantilla){
  const respuesta = await this.catalogosService.consultarMateriasNoBaseByIdPlantilla(idPlantilla);
  return respuesta.objeto ? respuesta.objeto : [];
}


public async agregarMateria(){


let materiaGrupo = {
  id: 0,
    tblGrupoId: this.grupoModel.id,
    relMateriaPlantillaId: this.materia.value.relMateriaPlantillaId,
    inclusion: new Date(),
    activo : true
}
  console.log(materiaGrupo);

  const respuesta = await this.catalogosService.insertarMateriaGrupo(materiaGrupo);

  if(respuesta.exito){
    this.toastService.toastSuccess(respuesta.mensaje);
    this.ngOnInit();
  }else{
    this.toastService.toastErr(respuesta.error);
  }

}

//InhabilitarMateriaGrupo


  public async eliminarMateriaGrupo(idMateriaGrupo){


    const respuesta = await this.catalogosService.eliminarMateriaGrupo(idMateriaGrupo);
    if(respuesta.exito){
      this.toastService.toastSuccess('Se elimino correctamente')
      this.ngOnInit();
    } else {
      this.toastService.toastSuccess(respuesta.error);
    }


  }


  openModalDocenteMateriaGrupo(model: GrupoMateriaPlantillaModel) {
    this.dialog.open(AltaDocenteMateriaGrupoComponent, {
      width: '40%',
      height: '40%',
      autoFocus: false,
      data: { alta: true, grupo: model },
      disableClose: true
    }).afterClosed().subscribe(result => {


      if(result){
        this.ngOnInit();
      }
      console.log(result);
    });
  }


  public async eliminarDocenteGrupo(idGrupoDocenteMateria){


    const respuesta = await this.catalogosService.eliminarDocenteGrupoMateria(idGrupoDocenteMateria);
    if(respuesta.exito){
      this.toastService.toastSuccess('Se elimino correctamente');
      this.ngOnInit();
    } else {
      this.toastService.toastErr(respuesta.error);
    }

  }

}
