import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreregistroAspiranteService } from 'src/app/servicios/preregistro-aspirante.service';
import { Component, Inject, OnInit } from '@angular/core';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { Router } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Escalafon, PreRegistroSelect, tblEscalafonAspirantes } from 'src/app/modelos/PreregistroModel';
//import { AspiranteSesionModel } from 'src/app/modelos/aspirante-sesion.model';

@Component({
  selector: 'vex-proceso-admision',
  templateUrl: './proceso-admision.component.html',
  styleUrls: ['./proceso-admision.component.scss']
})
export class ProcesoAdmisionComponent implements OnInit {

  //datosAspirante: AspiranteSesionModel;

  ID_ASPIRANTE: number;
  escalafon: Escalafon;
  formularioEscalafon: FormGroup;
  //accion = 'Visualizacion'
  accion = 'Registro'

  constructor(
    private preregistroAspiranteService: PreregistroAspiranteService,
    private swalService: SwalServices,
    private toastService: VariablesService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataInput: PreRegistroSelect,
    private dialog: MatDialog,
    public matPaginatorIntl: MatPaginatorIntl,

  ) {

    this.escalafon = new Escalafon();
    //this.datosAspirante = JSON.parse(localStorage.getItem("aspirante"))[0];

    //DESCOMENTAR

    this.ID_ASPIRANTE = this.dataInput.id;

    //this.ID_ASPIRANTE = 1124;
    this.formularioEscalafon = this.fb.group({
      tecnicoMet: null,
      conocimientosBd: null,
      ceneval: null,
      examenMedico:  [null,[Validators.requiredTrue]],
      examenMedicoDescripcion: null,
      cursoInduccion: [null,[Validators.requiredTrue]]
      //clave:  null,
      //curp:  null,
      //rfc:  null,
      //nombre:  null,
      //paterno: null,
      //materno:  null,
      //fechaNacimiento:  null,
    });

  }

  async ngOnInit() {
    this.escalafon = await this.obtenerEscalafon();
    //SE DEFINE ID 0 SI NO EXISTE
    if(!this.escalafon.idEscalafon) {
      this.escalafon.idEscalafon = 0;
      this.escalafon.nombre  = this.dataInput.nombre  ;
      this.escalafon.paterno = this.dataInput.paterno ;
      this.escalafon.materno = this.dataInput.materno ;
      this.toastService.toastInfo("No se ha cargado información");
    }

    await this.llenarFormulario();
  }

  public llenarFormulario(){
    if(this.escalafon){
        this.formularioEscalafon = this.fb.group({
        tecnicoMet: [(this.escalafon.tecnicoMet) ? ((this.escalafon.tecnicoMet > 0) ? this.escalafon.tecnicoMet: null): null, [Validators.required]],
        conocimientosBd: [(this.escalafon.conocimientosBd) ? ((this.escalafon.conocimientosBd > 0) ? this.escalafon.conocimientosBd: null): null, [Validators.required]],
        ceneval: [(this.escalafon.ceneval) ? ((this.escalafon.ceneval > 0) ? this.escalafon.ceneval: null): null, [Validators.required]],
        examenMedico:  [this.escalafon.examenMedico,[Validators.requiredTrue]],
        examenMedicoDescripcion: this.escalafon.examenMedicoDescripcion,
        cursoInduccion:  [this.escalafon.cursoInduccion,[Validators.requiredTrue]],
        clave:  this.escalafon.clave,
        //curp:  this.escalafon.curp,
        //rfc:  this.escalafon.rfc,
        //nombre:  this.escalafon.nombre,
        //paterno: this.escalafon.paterno,
        //materno:  this.escalafon.materno,
        //fechaNacimiento:  this.escalafon.fechaNacimiento,
      });
    } else {
      this.formularioEscalafon = this.fb.group({
        tecnicoMet: null,
        conocimientosBd: null,
        ceneval: null,
        examenMedico:  null,
        examenMedicoDescripcion: null,
        cursoInduccion: null,
        clave:  null,
        //curp:  null,
        //rfc:  null,
        //nombre:  null,
        //paterno: null,
        //materno:  null,
        //fechaNacimiento:  null,
      });



      //alert("No se encontro informacion")

      this.toastService.toastErr("No se encontro información sobre el proceso de admisión. ")
    }


    if(this.accion == 'Visualizacion'){

/*       this.formularioEscalafon.get('tecnicoMet').disable();
      this.formularioEscalafon.get('conocimientosBd').disable();
      this.formularioEscalafon.get('ceneval').disable();
      this.formularioEscalafon.get('examenMedico').disable();
      this.formularioEscalafon.get('examenMedicoDescripcion').disable();
      this.formularioEscalafon.get('cursoInduccion').disable(); */

    }

  console.log(this.formularioEscalafon);
  }

