import { Component, Inject, OnInit,Output,EventEmitter } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { CicloEscolar } from 'src/app/modelos/Catalogos';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { VariablesService } from '../../../../servicios/variableGL.service';
import { PeriodoParcialesService } from 'src/app/servicios/parcialesPeriodo.service';
import {pediodoParcial}from '../../../../modelos/PeriodoParcial';
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'vex-modal-parciales-periodo',
  templateUrl: './modal-parciales-periodo.component.html',
  styleUrls: ['./modal-parciales-periodo.component.scss'],
  /* animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ] */
})
export class ModalParcialesPeriodoComponent implements OnInit {
public listado:any=[];
public formulario:pediodoParcial={};
public bloqueos:number=0;
public finalizado:boolean=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public objeto: any,
    private dialogRef: MatDialogRef<ModalParcialesPeriodoComponent>,
    private fb: UntypedFormBuilder,
    private toast:VariablesService,
    private alertas:SwalServices,
    private parciales:PeriodoParcialesService
  ) { }

  async ngOnInit() {
    debugger
    this.listado = await this.obtenerParcialesPeriodo(this.objeto)
    console.log(this.listado);
    if(this.listado.exito){
      this.listado= this.listado.objeto;

    }
    console.log(this.listado)
    this.filtroArray()
    console.log(this.listado)

  }


  public async obtenerParcialesPeriodo(idPeriodo: number ){
    const respuesta = await this.parciales.getId(idPeriodo);
    return respuesta.exito ? respuesta.objeto : [];
  }




  filtroArray(){
    let fin=0;
    for (let i = 0; i < this.listado.length; i++) {

      if (this.listado[i].finalizado ===true) {
        fin = 1+fin;
      }
    }
    this.bloqueos=fin;
    if (this.bloqueos===0) {
      this.listado[0].finalizado=false;
      this.listado[1].finalizado=true;
      this.listado[2].finalizado=true;
    }
    if (this.bloqueos===1) {
      this.listado[0].finalizado=true;
      this.listado[1].finalizado=false;
      this.listado[2].finalizado=true;
    }
    if (this.bloqueos===2) {
      this.listado[0].finalizado=true;
      this.listado[1].finalizado=true;
      this.listado[2].finalizado=false;
    }
    if (this.bloqueos===3) {
      this.finalizado=true;
    }
  }
  async onToggle(tipo,event,item){

    console.log(item);
    this.formulario.id=item.idPeriodoParcial;
    this.formulario.catParcialId=item.idParcial;
    this.formulario.catPeriodoId=item.idPeriodo;
    this.formulario.orden= item.orden;
    this.formulario.actual=item.actual;
    this.formulario.inclusion=item.inclusion;
    this.formulario.activo=item.activo;
    if (tipo==1) {
      this.formulario.abierto=event.checked;
      console.log(this.formulario.abierto);
      this.formulario.finalizado=item.finalizado;
    }else{
      this.formulario.abierto=false;
      this.formulario.finalizado=true;
    }
    let res;
    console.log(this.formulario);
    if(tipo==1){
       res= await this.parciales.post(this.formulario);
    }
    else{
       res= await this.parciales.postFin(this.formulario);
    }

    console.log(res);

    res.exito==true?this.toast.toastSuccess(res.mensaje):this.toast.toastErr(res.mensaje);
    this.ngOnInit();
  }
  async finalizar(item:any){
    Swal.fire({
      title: '¿Seguro que quiere finalizar el parcial?. Ya no se podrá deshacer el cambio',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        //this.toast.toastSuccess("ha finalizado el proceso");
        this.onToggle(2,null,item);
      } else if (result.isDenied) {
        this.toast.toatsWarning("Ha ocurrido un error");
      }
    })
  }
}
