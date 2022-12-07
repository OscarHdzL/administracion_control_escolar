import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { MatFormFieldAppearance } from "@angular/material/form-field";

import { RespuestasFormularioAspirante, TblOpcionesPregunta, TblPregunta, TblRespuesta } from "src/app/modelos/ModelosPreguntasFormulario";
import { FormularioConvocatoriaService } from "src/app/servicios/formulario-convocatoria.service";
import { SwalServices } from "src/app/servicios/sweetalert2.services";

@Component({
  selector: "vex-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.scss"],
})
export class FormularioComponent implements OnInit {
  layoutCtrl = new UntypedFormControl("boxed");
  public RADIOSelected;
  public pregunta_;
  public accion = 'Consulta';
  public idFormulario: number = 36;
  public tblDatosGeneralesAspiranteId: number = 2;

  apariencia: MatFormFieldAppearance = 'outline'


  public objeto: Array<TblPregunta> = [];

  preguntas: Array<TblPregunta> = []
  respuestasFormularioAspirante: RespuestasFormularioAspirante;



  constructor(
    private formularioConvocatoriaService: FormularioConvocatoriaService,
    private swalService: SwalServices,
  ) { }

 async ngOnInit() {

    await this.obtenerPreguntasFormulario();

/*     const resp = await this.swalService.confirmacion('','','','') as boolean;

    if(resp){
alert("aceptado");
    } else {
      alert("cancelado");

    } */



    /* let resps = new Array<TblRespuesta>();

    this.objeto.forEach((x)=>{
      x.respuestas.forEach((y)=> {
        resps.push(y);
      })
    });

    console.log(JSON.stringify(resps));

    this.preguntas.forEach((x)=>{
      x.respuesta = new RespuestaModel();
      x.respuestas = [];

      if(x.tipoRespuesta == 'checkbox' && x.respuestaObligatoria && x.opciones){
        x.opciones.forEach((y)=>{
          y.respuestaObligatoria = true;
        })
      }
    })
    console.log(this.preguntas); */

    switch(this.accion){
      case 'Consulta':
        await this.obtenerRespuestasFormularioAspirante();
        break;

      case 'Agregar':
        break;

    }



  }


  public async obtenerPreguntasFormulario(){

    const respuesta = await this.formularioConvocatoriaService.obtenerPreguntasXIdFormulario(this.idFormulario);
    this.preguntas = respuesta;


    if(this.preguntas){
      this.preguntas.forEach((x)=>{
        x.respuestasAuxiliar = new TblRespuesta();
        x.tblRespuesta = [];

        if(x.tblTipoRespuesta.tipoRespuesta == 'checkbox' && x.respuestaObligatoria && x.tblGrupoOpciones){
          if(x.tblGrupoOpciones.tblOpcionesPregunta){
            x.tblGrupoOpciones.tblOpcionesPregunta.forEach((y)=>{
              y.respuestaObligatoria = true;
            })
          }
        }
      })
    }

  }



  public async obtenerRespuestasFormularioAspirante(){

    const respuesta = await this.formularioConvocatoriaService.obtenerRespuestasFormularioAspirante(this.idFormulario, this.tblDatosGeneralesAspiranteId);
    this.respuestasFormularioAspirante = respuesta as RespuestasFormularioAspirante;

    await this.llenarFormulario();

    /* if(this.preguntas && this.respuestasFormularioAspirante){
      this.preguntas.forEach((x)=>{
        x.respuestasAuxiliar = new TblRespuesta();
        x.tblRespuesta = [];

        let respuestasPregunta =  this.respuestasFormularioAspirante.respuestas.filter((respuesta) => respuesta.tblPreguntaId == x.id);

        if(x.tblTipoRespuesta.tipoRespuesta == 'checkbox' && x.respuestaObligatoria && x.tblGrupoOpciones){
          if(x.tblGrupoOpciones.tblOpcionesPregunta){
            x.tblGrupoOpciones.tblOpcionesPregunta.forEach((y)=>{
              y.respuestaObligatoria = true;
            })
          }
        } else {

          respuestasPregunta.forEach((resp) => {
            x.respuestasAuxiliar = resp;
            x.tblRespuesta.push(resp);
          });
        }








      })
    } */

  }



