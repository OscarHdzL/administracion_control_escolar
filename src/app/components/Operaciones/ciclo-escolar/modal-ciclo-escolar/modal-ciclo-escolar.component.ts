import { Component, Inject, OnInit,Output,EventEmitter } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { CicloEscolar, Periodo } from 'src/app/modelos/Catalogos';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { VariablesService } from '../../../../servicios/variableGL.service';
import { formatDate } from '@angular/common';
import { PeriodoService } from 'src/app/servicios/periodo.service';

@Component({
  selector: 'vex-modal-ciclo-escolar',
  templateUrl: './modal-ciclo-escolar.component.html',
  styleUrls: ['./modal-ciclo-escolar.component.scss']
})
export class ModalCicloEscolarComponent implements OnInit {

  //ViewChild(MatTable) myTable: MatTable<any>;
  public modalFormulario2: CicloEscolar = {};
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';

  displayedColumns: string[] = ['opcion', 'acciones'];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: CicloEscolar,
              private dialogRef: MatDialogRef<ModalCicloEscolarComponent>,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private catalogosServices: CatalogosServices,
              private servicioPeriodo :PeriodoService) {

                this.modalFormulario2 = objeto;
  }

  async ngOnInit() {


  }



  onToggle(event){
    debugger
    console.log(event.checked);
    this.modalFormulario2.estatusBit = event.checked
    if (event.checked) {
      this.modalFormulario2.estatusCicloEscolar = "Vigente";
      this.modalFormulario2.catEstatusCicloEscolarId = 1;
    }
    else {
      this.modalFormulario2.estatusCicloEscolar = "Programado";
      this.modalFormulario2.catEstatusCicloEscolarId = 3;
    }
  }
  acomodarFecha(s){
    var b = s.split(/\D/);
    return b.reverse().join('-');
  }
  async save(f: NgForm) {

    debugger
    this.modalFormulario2.inicio = this.acomodarFecha(formatDate(this.modalFormulario2.inicio,'dd/MM/yyyy','en-US'));
    this.modalFormulario2.fin = this.acomodarFecha(formatDate(this.modalFormulario2.fin,'dd/MM/yyyy','en-US'));
    console.log(this.modalFormulario2);
    let res = await this.catalogosServices.agregarCiclo(this.modalFormulario2);
    if (res.exito) {
      this.toastService.toastSuccess(res.mensaje);
      console.log(res);
      this.dialogRef.close();
    }
    else
    {
      this.toastService.toastErr(res.mensaje);
      this.modalFormulario2 ={};

    }


  }

}
