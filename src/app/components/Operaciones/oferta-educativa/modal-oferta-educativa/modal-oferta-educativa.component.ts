import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { Oferta } from 'src/app/modelos/Catalogos';

@Component({
  selector: 'vex-modal-oferta-educativa',
  templateUrl: './modal-oferta-educativa.component.html',
  styleUrls: ['./modal-oferta-educativa.component.scss']
})
export class ModalOfertaEducativaComponent implements OnInit {

  //ViewChild(MatTable) myTable: MatTable<any>;
  public modalFormulario: Oferta = {
    id: null,
    semestre: null
  };
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';

  displayedColumns: string[] = ['opcion', 'acciones'];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: Oferta,
              private dialogRef: MatDialogRef<ModalOfertaEducativaComponent>,
              private fb: UntypedFormBuilder,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService) {
  }

  ngOnInit() {

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