  public async EnviarRespuetasFormulario(){
    let respuestas = new Array<TblRespuesta>();

    this.preguntas.forEach((preg)=> {
      preg.tblRespuesta.forEach((resp)=>{
        respuestas.push(resp);
      })
    });

    const respuesta = await this.formularioConvocatoriaService.agregarVariasRespuestasFormulario(respuestas);

    console.log(respuesta);
  }


  public llenarFormulario(){
    this.preguntas.forEach((pregunta) => {
      switch(pregunta.tblTipoRespuesta.tipoRespuesta){
        case 'text':
          let respuestasTexto = this.respuestasFormularioAspirante.respuestas.filter((resp=> resp.tblPreguntaId == pregunta.id));
            this.llenarTexto(pregunta, respuestasTexto);
          break;

        case 'checkbox':
          let respuestasCheckBox = this.respuestasFormularioAspirante.respuestas.filter((resp=> resp.tblPreguntaId == pregunta.id));
          this.llenarCheckbox(pregunta, respuestasCheckBox);
          break;

        case 'select':

          let respuestasSelect = this.respuestasFormularioAspirante.respuestas.filter((resp=> resp.tblPreguntaId == pregunta.id));
          this.llenarSelect(pregunta, respuestasSelect);
          break;

        case 'textarea':
          let respuestasTextarea = this.respuestasFormularioAspirante.respuestas.filter((resp=> resp.tblPreguntaId == pregunta.id));
          this.llenarTexto(pregunta, respuestasTextarea);
          break;


        case 'radio':
          let respuestasRadio = this.respuestasFormularioAspirante.respuestas.filter((resp=> resp.tblPreguntaId == pregunta.id));
          this.llenarRadio(pregunta, respuestasRadio);
        break;

      }
    })
  }


  public async  llenarTexto(pregunta: TblPregunta, respuestas: Array<TblRespuesta>){

    pregunta.tblRespuesta = respuestas;
    pregunta.respuestasAuxiliar = (respuestas.length > 0) ? respuestas[0] : new TblRespuesta;
    return pregunta;
  }



  public async llenarCheckbox(pregunta: TblPregunta, respuestas: Array<TblRespuesta>){

   await pregunta.tblGrupoOpciones.tblOpcionesPregunta.forEach((opcion) =>{

    let result = respuestas.find((respuesta)=> respuesta.tblOpcionesPreguntaId == opcion.id );

      if(respuestas.find((respuesta)=> respuesta.tblOpcionesPreguntaId == opcion.id )){

        opcion.checked = true;
      }else{
        opcion.checked = false;
      }
    });

    pregunta.tblRespuesta = respuestas;
    return pregunta;
  }

  public async  llenarRadio(pregunta: TblPregunta, respuestas: Array<TblRespuesta>){

    pregunta.respuestasAuxiliar = (respuestas.length > 0) ? respuestas[0] : new TblRespuesta;
    pregunta.tblRespuesta = (respuestas.length > 0) ? respuestas : [];
    return pregunta;
  }

  public async  llenarSelect(pregunta: TblPregunta, respuestas: Array<TblRespuesta>){

    let resp = new TblRespuesta();

    pregunta.respuestasAuxiliar = (respuestas.length > 0) ? respuestas[0] :  new TblRespuesta;
    pregunta.tblRespuesta = (respuestas.length > 0) ? respuestas : [];
    return pregunta;
  }

  /* public llenarRadio(){

  } */

  public  formularioValido(){

    this.preguntas.forEach((pregunta)=>{

    })

     return (this.preguntas.filter((pregunta) => pregunta.respuestaObligatoria && pregunta.respuestaComplementoObligatoria && pregunta.tblRespuesta.length === 0).length > 0) ? false : true;
  }

