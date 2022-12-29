import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodoReinscripcionModel } from 'src/app/modelos/Catalogos';
import { CatPeriodo, CicloEscolarModel, Semestre } from 'src/app/modelos/CicloEscolar.model';
import { DeporteModel } from 'src/app/modelos/Deporte.model';

import { PlanEstudiosModel } from 'src/app/modelos/PlanEstudios.model';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'app-modal-periodo-reinscripcion',
  templateUrl: './modal-periodo-reinscripcion.component.html',
  styleUrls: ['./modal-periodo-reinscripcion.component.scss']
})
export class ModalPeriodoReinscripcionComponent implements OnInit {
  formPeriodoReinscripcion: FormGroup;
  alta: boolean;
  PeriodoReinscripcionModel: PeriodoReinscripcionModel;
  listaDeportes:  DeporteModel[] = [];
  listaPlanesEstudio: PlanEstudiosModel[] = [];
  listaCicloEscolar: CicloEscolarModel[] = [];
  listaPeriodos: CatPeriodo[] = [];
  listaSemestres: Semestre[] = [];
  ID_PLANTILLA: number = 0;


  constructor(
    private dialogRef: MatDialogRef<ModalPeriodoReinscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService,
    private cd: ChangeDetectorRef,
  ) {
    console.log(data);
    this.PeriodoReinscripcionModel = data ? data: new PeriodoReinscripcionModel();

    this.iniciarForm();
  }

  async ngOnInit(){


    await this.inicializarForm();

  }



  public iniciarForm() {
    this.formPeriodoReinscripcion = this.formBuilder.group({
      // catPeriodoId: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      //procesado: ['', [Validators.required]],
    });
  }

  //get catPeriodoId() { return this.formPeriodoReinscripcion.get('catPeriodoId') }
  get descripcion() { return this.formPeriodoReinscripcion.get('descripcion') }
  get fechaInicio() { return this.formPeriodoReinscripcion.get('fechaInicio') }
  get fechaFin() { return this.formPeriodoReinscripcion.get('fechaFin') }
  get horaInicio() { return this.formPeriodoReinscripcion.get('horaInicio') }
  get horaFin() { return this.formPeriodoReinscripcion.get('horaFin') }
  //get procesado() { return this.formPeriodoReinscripcion.get('procesado') }

  public inicializarForm() {
    if (this.PeriodoReinscripcionModel.id == 0) { return; }

    this.descripcion.setValue(this.PeriodoReinscripcionModel.descripcion);
    this.fechaInicio.setValue((this.PeriodoReinscripcionModel.fechaInicio.split('T'))[0]);
    this.fechaFin.setValue((this.PeriodoReinscripcionModel.fechaFin.split('T'))[0]);
    this.horaInicio.setValue(this.PeriodoReinscripcionModel.horaInicio);
    this.horaFin.setValue(this.PeriodoReinscripcionModel.horaFin);
    //this.procesado.setValue(this.PeriodoReinscripcionModel.procesado);

    this.cd.detectChanges();
  }

  public async guardarPeriodoReinscripcion(){

    this.PeriodoReinscripcionModel.descripcion = this.descripcion.value;
    this.PeriodoReinscripcionModel.fechaInicio = this.fechaInicio.value+"T00:00:00";
    this.PeriodoReinscripcionModel.fechaFin = this.fechaFin.value +"T00:00:00";
    this.PeriodoReinscripcionModel.horaInicio = this.horaInicio.value; //PRUEBA
    this.PeriodoReinscripcionModel.horaFin = this.horaFin.value;
    this.PeriodoReinscripcionModel.inclusion = new Date();
    this.PeriodoReinscripcionModel.procesado = false;


    const respuesta =  this.PeriodoReinscripcionModel.id == 0 ? await this.catalogosService.agregarPeriodoReinscripcion(this.PeriodoReinscripcionModel) :
                                                                await this.catalogosService.actualizarPeriodoReinscripcion(this.PeriodoReinscripcionModel);


    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);
      this.close(true);
    } else {
      this.toastService.toastErr(respuesta.mensaje);
    }

  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
