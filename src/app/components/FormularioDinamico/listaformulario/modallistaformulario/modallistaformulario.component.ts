import { Component, Inject, OnInit } from '@angular/core';
import { NgForm  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { formularioOpciones, Formulario } from 'src/app/modelos/respuesta.model';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { ListaFormulariosService } from 'src/app/servicios/lista-formularios.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'vex-modallistaformulario',
  templateUrl: './modallistaformulario.component.html',
  styleUrls: ['./modallistaformulario.component.scss']
})
export class ModallistaformularioComponent implements OnInit {

  formulario: Formulario = {};
  public listaOfertaEducativa: any=[];
  columns: TableColumn<any>[] = [
    { label: 'Opción', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: formularioOpciones,
              private dialogRef: MatDialogRef<ModallistaformularioComponent>,
              public ex: ExprecionesRegulares,
              private listaFormulariosService: ListaFormulariosService,
              private swalService: SwalServices,
              private toastService:VariablesService) {
  }

  async ngOnInit() {
    let res = await this.listaFormulariosService.ofertaEducativa();
    console.log(res);
    this.listaOfertaEducativa=res.objeto;
    console.log('datos ya en el modal',this.objeto);
    if(this.objeto == 0){

    }
    else{
      this.formulario = this.objeto;
      console.log('datos ya en el modal en formulario',this.formulario);
    }
  }

  async save(f: NgForm) {
    if(this.objeto == 0){
      this.formulario.activo = true;
      this.formulario.inclusion = "2022-04-26T00:00:00";
      this.formulario.id = 0;
      console.log('Agregar', this.formulario);
      let res = await this.listaFormulariosService.altaFormulario(this.formulario);
      console.log(res);
      if(res.exito==true){
        this.swalService.alertaPersonalizado(res.exito,res.mensaje);
        this.dialogRef.close();
      }else{
        this.toastService.toastErr(res.mensaje);
      }
    }
    else{
      console.log('Editar', this.formulario);
      let res = await this.listaFormulariosService.actualizarFormulario(this.formulario);
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
