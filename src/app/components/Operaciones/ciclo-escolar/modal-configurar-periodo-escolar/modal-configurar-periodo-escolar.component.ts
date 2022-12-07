import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { Periodo,PeriodoEscolar } from 'src/app/modelos/Catalogos';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { formatDate } from '@angular/common';
import { PeriodoService } from '../../../../servicios/periodo.service';
import { ModalCicloEscolarComponent } from '../modal-ciclo-escolar/modal-ciclo-escolar.component';
import { ModalParcialesPeriodoComponent } from '../modal-parciales-periodo/modal-parciales-periodo.component';
//import { ConsoleReporter } from 'jasmine';

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
                this.periodos.push({
                  id: 0,
                  inicio: "fechaInicio",
                  fin: "fechaFin",
                  estatus: "Vigente"
                });
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {
    console.log(this.periodos);
    
    if(this.objeto == 0){
      
      this.dataSource = new MatTableDataSource<PeriodoEscolar>(this.periodos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.matPaginatorIntl.itemsPerPageLabel = "Periodos por página";
      this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
      this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
    }
    else{
      //this.opciones = this.modalFormulario.tblOpcionesPregunta;
      //console.log('datos ya en el modal en formulario',this.modalFormulario);
      let res = await this.servicioPeriodo.getIdList(this.objeto.id);
      //this.modalFormulario.id = this.objeto.id;
      this.periodos=res.objeto;
      console.log(this.periodos);
      for (let index = 0; index < this.periodos.length; index++) {
        this.periodos[index].inicio=this.periodos[index].inicio.substring(0, 10);
        this.periodos[index].fin=this.periodos[index].inicio.substring(0, 10);
      }
      console.log('reversed:', this.periodos.reverse());
      this.dataSource = new MatTableDataSource<PeriodoEscolar>(this.periodos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.matPaginatorIntl.itemsPerPageLabel = "Periodos por página";
      this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
      this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
      //this.modalFormulario.periodo = this.modalFormulario.periodo==="par"?true:false;
    }
    this.tFormulario=false;
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
    if(this.objeto == 0){
      // console.log('Agregar', this.modalFormulario);
      // let res = await this.grupoOpcionesServices.agregarGrupo(this.modalFormulario);
      // console.log(res);
      // if(res.exito==true){
      //   this.swalService.alertaPersonalizado(res.exito,res.mensaje);
      //   this.dialogRef.close();
      // }else{
      //   this.toastService.toastErr(res.mensaje);
      // }
    }
    else{
      // console.log('Editar', this.modalFormulario);
      // let res = await this.grupoOpcionesServices.actualizarGrupo(this.modalFormulario);
      // console.log(res);
      // if(res.exito==true){
      //   this.swalService.alertaPersonalizado(res.exito,res.mensaje);
      //   this.dialogRef.close();
      // }else{
      //   this.toastService.toastErr(res.mensaje);
      // }
    }
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
      data: objeto
   }).afterClosed().subscribe(( materia: any) => {
      console.log('se guardo bien');
      this.ngOnInit();
    });
  }
  openParcialModalCreate(row:any) {
    console.log(row)
    let objeto = row.id
    this.dialog.open(ModalParcialesPeriodoComponent,{
      height: '50%',
      width: '60%',
      autoFocus: false,
      data: objeto
   }).afterClosed().subscribe(( materia: any) => {
      console.log('se guardo bien');
      this.ngOnInit();
    });
  }

}
