import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AperturaInscripcion } from 'src/app/modelos/Catalogos';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { MatTable } from '@angular/material/table';
import { AlumnoCalificacionModel, CalificacionAlumno, CalificacionesAlumnosDocente } from 'src/app/modelos/GruposDocente.model';

@Component({
  selector: 'vex-calificaciones-alumnos',
  templateUrl: './calificaciones-alumnos.component.html',
  styleUrls: ['./calificaciones-alumnos.component.scss']
})
export class CalificacionesAlumnosComponent implements OnInit {
  @ViewChild("tablaCalificacionesDos") tablaDocs2: MatTable<any>;
  //listaCalificaciones = [ {id: 1, nombre: 'OSCAR', primer_parcial: 9.7, segundo_parcial: 8.4, tercer_parcial: 7.5}, {id: 1, nombre: 'OSCAR', primer_parcial: null, segundo_parcial: null, tercer_parcial: null}]


  idParcialhabilitado = 1;

  FormularioCalificaciones2: FormGroup;
  displayedColumnsDocs: string[] = ["Calificacione", "obligatorio",/*  "correcto", */ "visualizar", "estatus", "seleccionar"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, //: CalificacionesAlumnosDocente,
              private dialogRef: MatDialogRef<CalificacionesAlumnosComponent>,
              private fb: UntypedFormBuilder,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private catalogosService: CatalogosServices) {

    this.FormularioCalificaciones2 = this.fb.group({
      Calificaciones: this.fb.array([]),
    });
  }

  async ngOnInit() {

    const arrayFormGroup = [];
    this.data.calificaciones.alumnos.forEach((Calificacione) => {
      const formGroup: FormGroup = new FormGroup({});

      formGroup.addControl("id", new FormControl(Calificacione.idAlumnoCalificacion));
      formGroup.addControl("relAlumnoId", new FormControl(Calificacione.idRelAlumno));
      formGroup.addControl("relGrupoMateriaPlantillaDocenteId", new FormControl(Calificacione.idGrupoDocente));
      formGroup.addControl("relAlumnoId", new FormControl(Calificacione.idRelAlumno));
      formGroup.addControl("alumno", new FormControl({ value: Calificacione.nombreAlumno, disabled: false},[]));
      formGroup.addControl("materia", new FormControl({ value: Calificacione.materia, disabled: false},[]));
      formGroup.addControl("primer_parcial", new FormControl({ value: Calificacione.primerParcial, disabled: this.data.calificaciones.idParcialHabilitado == 1 ? false: true},[Validators.required]));
      formGroup.addControl("segundo_parcial", new FormControl({ value: Calificacione.segundoParcial, disabled: this.data.calificaciones.idParcialHabilitado == 2 ? false: true},[Validators.required]));
      formGroup.addControl("tercer_parcial", new FormControl({ value: Calificacione.tercerParcial, disabled: this.data.calificaciones.idParcialHabilitado == 3 ? false: true},[Validators.required]));
      arrayFormGroup.push(formGroup);
    });

    this.FormularioCalificaciones2 = new FormGroup({
      Calificaciones: this.fb.array(arrayFormGroup),
    });

  }

  get Calificaciones_(): FormArray {
    return this.FormularioCalificaciones2.get("Calificaciones") as FormArray;
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

  public async guardarCalificacion(alumno){

    let calificacion = new CalificacionAlumno();

    calificacion.id = alumno.id,
    calificacion.relAlumnoId = alumno.relAlumnoId,
    calificacion.relGrupoMateriaPlantillaDocenteId = alumno.relGrupoMateriaPlantillaDocenteId,
    calificacion.primerParcial = alumno.primer_parcial,
    calificacion.segundoParcial = alumno.segundo_parcial,
    calificacion.tercerParcial = alumno.tercer_parcial,
    calificacion.promedioFinal = 0;
    calificacion.inclusion = new Date()


    const respuesta = await this.catalogosService.actualizarCalificacionAlumno(calificacion)
    if(respuesta.exito){
      this.toastService.toastSuccess('Se actualizo correctamente');
      await this.actualizarTabla();
    } else {
      this.toastService.toastErr(respuesta.error);
    }

    console.log(calificacion);
  }


  public async actualizarTabla(){
    let datos =
    {
      idGrupoDocente: this.data.idGrupoDocente,
      calificaciones: await this.consultarCalificacionesAlumnosParcial(this.data.idGrupoDocente)
    }
    this.data = datos

    const arrayFormGroup = [];
    this.data.calificaciones.alumnos.forEach((Calificacione) => {
      const formGroup: FormGroup = new FormGroup({});

      formGroup.addControl("id", new FormControl(Calificacione.idAlumnoCalificacion));
      formGroup.addControl("relAlumnoId", new FormControl(Calificacione.idRelAlumno));
      formGroup.addControl("relGrupoMateriaPlantillaDocenteId", new FormControl(Calificacione.idGrupoDocente));
      formGroup.addControl("relAlumnoId", new FormControl(Calificacione.idRelAlumno));
      formGroup.addControl("alumno", new FormControl({ value: Calificacione.nombreAlumno, disabled: false},[]));
      formGroup.addControl("materia", new FormControl({ value: Calificacione.materia, disabled: false},[]));
      formGroup.addControl("primer_parcial", new FormControl({ value: Calificacione.primerParcial, disabled: this.data.calificaciones.idParcialHabilitado == 1 ? false: true},[Validators.required]));
      formGroup.addControl("segundo_parcial", new FormControl({ value: Calificacione.segundoParcial, disabled: this.data.calificaciones.idParcialHabilitado == 2 ? false: true},[Validators.required]));
      formGroup.addControl("tercer_parcial", new FormControl({ value: Calificacione.tercerParcial, disabled: this.data.calificaciones.idParcialHabilitado == 3 ? false: true},[Validators.required]));
      arrayFormGroup.push(formGroup);
    });

    this.FormularioCalificaciones2 = new FormGroup({
      Calificaciones: this.fb.array(arrayFormGroup),
    });

  }

  public async consultarCalificacionesAlumnosParcial(idGrupoDocente){
    const respuesta = await this.catalogosService.consultarCalificacionesAlumnosParcial(idGrupoDocente);
    return respuesta.objeto ? respuesta.objeto : new CalificacionesAlumnosDocente();
  }

}
