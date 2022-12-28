import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Materia, MateriaNoBaseCicloEscolar } from 'src/app/modelos/Catalogos';
import { DocentesModel, MateriaDocenteModel, MateriaNobaseDocenteModel, RelDocenteMateriaNoBasePlantilla, RelDocenteMateriaPlantilla } from 'src/app/modelos/Docentes.model';
import { MateriaModel, vwMateria } from 'src/app/modelos/Materia.model';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'app-materias-nobase-docente',
  templateUrl: './materias-nobase-docente.component.html',
  styleUrls: ['./materias-nobase-docente.component.scss']
})
export class MateriasNobaseDocenteComponent implements OnInit {

  materias: MateriaNoBaseCicloEscolar[] = []
  filteredOptions: Observable<Materia[]>;
  PLACEHOLDER = 'SELECCIONE UNA OPCIÓN;'
  listaMateriaDocenteExistente: MateriaNobaseDocenteModel[] = [];

  formGrupo: FormGroup;
  alta: boolean;
  docenteModel: DocentesModel;
/* tabla */

  materiasNobaseDocente: MateriaNobaseDocenteModel[] = [];
  displayBasic = false;
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
    { label: 'Tipo materia', property: 'tipoMateria', type: 'text', visible: true, cssClasses: ['font-medium'] },
/*     { label: 'Docente', property: 'nombreDocente', type: 'text', visible: true, cssClasses: ['font-medium'] }, */
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true, }
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private dialogRef: MatDialogRef<MateriasNobaseDocenteComponent>,
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
    debugger
    this.materias = await this.consultarMateriasNobaseCicloEscolar();

    this.materias.length > 0 ? this.PLACEHOLDER = 'SELECCIONE UNA OPCIÓN' : this.PLACEHOLDER = 'NO SE ENCONTRARON MATERIAS';

    this.materiasNobaseDocente = await this.obtenerMateriasNobaseByIdDocente();
    debugger
    this.dataSource = new MatTableDataSource<MateriaNobaseDocenteModel>(this.materiasNobaseDocente);

    this.filteredOptions = this.formGrupo.get('materia').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.materia;
        return name ? this._filter(name as string) : this.materias.slice();
      }),
    );
  }


  public async obtenerMateriasNobaseByIdDocente(){
    const respuesta = await this.catalogosService.consultarMateriasNoBaseByIdDocente(this.docenteModel.id);
    return respuesta.objeto ? respuesta.objeto: [];
  }

  public async consultarMateriasNobaseCicloEscolar(){
    const respuesta = await this.catalogosService.consultarMateriasNobaseCicloEscolar();
    return respuesta.objeto ? respuesta.objeto: [];
  }

  public actualizarTabla(){


    this.dataSource = new MatTableDataSource<MateriaNobaseDocenteModel>(this.materiasNobaseDocente);

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


debugger
let materiaNobaseDocente = new RelDocenteMateriaNoBasePlantilla();

materiaNobaseDocente.relDocenteId = this.docenteModel.id;
materiaNobaseDocente.relMateriaNobaseId = this.materia.value.idMateriaNoBaseCicloEscolar;

  console.log(materiaNobaseDocente);

  const respuesta = await this.catalogosService.agregarMateriaNobaseDocente(materiaNobaseDocente);

  if(respuesta.exito){
    this.toastService.toastSuccess(respuesta.mensaje);
    this.ngOnInit();
  } else {

    this.listaMateriaDocenteExistente = respuesta.objeto ? respuesta.objeto : [];
    this.displayBasic = true;
    this.toastService.toastErr(respuesta.error);

  }

}

  public async eliminarmateriaDocente(idRelDocenteMateriaNoBasePlantilla){

debugger
    const respuesta = await this.catalogosService.eliminarMateriaNoBaseDocente(idRelDocenteMateriaNoBasePlantilla);
    if(respuesta.exito){
      this.toastService.toastSuccess('Se elimino correctamente')
      this.ngOnInit();
    } else {
      this.toastService.toastSuccess(respuesta.error);
    }


  }

  public cerrarMateriasDocenteEncontradas(){
    this.displayBasic = false;
  }


}
