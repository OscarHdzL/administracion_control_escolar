import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AperturaInscripcion } from 'src/app/modelos/Catalogos';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
@Component({
  selector: 'vex-modal-apertura-inscripcion',
  templateUrl: './modal-apertura-inscripcion.component.html',
  styleUrls: ['./modal-apertura-inscripcion.component.scss']
})
export class ModalAperturaInscripcionComponent implements OnInit {

  public modalFormulario: AperturaInscripcion = {
    id: null,
    nombre: null,
    fechaInicio: null,
    fechaFin: null,
    idOferta: null
  };
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';
  public listaTiposRespuesta: any=[];

  displayedColumns: string[] = ['opcion', 'acciones'];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: AperturaInscripcion,
              private dialogRef: MatDialogRef<ModalAperturaInscripcionComponent>,
              private fb: UntypedFormBuilder,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private catalogosService: CatalogosServices) {
                this.listaTiposRespuesta.push({
                  id: 1,
                  espacio: "Espacio 1"
                });
                this.listaTiposRespuesta.push({
                  id: 2,
                  espacio: "Espacio 2"
                });
  }

  async ngOnInit() {

    let res = await this.catalogosService.consultarOfertaEducativa()
    this.listaTiposRespuesta = res.objeto;

    console.log('datos ya en el modal',this.objeto);
    if(this.objeto == 0){

    }
    else{
      this.modalFormulario = this.objeto;
      //this.opciones = this.modalFormulario.tblOpcionesPregunta;
      console.log('datos ya en el modal en formulario',this.modalFormulario);
    }
  } 

  async save(f: NgForm) {
    // if(this.objeto == 0){
    //   console.log('Agregar', this.modalFormulario);
    //   let res = await this.grupoOpcionesServices.agregarGrupo(this.modalFormulario);
    //   console.log(res);
    //   if(res.exito==true){
    //     this.swalService.alertaPersonalizado(res.exito,res.mensaje);
    //     this.dialogRef.close();
    //   }else{
    //     this.toastService.toastErr(res.mensaje);
    //   }
    // }
    // else{
    //   console.log('Editar', this.modalFormulario);
    //   let res = await this.grupoOpcionesServices.actualizarGrupo(this.modalFormulario);
    //   console.log(res);
    //   if(res.exito==true){
    //     this.swalService.alertaPersonalizado(res.exito,res.mensaje);
    //     this.dialogRef.close();
    //   }else{
    //     this.toastService.toastErr(res.mensaje);
    //   }
    // }
  }
}
