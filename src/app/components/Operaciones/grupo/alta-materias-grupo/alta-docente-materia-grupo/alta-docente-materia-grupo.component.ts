
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocenteMateriaModel, GrupoMateriaDocenteHorarioModel, GrupoMateriaPlantillaModel, HorarioMateriaDocente } from 'src/app/modelos/Grupo.model';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'vex-alta-docente-materia-grupo',
  templateUrl: './alta-docente-materia-grupo.component.html',
  styleUrls: ['./alta-docente-materia-grupo.component.scss']
})
export class AltaDocenteMateriaGrupoComponent implements OnInit {
  listaHorariosExistentes: HorarioMateriaDocente[] = [];
  displayBasic = false;
  formDocente: FormGroup;
  alta: boolean
  listaDocentes: DocenteMateriaModel[] = []
  grupoModel: GrupoMateriaDocenteHorarioModel;
  PLACEHOLDER = 'SELECCIONE UNA OPCIÓN'

  constructor(
    private dialogRef: MatDialogRef<AltaDocenteMateriaGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService
  ) {

    this.iniciarForm();

    this.alta = data.alta;
    this.grupoModel = data.grupo;
  }


  get docente() { return this.formDocente.get('docente') }

  async ngOnInit() {

    this.listaDocentes = await this.consultarDocentesMateria(this.data.grupo.relMateriaPlantillaId)

    this.listaDocentes.length > 0 ? this.PLACEHOLDER = 'SELECCIONE UNA OPCIÓN' : this.PLACEHOLDER = 'NO SE ENCONTRARON DOCENTES LIGADOS A LA MATERIA ';

    console.log(this.data.grupo.relMateriaPlantillaId);
  }


  public async consultarDocentesMateria(idMateriaPlantilla){
   const respueta = await this.catalogosService.consultarDocenteMateriaByMateriaPlantillaId(idMateriaPlantilla);
   return respueta.exito ? respueta.objeto : [];
  }

  public async guardarDocenteGrupo(){

 /*    let  docenteGrupo  = {
      id: 0,
      relGrupoMateriaPlantillaId: this.grupoModel.id,
      relDocenteMateriaPlantillaId: this.docente.value,
      estatus: true,
      inclusion: new Date
    } */


    let  docenteGrupo  = new GrupoMateriaDocenteHorarioModel();
    docenteGrupo.relGrupoMateriaPlantillaId = this.grupoModel.relGrupoMateriaPlantillaId;
    docenteGrupo.relDocenteMateriaPlantillaId = this.docente.value;
    docenteGrupo.horaInicio = this.grupoModel.horaInicio;
    docenteGrupo.horaFin = this.grupoModel.horaFin;
    docenteGrupo.dia = this.grupoModel.dia;

    //const respuesta = await this.catalogosService.insertarDocenteGrupoMateria(docenteGrupo);
    const respuesta = await this.catalogosService.insertarDocenteGrupoMateriaHorario(docenteGrupo);
    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);
      this.close(true);
    } else {

      this.listaHorariosExistentes = respuesta.objeto ? respuesta.objeto : [];
      this.displayBasic = true;
      this.toastService.toastErr(respuesta.error);

    }

  }


  public cerrarHorariosEncontradas(){
    this.displayBasic = false;
  }





/*
  public async funcionReceive(evento) {

   if(evento.event.extendedProps.relGrupoMateriaPlantillaDocenteId){
    let mod = new HorarioDocente();

    let fechaInicio: Date = evento.event.start;
    let fechaFin: Date = evento.event.end;

    let horaInicio: string = this.obtenerHoraCadena(fechaInicio);
    let horaFin: string = this.obtenerHoraCadena(fechaFin);
    let dia = fechaFin.getDay();


    mod.relGrupoMateriaPlantillaDocente = evento.event.extendedProps.relGrupoMateriaPlantillaDocenteId;
    mod.horaInicio = horaInicio;
    mod.horaFin = horaFin;
    mod.dia = dia;

    const respuesta = await this.catalogosService.insertarHorarioDocente(mod);
    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);

      await this.obtenerMateriasGrupo();
      await this.obtenerHorariosGrupo();
      evento.revert();
    } else {



      this.listaHorariosExistentes = respuesta.objeto ? respuesta.objeto : [];
      this.displayBasic = true;
      this.toastService.toastErr(respuesta.error);
      evento.revert();
    }
  } */

  public iniciarForm() {
    this.formDocente = this.formBuilder.group({
      docente: [null, [Validators.required]]
    })
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }



}
