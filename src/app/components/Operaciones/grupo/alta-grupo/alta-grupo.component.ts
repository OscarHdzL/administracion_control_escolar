import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatPeriodo, CicloEscolarModel, Semestre } from 'src/app/modelos/CicloEscolar.model';
import { DeporteModel } from 'src/app/modelos/Deporte.model';
import { GrupoModel, RelPlantillaModel } from 'src/app/modelos/Grupo.model';
import { PlanEstudiosModel } from 'src/app/modelos/PlanEstudios.model';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'vex-alta-grupo',
  templateUrl: './alta-grupo.component.html',
  styleUrls: ['./alta-grupo.component.scss']
})
export class AltaGrupoComponent implements OnInit {

  formGrupo: FormGroup;
  alta: boolean;
  grupoModel: GrupoModel;
  listaDeportes:  DeporteModel[] = [];
  listaPlanesEstudio: PlanEstudiosModel[] = [];
  listaCicloEscolar: CicloEscolarModel[] = [];
  listaPeriodos: CatPeriodo[] = [];
  listaSemestres: Semestre[] = [];
  ID_PLANTILLA: number = 0;


  constructor(
    private dialogRef: MatDialogRef<AltaGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService,
    private cd: ChangeDetectorRef,
  ) {
    console.log(data);
    this.alta = data.alta;
    this.grupoModel = data.grupo ? data.grupo: new GrupoModel();

    this.iniciarForm();
  }

  async ngOnInit(){

    this.listaPlanesEstudio = await this.obtenerPlanesEstudio();
    this.listaDeportes = await this.obtenerDeportes();


    this.planEstudio.valueChanges.subscribe(async (plan)=>{

      if(plan){

        //SE LIMPIAN
        this.cicloEscolar.setValue(null);
        this.periodo.setValue(null);
        this.semestre.setValue(null);


        let filtro = this.listaPlanesEstudio.find((x)=> x.id == plan);

        this.listaCicloEscolar = await this.obtenerCicloEscolarByIdPlanEstudio(filtro.inicio.substring(0,10),filtro.fin.substring(0,10));
        this.listaCicloEscolar.forEach((x) => {
          x.ciclo = x.inicio.substring(0,4) + '-' + x.fin.substring(0,4);
          //this.listaPeriodos = x.catPeriodos;
          //this.listaSemestres = x.semestre;
        });


        //PARA LLENAR CUANDO SE VA A EDITAR
        if(!this.alta){

          let cicloEscolar = this.listaCicloEscolar.find((x)=>x.id == this.grupoModel.catCicloEscolarId);
          this.cicloEscolar.setValue(cicloEscolar);
        }

      } else {

        this.listaCicloEscolar = [];
        this.ID_PLANTILLA = 0;
      }
    });


    this.cicloEscolar.valueChanges.subscribe(async (ciclo)=>{

      if(ciclo){

        //SE LIMPIAN
        this.periodo.setValue(null);
        this.semestre.setValue(null);

        this.listaPeriodos = ciclo.catPeriodos;

        if(!this.alta){
          let PERIODO = this.listaPeriodos.find((x)=>x.id == this.grupoModel.catPeriodoId);
          this.periodo.setValue(PERIODO);
        }

      }else {

        this.listaPeriodos = [];
        this.ID_PLANTILLA = 0;
      }
    });



    this.periodo.valueChanges.subscribe(async (periodo)=>{

      if(periodo){

    //SE LIMPIAN
    this.semestre.setValue(null);

        this.listaSemestres = periodo.semestre;


        if(!this.alta){
          let SEMESTRE = this.listaSemestres.find((x)=>x.id == this.grupoModel.catSemestreId);
          this.semestre.setValue(SEMESTRE);
        }

      }else {

        this.listaSemestres = [];
        this.ID_PLANTILLA = 0;
      }
    });

    this.semestre.valueChanges.subscribe(async (semestre)=>{

      if(semestre){
        this.verificarValidacion();
      }else{
        this.ID_PLANTILLA = 0;
      }
    });




    await this.inicializarForm();

  }


public verificarValidacion(){
  if(
    this.planEstudio.value &&
    this.semestre.value &&
    this.periodo.value &&
    this.cicloEscolar.value
  ){
    console.log('TODOS LLENOS');
    this.validarMateriasPlantilla();
  }
}