  onChangeTexto(pregunta,evento){


    let respuestas: Array<TblRespuesta> = [];
    let respuesta = new TblRespuesta();

    if(evento){
      respuesta.id = 0;
    respuesta.tblPreguntaId = pregunta.id;
    respuesta.tblOpcionesPreguntaId = null;
    respuesta.respuestaTexto = evento;
    respuesta.respuestaComplemento = pregunta.tblRespuesta.length > 0 ? pregunta.tblRespuesta[0].respuestaComplemento : null;
    respuesta.respuestaNumero = null;
    respuesta.respuestaSiNo = null;
    respuesta.inclusion = this.obtenerFechaActual();
    respuesta.activo = true;
    respuesta.tblDatosGeneralesAspiranteId = this.tblDatosGeneralesAspiranteId;

    respuestas.push(respuesta);
    pregunta.tblRespuesta = respuestas;
    }
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }

  onChangeTextoComplemento(pregunta,evento){

    let respuestas: Array<TblRespuesta> = [];
    let respuesta = new TblRespuesta();

    respuesta.id = 0;
    respuesta.tblPreguntaId = pregunta.id;
    respuesta.tblOpcionesPreguntaId= null;
    respuesta.respuestaTexto = pregunta.tblRespuesta.length > 0  ? pregunta.tblRespuesta[0].respuestaTexto : null;
    respuesta.respuestaComplemento = evento != "" ? evento : null;
    respuesta.respuestaNumero = null;
    respuesta.respuestaSiNo = null;
    respuesta.inclusion = this.obtenerFechaActual();
    respuesta.activo = true;
    respuesta.tblDatosGeneralesAspiranteId = this.tblDatosGeneralesAspiranteId;
    respuestas.push(respuesta);
    pregunta.tblRespuesta = respuestas;
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }

  onChangeDropDown(pregunta,evento){

    let respuestas: Array<TblRespuesta> = [];
    let respuesta = new TblRespuesta();
    respuesta.respuestaTexto = null;
    respuesta.id = 0;
    respuesta.tblPreguntaId= pregunta.id;
    respuesta.tblOpcionesPreguntaId = evento;
    respuesta.respuestaTexto = null;
    respuesta.respuestaComplemento = pregunta.tblRespuesta.length > 0 ? pregunta.tblRespuesta[0].respuestaComplemento : null;
    respuesta.respuestaNumero = null;
    respuesta.respuestaSiNo = null;
    respuesta.inclusion = this.obtenerFechaActual();
    respuesta.activo = true;
    respuesta.tblDatosGeneralesAspiranteId = this.tblDatosGeneralesAspiranteId;
    respuestas.push(respuesta);
    pregunta.tblRespuesta = respuestas;
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }


  onChangeTextoComplementoDropDown_Radio(pregunta,evento){

    let respuestas: Array<TblRespuesta> = [];
    let respuesta = new TblRespuesta();

    respuesta.id = 0;
    respuesta.tblPreguntaId = pregunta.id;
    respuesta.tblOpcionesPreguntaId= pregunta.tblRespuesta.length > 0  ? pregunta.tblRespuesta[0].tblOpcionesPreguntaId : null;;
    respuesta.respuestaTexto = null;
    respuesta.respuestaComplemento = evento != "" ? evento : null;
    respuesta.respuestaNumero = null;
    respuesta.respuestaSiNo = null;
    respuesta.inclusion = this.obtenerFechaActual();
    respuesta.activo = true;
    respuesta.tblDatosGeneralesAspiranteId = this.tblDatosGeneralesAspiranteId;
    respuestas.push(respuesta);
    pregunta.tblRespuesta = respuestas;
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }

