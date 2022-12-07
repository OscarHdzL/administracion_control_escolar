import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { formularioOpciones, listaOpciones } from 'src/app/modelos/respuesta.model';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { GrupoOpcionesServices } from 'src/app/servicios/grupo-opciones.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
@Component({
  selector: 'vex-modallistaopciones',
  templateUrl: './modallistaopciones.component.html',
  styleUrls: ['./modallistaopciones.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class ModallistaopcionesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTable) myTable: MatTable<any>;
  public modalFormulario: formularioOpciones = {
    id: 0,
    grupo: null,
    activo: true,
    tblOpcionesPregunta:[{}]
  };
  opciones: listaOpciones[] = [];
  opcion: string;
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';
  columns: TableColumn<Customer>[] = [
    { label: 'Opción', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

/*
 id: 0,
        activo: true,
        opcion: this.opcion,
        tblGrupoOpciones: null,
        tblGrupoOpcionesId: 0
*/


  displayedColumns: string[] = ['opcion', 'acciones'];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: formularioOpciones,
              private dialogRef: MatDialogRef<ModallistaopcionesComponent>,
              private fb: UntypedFormBuilder,
              public ex: ExprecionesRegulares,
              private grupoOpcionesServices: GrupoOpcionesServices,
              private swalService: SwalServices,
              private toastService:VariablesService) {
  }

  ngOnInit() {

    console.log('datos ya en el modal',this.objeto);
    if(this.objeto == 0){

    }
    else{
      this.modalFormulario = this.objeto;
      this.opciones = this.modalFormulario.tblOpcionesPregunta;
      console.log('datos ya en el modal en formulario',this.modalFormulario);
    }
  }

  ngAfterViewInit() {
    //this.myTable.renderRows();
  }

  eliminarOpcion(obj: listaOpciones, evento){
    console.log('eliminar opcion',obj);
    obj.activo = evento.checked;
    console.log(obj)
   /*  for(let i = 0; i < this.opciones.length; i++){
      if(this.opciones[i].activo == true){
        this.modalFormulario.tblOpcionesPregunta[i] = this.opciones[i];
      }
    } */
    console.log('opciones eliminar' , this.opciones);
    console.log('objeto eliminar' ,this.modalFormulario.tblOpcionesPregunta);
/*
    const index = this.opciones.indexOf(obj);
      this.opciones.splice(index, 1);
 */

    this.myTable.renderRows();
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async save(f: NgForm) {
    if(this.objeto == 0){
      console.log('Agregar', this.modalFormulario);
      let res = await this.grupoOpcionesServices.agregarGrupo(this.modalFormulario);
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
      let res = await this.grupoOpcionesServices.actualizarGrupo(this.modalFormulario);
      console.log(res);
      if(res.exito==true){
        this.swalService.alertaPersonalizado(res.exito,res.mensaje);
        this.dialogRef.close();
      }else{
        this.toastService.toastErr(res.mensaje);
      }
    }
  }
  agregarOpcion(){
    if(this.opcion){


      console.log('clic');
      this.opciones.push(
        {
          id: 0,
          activo: true,
          opcion: this.opcion,
          tblGrupoOpciones: null,
          tblGrupoOpcionesId: 0
        }
      );
      this.opcion = "";
      for(let i = 0; i < this.opciones.length; i++){
        if(this.opciones[i].activo == true){
          this.modalFormulario.tblOpcionesPregunta[i] = this.opciones[i];
        }
      }
      console.log('opciones agregar' , this.opciones);
      console.log('objeto agregar' ,this.modalFormulario.tblOpcionesPregunta);
      this.myTable.renderRows();
    }
  }

}
