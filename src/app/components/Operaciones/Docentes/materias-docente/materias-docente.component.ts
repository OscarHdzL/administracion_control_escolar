import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Materia } from 'src/app/modelos/Catalogos';
import { DocentesModel, MateriaDocenteModel, RelDocenteMateriaPlantilla } from 'src/app/modelos/Docentes.model';
import { MateriaModel, vwMateria } from 'src/app/modelos/Materia.model';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';


@Component({
  selector: 'vex-materias-docente',
  templateUrl: './materias-docente.component.html',
  styleUrls: ['./materias-docente.component.scss']
})
export class MateriasDocenteComponent implements OnInit {

  materias: Materia[]
  filteredOptions: Observable<Materia[]>;
  PLACEHOLDER = 'SELECCIONE UNA OPCIÓN;'

  formGrupo: FormGroup;
  alta: boolean;
  docenteModel: DocentesModel;
/* tabla */

  materiasDocente: MateriaDocenteModel[] = [];

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
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true, }
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialogRef: MatDialogRef<MateriasDocenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService,
    private dialog: MatDialog
  ) {
    console.log(data);
    this.alta = data.alta;
    this.docenteModel = data.docente;

    this.iniciarForm();
  }
  get visibleColumns1() {
    return this.columns1.filter(column => column.visible).map(column => column.property);
  }


  async ngOnInit() {
    this.iniciarForm()

    this.materias = await this.consultarMaterias();

    this.materias.length > 0 ? this.PLACEHOLDER = 'SELECCIONE UNA OPCIÓN' : this.PLACEHOLDER = 'NO SE ENCONTRARON MATERIAS';

    this.materiasDocente = await this.obtenerMateriasByIdDocente();

    this.dataSource = new MatTableDataSource<MateriaDocenteModel>(this.materiasDocente);

    this.filteredOptions = this.formGrupo.get('materia').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.materia;
        return name ? this._filter(name as string) : this.materias.slice();
      }),
    );
  }


  public async obtenerMateriasByIdDocente(){
    const respuesta = await this.catalogosService.consultarMateriasByIdDocente(this.docenteModel.id);
    return respuesta.objeto ? respuesta.objeto: [];
  }

  public async consultarMaterias(){
    const respuesta = await this.catalogosService.consultarMaterias();
    return respuesta.objeto ? respuesta.objeto: [];
  }

  public actualizarTabla(){


    this.dataSource = new MatTableDataSource<MateriaDocenteModel>(this.materiasDocente);

    this.table.renderRows();
    this.table2.renderRows();
  }


  private _filter(name: string): Materia[] {
    const filterValue = name.toLowerCase();
    return this.materias.filter(option => option.materia.toLowerCase().includes(filterValue));
  }

  public iniciarForm() {
    this.formGrupo = this.formBuilder.group({
      materia: [null, [Validators.required]]
    })
  }

  get materia() { return this.formGrupo.get('materia') }

  public inicializarForm() {
    if (this.alta) { return; }
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


public async agregarMateria(){


/* let materiaDocente: RelDocenteMateriaPlantilla = {
  id: 0,
    tblGrupoId: this.docenteModel.id,
    relMateriaPlantillaId: this.materia.value.relMateriaPlantillaId,
    inclusion: new Date(),
    activo : true
} */


let materiaDocente = new RelDocenteMateriaPlantilla();

materiaDocente.relDocenteId = this.docenteModel.id;
materiaDocente.relMateriaPlantillaId = this.materia.value.relMateriaPlantillaId;

  console.log(materiaDocente);

  const respuesta = await this.catalogosService.agregarMateriaDocente(materiaDocente);

  if(respuesta.exito){
    this.toastService.toastSuccess(respuesta.mensaje);
    this.ngOnInit();
  }else{
    this.toastService.toastErr(respuesta.error);
  }

}

  public async eliminarmateriaDocente(idmateriaDocente){


    const respuesta = await this.catalogosService.eliminarMateriaDocente(idmateriaDocente);
    if(respuesta.exito){
      this.toastService.toastSuccess('Se elimino correctamente')
      this.ngOnInit();
    } else {
      this.toastService.toastSuccess(respuesta.error);
    }


  }


}
