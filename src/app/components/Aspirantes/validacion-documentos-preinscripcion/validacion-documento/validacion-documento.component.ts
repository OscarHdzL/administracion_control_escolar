
import { PreregistroAspiranteService } from './../../../../servicios/preregistro-aspirante.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GrupoModel } from 'src/app/modelos/Grupo.model';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { CatalogoEstatusDocumentoAspiranteModel, DocumentoAspiranteModel, DocumentoAspiranteObservacionModel } from 'src/app/modelos/PreregistroModel';

@Component({
  selector: 'vex-validacion-documento',
  templateUrl: './validacion-documento.component.html',
  styleUrls: ['./validacion-documento.component.scss']
})
export class ValidacionDocumentoComponent implements OnInit {

  listaEstatusDocumento: Array<CatalogoEstatusDocumentoAspiranteModel> = [];
  formValidacion: FormGroup;
  alta: boolean;
  grupoModel: GrupoModel;


  constructor(
    private preregistroService: PreregistroAspiranteService,
    private dialogRef: MatDialogRef<ValidacionDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentoAspiranteModel,
    private formBuilder: FormBuilder,
    private VariablesService: VariablesService
  ) {

    console.log(data);
/*     this.alta = data.alta;
    this.grupoModel = data.grupo; */

  }

  async ngOnInit(){
    this.iniciarForm();
    this.inicializarForm();
    this.listaEstatusDocumento = await this.obtenerCatalogoEstatusDocumento();
  }

  public iniciarForm() {
    this.formValidacion = this.formBuilder.group({
      estatus: ['', [Validators.required]],
      observaciones: ['', [Validators.maxLength(500)]]
    });
  }

/*   get periodo() { return this.formGrupo.get('periodo') }
  get grupo() { return this.formGrupo.get('grupo') }
  get aforo() { return this.formGrupo.get('aforo') } */

  public inicializarForm() {
/*     if (this.alta) { return; }
    this.periodo.setValue(this.grupoModel.idPeriodo);
    this.grupo.setValue(this.grupoModel.grupo);
    this.aforo.setValue(this.grupoModel.aforoMaximo); */
    this.formValidacion.patchValue({
      estatus: this.data.catEstatusDocApiranteId
      //,observaciones: this.data.observacion
    });
  }


  close(result: boolean) {
    this.dialogRef.close(result);
  }

  async enviar() {


    let observacion = new DocumentoAspiranteObservacionModel();

    observacion.id  = 0;
    observacion.tblDocumentosAspiranteId = this.data.id;
    observacion.catestatusdocapirante = this.formValidacion.get('estatus').value;
    observacion.observacion = this.formValidacion.get('observaciones').value;
    observacion.archivoHistorico = this.data.archivo;
    observacion.inclusion = new Date().toString();

/*
    this.data.catEstatusDocApiranteId = this.formValidacion.get('estatus').value;
    this.data.observacion = this.formValidacion.get('observaciones').value; */

    const respuesta = await this.preregistroService.agregarValidacionDocumento(observacion);

    if(respuesta.exito){
      this.VariablesService.toastSuccess(respuesta.mensaje);
      this.close(true);
    }
    else {
      this.VariablesService.toastErr(respuesta.mensaje);
    }
  }

  public async obtenerCatalogoEstatusDocumento(){
    const respuesta = await this.preregistroService.obtenerCatalogoEstatusDocumentoAspirante();
    console.log(respuesta.objeto);
    return respuesta.objeto;
  }


  public async agregarValidacionDocumento(obj){

    const respuesta = await this.preregistroService.agregarValidacionDocumento(obj);
    console.log(respuesta);
    return respuesta;
  }


}
