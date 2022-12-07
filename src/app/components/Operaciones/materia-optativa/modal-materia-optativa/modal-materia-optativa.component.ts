import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Espacio, Materia, Rama } from 'src/app/modelos/Catalogos';
import { Customer } from 'src/app/pages/apps/aio-table/interfaces/customer.model';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { ExprecionesRegulares } from 'src/app/modelos/expresionesRegulares';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';

@Component({
  selector: 'vex-modal-materia-optativa',
  templateUrl: './modal-materia-optativa.component.html',
  styleUrls: ['./modal-materia-optativa.component.scss']
})
export class ModalMateriaOptativaComponent implements OnInit {

  //ViewChild(MatTable) myTable: MatTable<any>;
  public modalFormulario: Materia = { };
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';
  public catEspacios: Espacio [] = [];
  public catRamas: Rama []=[];

  displayedColumns: string[] = ['opcion', 'acciones'];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: Materia,
              private dialogRef: MatDialogRef<ModalMateriaOptativaComponent>,
              private fb: UntypedFormBuilder,
              public ex: ExprecionesRegulares,
              private swalService: SwalServices,
              private toastService:VariablesService,
              private catalogosServices: CatalogosServices,) {  }

  async ngOnInit() {
    let resEspacio = await this.catalogosServices.consultarEspacios();
    for (let i = 0; i < resEspacio.objeto.length; i++) {
      this.catEspacios.push({
        id: resEspacio.objeto[i].id,
        espacio: resEspacio.objeto[i].espacio
      });
    }
    let resRama = await this.catalogosServices.consultarRamas();
    for (let i = 0; i < resRama.objeto.length; i++) {
      this.catRamas.push({
        id: resRama.objeto[i].id,
        rama: resRama.objeto[i].rama
      });
    }
    console.log('datos ya en el modal',this.objeto);
    if(this.objeto == 0){
      this.modalFormulario.status = false
    }
    else{
      this.modalFormulario = this.objeto;
      //this.opciones = this.modalFormulario.tblOpcionesPregunta;
      console.log('datos ya en el modal en formulario',this.modalFormulario);
    }
  } 

  onToggle(event){
    this.modalFormulario.status = event.checked;
    console.log(event.checked);
    
    if (event.checked) {
      this.modalFormulario.estatus = "Activo";
    } else {
      this.modalFormulario.estatus = "Inactivo";
    }
  }

  async save(f: NgForm) {
    console.log('Agregar', this.modalFormulario);
    // if (f.invalid) {
      
    // } else {
    //   if(this.objeto == 0){
    //     console.log('Agregar', this.modalFormulario);
    //     let res = await this.catalogosServices.agregarMateria(this.modalFormulario);
    //     console.log(res);
    //     if(res.exito==true){
    //       this.swalService.alertaPersonalizado(res.exito,res.mensaje);
    //       this.dialogRef.close();
    //     }else{
    //       this.toastService.toastErr(res.mensaje);
    //     }
    //   }
    //   else{
    //     console.log('Editar', this.modalFormulario);
    //     let res = await this.catalogosServices.actualizarMateria(this.modalFormulario);
    //     console.log(res);
    //     if(res.exito==true){
    //       this.swalService.alertaPersonalizado(res.exito,res.mensaje);
    //       this.dialogRef.close();
    //     }else{
    //       this.toastService.toastErr(res.mensaje);
    //     }
    //   }
    // }
  }

}
