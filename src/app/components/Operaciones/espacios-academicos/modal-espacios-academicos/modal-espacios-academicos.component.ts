import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { Espacio } from 'src/app/modelos/Catalogos';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
@Component({
  selector: 'vex-modal-espacios-academicos',
  templateUrl: './modal-espacios-academicos.component.html',
  styleUrls: ['./modal-espacios-academicos.component.scss']
})
export class ModalEspaciosAcademicosComponent implements OnInit {

  //ViewChild(MatTable) myTable: MatTable<any>;
  public modalFormulario: Espacio = {
    id: null,
    espacio: null
  };
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';

  displayedColumns: string[] = ['opcion', 'acciones'];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: Espacio,
              private dialogRef: MatDialogRef<ModalEspaciosAcademicosComponent>,
              private fb: UntypedFormBuilder,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private catalogosServices: CatalogosServices) {
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
    if (f.invalid) {
      
    } else {
      if(this.objeto == 0){
        delete this.modalFormulario.id;
        console.log('Agregar', this.modalFormulario);
        let res = await this.catalogosServices.agregarEspacio(this.modalFormulario);
        console.log(res);
        if(res.exito==true){
          this.swalService.alertaPersonalizado(res.exito,res.mensaje);
          this.dialogRef.close();
        }else{
          this.toastService.toastErr(res.mensaje);
        }
      }
      else{
        console.log('Editar', this.modalFormulario);
        let res = await this.catalogosServices.actualizarEspacio(this.modalFormulario);
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

}