  public iniciarForm() {
    this.formGrupo = this.formBuilder.group({
      catDeporteId: ['', [Validators.required]],
      grupo: ['', [Validators.required]],
      aforomax: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
      planEstudio: ['', [Validators.required]],
      cicloEscolar: ['', [Validators.required]],
      semestre: ['', [Validators.required]],

    });
  }

  get catDeporteId() { return this.formGrupo.get('catDeporteId') }
  get grupo() { return this.formGrupo.get('grupo') }
  get aforomax() { return this.formGrupo.get('aforomax') }
  get planEstudio() { return this.formGrupo.get('planEstudio') }
  get cicloEscolar() { return this.formGrupo.get('cicloEscolar') }
  get periodo() { return this.formGrupo.get('periodo') }
  get semestre() { return this.formGrupo.get('semestre') }

  public inicializarForm() {
    if (this.alta) { return; }

    this.catDeporteId.setValue(this.grupoModel.catDeporteId);
    this.grupo.setValue(this.grupoModel.grupo);
    this.aforomax.setValue(this.grupoModel.aforomax);
    this.planEstudio.setValue(this.grupoModel.tblPlanestudiosId);
/*     this.cicloEscolar.setValue(this.grupoModel.catCicloEscolarId);
    this.periodo.setValue(this.grupoModel.catPeriodoId);
    this.semestre.setValue(this.grupoModel.catSemestreId);
 */
    this.cd.detectChanges();


  }


  close(result: boolean) {
    this.dialogRef.close(result);
  }

  enviar() {
    this.close(true);
  }


  public async obtenerDeportes(){
    const respuesta = await this.catalogosService.consultarDeportes();
    return respuesta.exito ? respuesta.objeto : [];
  }

  public async obtenerPlanesEstudio(){
    const respuesta = await this.catalogosService.consultarPlanesEstudio();
    return respuesta.exito ? respuesta.objeto : [];
  }

  public async obtenerCicloEscolarByIdPlanEstudio(fechaInicio, fechaFin){
    const respuesta = await this.catalogosService.consultarCicloEscolarByPlanEstudioFechas(fechaInicio, fechaFin);
    return respuesta.exito ? respuesta.objeto : [];
  }

  public async guardarGrupo(){

    this.grupoModel.aforomax = this.aforomax.value;
    this.grupoModel.grupo = this.grupo.value;
    this.grupoModel.catDeporteId = this.catDeporteId.value;
    this.grupoModel.relPlantillaId = this.ID_PLANTILLA; //PRUEBA
    this.grupoModel.catPeriodoId = this.periodo.value.id;
    this.grupoModel.inclusion = new Date();
    this.grupoModel.activo = true;


    const respuesta =  await this.catalogosService.insertarGrupo(this.grupoModel);

    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);
      this.close(true);
    } else {
      this.toastService.toastErr(respuesta.mensaje);
    }

  }


  public async validarMateriasPlantilla(){

    let plantilla = new RelPlantillaModel();
    plantilla.catOfertaEducativaId = 1; //vendria de sesion
    plantilla.tblPlanestudiosId = this.planEstudio.value;
    plantilla.catSemestreId = this.semestre.value.id;
    plantilla.catPeriodoId = this.periodo.value.id;
    plantilla.inclusion = new Date()



    const respuesta = await this.catalogosService.validarMateriasPlantilla(plantilla);
    if(respuesta.exito){

      if(respuesta.objeto){
        console.log(respuesta.objeto);
        this.ID_PLANTILLA = respuesta.objeto[0].id; //
        this.toastService.toastSuccess("Se encontrarón materias base disponibles.")
      }
      }else{
        this.toastService.toastErr(respuesta.error)
        this.ID_PLANTILLA = 0;
      }

  }


}
