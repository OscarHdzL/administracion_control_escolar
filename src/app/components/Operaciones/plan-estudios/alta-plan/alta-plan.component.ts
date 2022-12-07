import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { PlanEstudiosModel } from './../../../../modelos/PlanEstudios.model';

@Component({
  selector: 'vex-alta-plan',
  templateUrl: './alta-plan.component.html',
  styleUrls: ['./alta-plan.component.scss']
})
export class AltaPlanComponent implements OnInit {

  formPlan: FormGroup;
  alta: boolean;
  planEstudios: PlanEstudiosModel;

  planEstudiosModel: PlanEstudiosModel;
  constructor(
    private dialogRef: MatDialogRef<AltaPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private swalService: SwalServices,
    private toastService:VariablesService,
    private catalogosServices: CatalogosServices,) {
      console.log(data);
      this.alta = data.alta;
      this.planEstudios = data.plan;
      this.planEstudiosModel = new PlanEstudiosModel();

      console.log(this.planEstudios);
  }

  async ngOnInit() {
    await this.iniciarForm();
    await this.inicializarForm();
  }

  public iniciarForm() {
    this.formPlan = this.formBuilder.group({
      inicio: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      creditos: ['', [Validators.required]],
      semestres: ['', [Validators.required]],
      //ofertaEducativa: ['', [Validators.required]]
    });
  }

  public inicializarForm() {
    if (this.alta) { return; }
    this.inicio.setValue(new Date(this.planEstudios.inicio));
    this.fin.setValue(new Date(this.planEstudios.fin));
    this.creditos.setValue(this.planEstudios.creditos);
    this.semestres.setValue(this.planEstudios.semestres);
    //this.ofertaEducativa.setValue(this.planEstudios.oferta);
  }

  get inicio()          { return this.formPlan.get('inicio') }
  get fin()             { return this.formPlan.get('fin') }
  get creditos()        { return this.formPlan.get('creditos') }
  get semestres()       { return this.formPlan.get('semestres') }
  //get ofertaEducativa() { return this.formPlan.get('ofertaEducativa') }

  async enviar() {

    const fI: Date = this.formPlan.value.inicio;
    const fF: Date = this.formPlan.value.fin;
    if (!this.data.alta) {
      this.planEstudiosModel.id = this.data.plan.id;
    }
    this.planEstudiosModel.inicio = `${fI.getFullYear()}-${this.toastService.fn(fI.getMonth()+1)}-${this.toastService.fn(fI.getDate())}T00:00:00`;
    this.planEstudiosModel.fin = `${fF.getFullYear()}-${this.toastService.fn(fF.getMonth()+1)}-${this.toastService.fn(fF.getDate())}T00:00:00`;
    this.planEstudiosModel.creditos = this.formPlan.value.creditos;
    this.planEstudiosModel.semestres = this.formPlan.value.semestres;
    this.planEstudiosModel.carrera = "test";
    console.log("enviar",this.planEstudiosModel);
    if(this.alta){
      console.log('Agregar', this.planEstudiosModel);
      let res = await this.catalogosServices.agregarPlanEstudio(this.planEstudiosModel);
      console.log(res);
      if(res.exito==true){
        this.swalService.alertaPersonalizado(res.exito,res.mensaje);
        this.dialogRef.close();
      }else{
        this.toastService.toastErr(res.mensaje);
      }
    }
    else{
      console.log('Editar', this.planEstudiosModel);
      let res = await this.catalogosServices.actualizarPlanEstudio(this.planEstudiosModel);
      console.log(res);
      if(res.exito==true){
        this.swalService.alertaPersonalizado(res.exito,res.mensaje);
        this.dialogRef.close();
      }else{
        this.toastService.toastErr(res.mensaje);
      }
    }
  }
}
