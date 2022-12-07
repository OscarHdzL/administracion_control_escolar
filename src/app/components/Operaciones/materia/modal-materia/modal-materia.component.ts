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
import { PlanEstudiosModel } from 'src/app/modelos/PlanEstudios.model';
@Component({
  selector: 'vex-modal-materia',
  templateUrl: './modal-materia.component.html',
  styleUrls: ['./modal-materia.component.scss']
})
export class ModalMateriaComponent implements OnInit {

  //ViewChild(MatTable) myTable: MatTable<any>;
  public modalFormulario: Materia = { };
  form: UntypedFormGroup;
  mode: 'create' | 'update' = 'create';
  public catEspacios: Espacio [] = [];
  public catRamas: Rama []=[];
  public catPlanes: PlanEstudiosModel []=[];
  public semestres: any [] = [];
  displayedColumns: string[] = ['opcion', 'acciones'];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: Materia,
              private dialogRef: MatDialogRef<ModalMateriaComponent>,
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
    let resPlanes = await this.catalogosServices.consultarPlanesEstudio();
    for (let i = 0; i < resPlanes.objeto.length; i++) {
      this.catPlanes.push({
        id: resPlanes.objeto[i].id,
        inicio: resPlanes.objeto[i].inicio,
        carrera: resPlanes.objeto[i].carrera
      });
    }
    if(this.objeto == 0){
      this.modalFormulario.base = true
      this.modalFormulario.status = true;
      if (this.modalFormulario.base) {
        this.modalFormulario.estatus = "Base"
      } else {
        this.modalFormulario.estatus = "Especialidad"
      }
    }
    else{
      console.log(this.objeto);
      this.modalFormulario.status = true;
      this.modalFormulario = this.objeto;
      let resPlanId = await this.catalogosServices.consultarPlanEstudioId(this.modalFormulario.idPlanEstudio);
      for (let i = 0; i < resPlanId.objeto[0].semestres; i++) {
        this.semestres.push({
          semestre: i + 1
        });
      }
      if (this.modalFormulario.base) {
        this.modalFormulario.estatus = "Base"
      } 
      else {
        this.modalFormulario.estatus = "Especialidad"
      }
    }
  } 

  async changePlan(event){
    let resPlanId = await this.catalogosServices.consultarPlanEstudioId(event);
    for (let i = 0; i < resPlanId.objeto[0].semestres; i++) {
      this.semestres.push({
        semestre: i + 1
      });
    }
  }

  onToggle(event){
    this.modalFormulario.base = event.checked;    
    if (event.checked) {
      this.modalFormulario.estatus = "Base";
    } 
    else {
      this.modalFormulario.estatus = "Especialidad";
    }
  }

  async save(f: NgForm) {
    delete this.modalFormulario.estatus
    if (f.invalid) {
      
    } 
    else {
      if(this.objeto == 0){
        this.modalFormulario.idOferta = 1; //hardcodeo por sesion
        console.log('Agregar', this.modalFormulario);
        let res = await this.catalogosServices.agregarMateria(this.modalFormulario);
        console.log(res);
        if(res.exito==true){
          this.swalService.alertaPersonalizado(res.exito,res.mensaje);
          this.dialogRef.close();
        }
        else{
          this.toastService.toastErr(res.mensaje);
        }
      }
      else{
        console.log('Editar', this.modalFormulario);
        this.modalFormulario.idOferta = 1; //hardcodeo por sesion
        let res = await this.catalogosServices.actualizarMateria(this.modalFormulario);
        console.log(res);
        if(res.exito==true){
          this.swalService.alertaPersonalizado(res.exito,res.mensaje);
          this.dialogRef.close();
        }
        else{
          this.toastService.toastErr(res.mensaje);
        }
      }
    }
  }
}
