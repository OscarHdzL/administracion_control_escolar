import { Component, Inject, OnInit,Output,EventEmitter } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { Periodo } from 'src/app/modelos/Catalogos';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from '../../../../servicios/variableGL.service';
import { formatDate } from '@angular/common';
import { PeriodoService } from 'src/app/servicios/periodo.service';

@Component({
  selector: 'app-modal-periodo',
  templateUrl: './modal-periodo.component.html',
  styleUrls: ['./modal-periodo.component.scss']
})
export class ModalPeriodoComponent implements OnInit {


  //ViewChild(MatTable) myTable: MatTable<any>;
  public periodoModel: Periodo = new Periodo;
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';

  displayedColumns: string[] = ['opcion', 'acciones'];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: any,
              private dialogRef: MatDialogRef<ModalPeriodoComponent>,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private catalogosServices: CatalogosServices,
              private servicioPeriodo :PeriodoService) {
  }

  async ngOnInit() {
debugger
    this.periodoModel = this.objeto.modelPeriodo;
    this.periodoModel.periodo = this.periodoModel.periodo == 'non' ? 'non' : 'par'
    this.periodoModel.periodobit = this.periodoModel.periodo == 'non' ? false : true;
    this.periodoModel.catCicloEscolarId = this.objeto.CicloEscolarId;

  }
  onToggle(event){
    debugger
    this.periodoModel.periodobit = event.checked;
    this.periodoModel.periodo = this.periodoModel.periodobit ? 'par' : 'non';
  }
  acomodarFecha(s){
    var b = s.split(/\D/);
    return b.reverse().join('-');
  }
  async save(f: NgForm) {

    debugger
    this.periodoModel.inicio = this.acomodarFecha(formatDate(this.periodoModel.inicio,'dd/MM/yyyy','en-US'));
    this.periodoModel.fin = this.acomodarFecha(formatDate(this.periodoModel.fin,'dd/MM/yyyy','en-US'));
    this.periodoModel.vigente = true;
    console.log(this.periodoModel);

    let res = this.periodoModel.id == 0 ? await this.servicioPeriodo.post(this.periodoModel) :  await this.servicioPeriodo.put(this.periodoModel);

    if (res.exito) {
      this.toastService.toastSuccess(res.mensaje);
      console.log(res);
      this.dialogRef.close();
    }
    else
    {
      this.toastService.toastErr(res.error);
    }


  }



  async guardarPeriodo()
  {



    /* let res;
    this.modalFormulario.inicio = this.acomodarFecha(formatDate(this.modalFormulario.inicio,'dd/MM/yyyy','en-US'));
    this.modalFormulario.fin = this.acomodarFecha(formatDate(this.modalFormulario.fin,'dd/MM/yyyy','en-US'));
    this.modalFormulario.catCicloEscolarId=this.modalFormulario.catCicloEscolarId;
    this.modalFormulario.catCicloEscolarId=this.objeto.id;
    this.modalFormulario.periodo=this.modalFormulario.periodo===true?"Non":"Par";

    if(tipo==false)
    {
      this.modalFormulario.id=0;
      res=await this.servicioPeriodo.post(this.modalFormulario);
    }
    else
    {
      //this.modalFormulario.id=0;
      console.log(this.modalFormulario);
      this.tFormulario=false;
      res=await this.servicioPeriodo.put(this.modalFormulario);

    }

    if (res.exito) {
      this.modalFormulario={};
      this.toastService.toastSuccess(res.mensaje);
      this.ngOnInit();
    }else{
      this.toastService.toastErr(res.mensaje);

    }
     */
    //console.log(res);


  }
}
