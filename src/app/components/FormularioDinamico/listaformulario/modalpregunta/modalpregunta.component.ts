import { Component, Inject, OnInit } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { formularioOpciones, Preguntas, TipoRespuesta } from 'src/app/modelos/respuesta.model';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { ListaFormulariosService } from 'src/app/servicios/lista-formularios.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { GrupoOpcionesServices } from 'src/app/servicios/grupo-opciones.service';
@Component({
  selector: 'vex-modalpregunta',
  templateUrl: './modalpregunta.component.html',
  styleUrls: ['./modalpregunta.component.scss']
})
export class ModalpreguntaComponent implements OnInit {

pregunta: Preguntas = {};
  public listaOpciones: string[] = [];
  public opciones: string;
  public gruposEditar: any[] = [];
  public idGrupoOpciones: number;
  public grupoGruposOpciones: string;
  public listaTiposRespuesta: any=[];
  public gruposOpciones: formularioOpciones[] = [];
  columns: TableColumn<any>[] = [
    { label: 'Opción', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  public mostrarComplemento: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: any,
              private dialogRef: MatDialogRef<ModalpreguntaComponent>,
              public ex: ExprecionesRegulares,
              private listaFormulariosService: ListaFormulariosService,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private grupoOpcionesServices:GrupoOpcionesServices) {
  }

  async ngOnInit() {

    console.log('abriendo modal datospregunta',this.objeto);

    let res = await this.listaFormulariosService.tiposRespuesta();
    //console.log(res);
    this.listaTiposRespuesta=res;
    //console.log('datos ya en el modal',this.objeto);
    if(this.objeto.objet == 0){
      let res = await this.grupoOpcionesServices.obtenerGrupos();
      //console.log('opciones res' ,res)
      for (let i = 0; i < res.length; i++) {
        this.gruposOpciones.push(res[i]);
        this.gruposEditar[i] = {id: res[i].id, grupo: res[i].grupo};
      }
    }
    else{
      this.pregunta = this.objeto.objet;
      console.log('grupo de opciones id',this.pregunta.tblGrupoOpcionesId);
      let res = await this.grupoOpcionesServices.obtenerGrupos();
    //console.log('opciones res' ,res)
    for (let i = 0; i < res.length; i++) {
      this.gruposOpciones.push(res[i]);
      this.gruposEditar[i] = {id: res[i].id, grupo: res[i].grupo};
    }
    // //console.log('grupos' ,this.gruposOpciones);
    // //console.log('grupos editar' ,this.gruposEditar);

      //console.log('ID', this.idGrupoOpciones)
      //console.log('Length', this.gruposOpciones.length)
      for (let i = 0; i < this.gruposEditar.length; i++) {
        if(this.pregunta.tblGrupoOpcionesId == this.gruposEditar[i].id){
          this.grupoGruposOpciones = this.gruposEditar[i].grupo;
        }
      }
      let res2 = await this.grupoOpcionesServices.obtenerOpcionesGrupo(this.pregunta.tblGrupoOpcionesId);
      for (let i = 0; i < res2.length; i++) {
        this.listaOpciones.push(res2[i].opcion);
      }
      this.manejoArrayListaOpciones(this.listaOpciones);
      //console.log('datos ya en el modal enpregunta',this.pregunta);
    }
  }


  onChangeTipoRespuesta(idTipoRespuesta: number){
    if(idTipoRespuesta){
      let respuesta: TipoRespuesta  = this.listaTiposRespuesta.filter((x)=> x.id === idTipoRespuesta)[0];
      this.mostrarComplemento = respuesta.tieneComplemento;
    } else {
      this.mostrarComplemento = false;
    }

  }

  manejoArrayListaOpciones(arrayOpciones: string[]){
    let array= arrayOpciones;
    let salto="\n";
    let texto ="";
    for (let index = 0; index < array.length; index++) {
      texto += array[index]+salto;
    }
    this.opciones=texto;

    //preguntasAleatorio
  }

  async consultarGruposOpciones(){
    let res = await this.grupoOpcionesServices.obtenerGrupos();
    //console.log('opciones res' ,res)
    for (let i = 0; i < res.length; i++) {
      this.gruposOpciones.push(res[i]);
      this.gruposEditar[i] = {id: res[i].id, grupo: res[i].grupo};
    }
    // //console.log('grupos' ,this.gruposOpciones);
    // //console.log('grupos editar' ,this.gruposEditar);

      //console.log('ID', this.idGrupoOpciones)
      //console.log('Length', this.gruposOpciones.length)
      for (let i = 0; i < this.gruposEditar.length; i++) {
        if(this.pregunta.tblGrupoOpcionesId == this.gruposEditar[i].id){
          this.grupoGruposOpciones = this.gruposEditar[i].grupo;
        }
      }
      //console.log('Grupo', this.grupoGruposOpciones)
      this.consultarListaOpcionesEditar();

  }

  async consultarListaOpcionesEditar(){
    this.opciones = null;
    this.listaOpciones = [];

    let res = await this.grupoOpcionesServices.obtenerOpcionesGrupo(this.pregunta.tblGrupoOpcionesId);
    for (let i = 0; i < res.length; i++) {
      this.listaOpciones.push(res[i].opcion);
    }
    this.manejoArrayListaOpciones(this.listaOpciones);
  }

  async consultarListaOpciones(event){
    console.log('si entro');

    this.opciones = null;
    this.listaOpciones = [];
    console.log('event' ,event.value);
    //this.pregunta.tblGrupoOpcionesId = event.value.id;
    ////console.log(this.grupoOpciones);
    let res = await this.grupoOpcionesServices.obtenerOpcionesGrupo(event.value);
    for (let i = 0; i < res.length; i++) {
      this.listaOpciones.push(res[i].opcion);
    }
    // //console.log('lista de opciones', this.listaOpciones);
    this.manejoArrayListaOpciones(this.listaOpciones);
  }

  async save(f: NgForm) {
    if(f.valid){
      if(this.objeto.objet == 0){
        this.pregunta.activo = true;
        this.pregunta.id = 0;
        this.pregunta.orden = 11;
        this.pregunta.inclusion = new Date();
        this.pregunta.tblFormularioId = this.objeto.id
        console.log('Agregar', this.pregunta);
        let res = await this.listaFormulariosService.agregarPregunta(this.pregunta);
        //console.log(res);
        if(res.exito==true){
          this.swalService.alertaPersonalizado(res.exito,res.mensaje);
          this.dialogRef.close();
        }else{
          this.toastService.toastErr(res.mensaje);
        }
      }
      else{
        //console.log('Editar', this.pregunta);
        let res = await this.listaFormulariosService.actualizarPregunta(this.pregunta);
        //console.log(res);
        if(res.exito==true){
          this.swalService.alertaPersonalizado(res.exito,res.mensaje);
          this.dialogRef.close();
        }else{
          this.toastService.toastErr(res.mensaje);
        }
      }
    }

  }

}