 async onCheckCheckbox(pregunta: TblPregunta, opcion: TblOpcionesPregunta,  evento){

    //alert(evento.target.value + ' ' + evento.target.checked);

    // SE RESETEA EL VALOR  respuestaObligatoria
    /* pregunta.tblGrupoOpciones.tblOpcionesPreguntaforEach((x)=>{
      x.respuestaObligatoria = false;
    }) */

    opcion.respuestaObligatoria = evento.checked?true:false;
    opcion.checked = evento.checked;

     //SI HAY AL MENOS UNO CHECKEADO, SE DESACTIVA EL REQUIRED
   /*  if(pregunta.tblGrupoOpciones.tblOpcionesPregunta.filter((y)=>y.checked).length > 0){
      pregunta.tblGrupoOpciones.tblOpcionesPreguntaforEach((x)=>{
        x.respuestaObligatoria = false;
      })
    }else{
      pregunta.tblGrupoOpciones.tblOpcionesPreguntaforEach((x)=>{
        x.respuestaObligatoria = true;
      })
    }
 */


    /* if(!evento.target.checked){

      //HAY AL MENOS UNO CHECKEADO
      if(pregunta.tblGrupoOpciones.tblOpcionesPregunta.filter((y)=>y.checked).length > 0){
        pregunta.tblGrupoOpciones.tblOpcionesPreguntaforEach((x)=>{
          x.respuestaObligatoria = false;
        })
      }else{
        pregunta.tblGrupoOpciones.tblOpcionesPreguntaforEach((x)=>{
          x.respuestaObligatoria = true;
        })
      }


    }else{


      if(pregunta.tblGrupoOpciones.tblOpcionesPregunta.filter((y)=>y.checked).length > 0){
        pregunta.tblGrupoOpciones.tblOpcionesPreguntaforEach((x)=>{
          x.respuestaObligatoria = false;
        })
      }else{
        pregunta.tblGrupoOpciones.tblOpcionesPreguntaforEach((x)=>{
          x.respuestaObligatoria = true;
        })
      }
    } */


    //opcion.respuestaObligatoria = evento.target.checked?true:false;

    let respuestas: Array<TblRespuesta> = [];
    await pregunta.tblGrupoOpciones.tblOpcionesPregunta.filter((x) => x.checked).forEach((y)=>{
      let respuesta = new TblRespuesta();
      respuesta.respuestaTexto = null;
      respuesta.id = 0;
      respuesta.tblPreguntaId = pregunta.id;
      respuesta.tblOpcionesPreguntaId = y.id;
      respuesta.respuestaTexto = null;
      respuesta.respuestaComplemento = null;
      respuesta.respuestaNumero = null;
      respuesta.respuestaSiNo = null;
      respuesta.inclusion = this.obtenerFechaActual();
      respuesta.activo = true;
      respuesta.tblDatosGeneralesAspiranteId = this.tblDatosGeneralesAspiranteId;
      respuestas.push(respuesta);
    });

    pregunta.tblRespuesta = respuestas;
    //this.respuesta.emit(respuestas);
    //this.respuesta.emit(respuesta);
  }

  public checkboxesValidos(){

    let invalid = this.preguntas.filter((pregunta)=> pregunta.tblTipoRespuesta.tipoRespuesta == 'checkbox' && pregunta.respuestaObligatoria && pregunta.tblRespuesta.length == 0).length;

    //invalid > 0 ? alert('invalido') : alert('valido')
    return invalid > 0 ? false : true;

  }


  async onCheckRadio(pregunta, opcion: TblOpcionesPregunta,  evento){


    //Se reinician los checked
    pregunta.tblGrupoOpciones.tblOpcionesPregunta.forEach((x)=>{
      x.checked = false;
    });
    //alert(evento.target.value + ' ' + evento.target.checked);
    opcion.checked = evento.source.checked;


    let respuestas: Array<TblRespuesta> = [];
    await pregunta.tblGrupoOpciones.tblOpcionesPregunta.filter((x) => x.checked).forEach((y)=>{
      let respuesta = new TblRespuesta();
      respuesta.respuestaTexto = null;
      respuesta.id = 0;
      respuesta.tblPreguntaId = pregunta.id;
      respuesta.tblOpcionesPreguntaId = y.id;
      respuesta.respuestaTexto = null;
//      respuesta.respuestaComplemento = null;
      respuesta.respuestaComplemento = pregunta.tblRespuesta.length > 0 ? pregunta.tblRespuesta[0].respuestaComplemento : null;
      respuesta.respuestaNumero = null;
      respuesta.respuestaSiNo = null;
      respuesta.inclusion = this.obtenerFechaActual();
      respuesta.activo = true;
      respuesta.tblDatosGeneralesAspiranteId = this.tblDatosGeneralesAspiranteId;
      respuestas.push(respuesta);
    });

    pregunta.tblRespuesta = respuestas;
    //this.respuesta.emit(respuestas);

  }

  public obtenerFechaActual(){
    return (new Date()).toISOString().slice(0, 19);
  }

}