  public async obtenerEscalafon(){

    const respuesta = await this.preregistroAspiranteService.obtenerEscalafonByIdaspirante(this.ID_ASPIRANTE);
    console.log(respuesta.objeto);

    return (respuesta.objeto)? respuesta.objeto[0] : new Escalafon();
  }


  public mostrarAprobacion(){
    if(this.escalafon){
      if(
          (this.escalafon.idEscalafon > 0) &&
          (this.tecnicoMet.value > 0 ) &&
          (this.conocimientosBd.value > 0) &&
          (this.ceneval.value > 0) &&
          (this.examenMedico.value == true) &&
          (this.cursoInduccion.value == true)
      ){
        return true;
      } else {
        return false;
      }
    }
    else {
      return false;
    }
  }


  public async guardarEscalafon(){

    let escalafon_aspirante = new tblEscalafonAspirantes();

    escalafon_aspirante.id = this.escalafon.idEscalafon;
    escalafon_aspirante.tblDatosGeneralesAspiranteId = this.ID_ASPIRANTE;
    /* escalafon_aspirante.tecnicoMet = this.formularioEscalafon.get('tecnicoMet').value
    escalafon_aspirante.conocimientosBd = this.formularioEscalafon.get('conocimientosBd').value
    escalafon_aspirante.ceneval = this.formularioEscalafon.get('ceneval').value */
    escalafon_aspirante.examenMedico = this.formularioEscalafon.get('examenMedico').value
    escalafon_aspirante.examenMedicoDescripcion = this.formularioEscalafon.get('examenMedicoDescripcion').value
    escalafon_aspirante.cursoInduccion = this.formularioEscalafon.get('cursoInduccion').value

    escalafon_aspirante.tecnicoMet = (this.tecnicoMet.value) ? this.tecnicoMet.value : 0;
    escalafon_aspirante.conocimientosBd = (this.conocimientosBd.value) ? this.conocimientosBd.value : 0;
    escalafon_aspirante.ceneval = (this.ceneval.value) ? this.ceneval.value : 0;



    console.log(escalafon_aspirante);
    console.log(JSON.stringify(escalafon_aspirante));


    const respuesta = await this.preregistroAspiranteService.cargaIndividualEscalafon(escalafon_aspirante);
    if(respuesta.exito) {
      this.toastService.toastSuccess('Se guardo la información');
      this.ngOnInit()
    } else {
      this.toastService.toastErr('ocurrio un error');
      console.log(respuesta);
    }

  }


  get tecnicoMet()              { return this.formularioEscalafon.get('tecnicoMet'); }
  get conocimientosBd()              { return this.formularioEscalafon.get('conocimientosBd'); }
  get ceneval()              { return this.formularioEscalafon.get('ceneval'); }
  get examenMedico()              { return this.formularioEscalafon.get('examenMedico'); }
  get examenMedicoDescripcion()              { return this.formularioEscalafon.get('examenMedicoDescripcion'); }
  get cursoInduccion()              { return this.formularioEscalafon.get('cursoInduccion'); }

}


