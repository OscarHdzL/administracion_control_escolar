import { ModalPeriodoComponent } from './../modal-periodo/modal-periodo.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { Periodo, PeriodoEscolar, CicloEscolar } from 'src/app/modelos/Catalogos';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { formatDate } from '@angular/common';
import { PeriodoService } from '../../../../servicios/periodo.service';
import { ModalCicloEscolarComponent } from '../modal-ciclo-escolar/modal-ciclo-escolar.component';
import { ModalParcialesPeriodoComponent } from '../modal-parciales-periodo/modal-parciales-periodo.component';
//import { ConsoleReporter } from 'jasmine';

import Swal from "sweetalert2/dist/sweetalert2.js";


@Component({
  selector: 'vex-modal-configurar-periodo-escolar',
  templateUrl: './modal-configurar-periodo-escolar.component.html',
  styleUrls: ['./modal-configurar-periodo-escolar.component.scss']
})
export class ModalConfigurarPeriodoEscolarComponent implements OnInit {
  public tFormulario:boolean=false;
  //ViewChild(MatTable) myTable: MatTable<any>;
  public modalFormulario: Periodo = {};
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';
  periodos: Periodo[] = [];
  displayedColumns: string[] = ['opcion', 'acciones'];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: TableColumn<any>[] = [
    { label: 'Fecha Inicio', property: 'fechaI', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Fecha Fin', property: 'fechaF', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Estatus', property: 'estatus', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: PeriodoEscolar,
              private dialogRef: MatDialogRef<ModalConfigurarPeriodoEscolarComponent>,
              private fb: UntypedFormBuilder,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private dialog: MatDialog,
              private servicioPeriodo :PeriodoService,
              public matPaginatorIntl: MatPaginatorIntl) {
               /*  this.periodos.push({
                  id: 0,
                  inicio: "fechaInicio",
                  fin: "fechaFin",
                  estatus: "Vigente"
                }); */
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {
debugger
      this.periodos = await this.obtenerPeriodosCicloEscolar(this.objeto.id);
      this.dataSource = new MatTableDataSource<PeriodoEscolar>(this.periodos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.matPaginatorIntl.itemsPerPageLabel = "Periodos por p??gina";
      this.matPaginatorIntl.previousPageLabel  = 'Anterior p??gina';
      this.matPaginatorIntl.nextPageLabel = 'Siguiente p??gina';

  }


  public async obtenerPeriodosCicloEscolar(idCicloEscolar){
    const respuesta = await this.servicioPeriodo.getIdList(idCicloEscolar);
    return respuesta.exito ? respuesta.objeto : [];
  }

  async deleteGrupo(row: any){
    /*
    console.log(row);
    this.modalFormulario=row;
    console.log(this.modalFormulario);
    */
    this.ngOnInit();
  }
  async periodoParciales(row: any){
    console.log(row);

    /*
    console.log(row);
    this.modalFormulario=row;
    console.log(this.modalFormulario);
    */
    this.ngOnInit();
  }
  async updateGrupo(row: any){
    this.modalFormulario.id=row.id;
    this.modalFormulario.inicio = this.acomodarFecha(formatDate(row.inicio,'dd/MM/yyyy','en-US'));
    this.modalFormulario.fin = this.acomodarFecha(formatDate(row.fin,'dd/MM/yyyy','en-US'));
    this.modalFormulario.vigente=row.vigente;
    this.modalFormulario.catCicloEscolarId=row.catCicloEscolarId;
    this.modalFormulario.periodo=row.periodo===true?"Non":"Par";
    console.log(this.modalFormulario);
    this.tFormulario=true;
    this.toastService.toatsWarning("Edite el regisgtro en el formulario");
  }

  onToggle(event,tipo){
    if(tipo==1)
    {
      this.modalFormulario.vigente=event.checked;
    }
    else
    {
      console.log(this.modalFormulario.periodo);
      this.modalFormulario.periodo = this.modalFormulario.periodo==="par"?true:false;
      this.modalFormulario.periodo=event.checked;
      console.log(this.modalFormulario.periodo);
    }
    console.log(event.checked);

    return;

    if (event.checked) {
      this.modalFormulario.estatus = "Vigente";
    } else {
      this.modalFormulario.estatus = "Programado";
    }
  }
  async save(f: NgForm) {
  }
  acomodarFecha(s){
    var b = s.split(/\D/);
    return b.reverse().join('-');
  }

  async agregarOpcion(tipo:boolean)
  {

    let res;
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

    //console.log(res);


  }
  openCicliModalCreate(tipo:number,row:any) {
    let objeto = {tipo,row}
    this.dialog.open(ModalCicloEscolarComponent,{
      height: '50%',
      width: '60%',
      autoFocus: false,
      data: objeto,
      disableClose: true
   }).afterClosed().subscribe(( materia: any) => {
      console.log('se guardo bien');
      this.ngOnInit();
    });
  }
  openParcialModalCreate(row:any) {
    console.log(row)
    let objeto = row.id
    this.dialog.open(ModalParcialesPeriodoComponent,{
      height: '40%',
      width: '45%',
      autoFocus: false,
      data: objeto,
      disableClose: true
   }).afterClosed().subscribe(( materia: any) => {
      console.log('se guardo bien');
      this.ngOnInit();
    });
  }


  openModalPeriodo(periodo:any) {

    console.log(periodo)


    let objeto = {
      modelPeriodo: periodo ? periodo :  new Periodo(),
      CicloEscolarId : this.objeto.id
    }
    this.dialog.open(ModalPeriodoComponent,{
      height: '40%',
      width: '60%',
      autoFocus: false,
      data: objeto,
      disableClose: true
   }).afterClosed().subscribe(( materia: any) => {
      console.log('se guardo bien');
      this.ngOnInit();
    });
  }


  async finalizarPeriodo(item:any){
    Swal.fire({
      title: '??Seguro que quiere finalizar el periodo?. Ya no se podr?? deshacer el cambio',
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
    }).then(async (result) => {
      if (result.isConfirmed) {


        const respuesta = await this.servicioPeriodo.finalizarPeriodo(item);

        if(respuesta.exito){
          this.toastService.toastSuccess("Se finaliz?? periodo");
          this.ngOnInit();
        } else {
          this.toastService.toastErr(respuesta.error);
        }



      } else if (result.isDenied) {

      }
    })
  }

}
