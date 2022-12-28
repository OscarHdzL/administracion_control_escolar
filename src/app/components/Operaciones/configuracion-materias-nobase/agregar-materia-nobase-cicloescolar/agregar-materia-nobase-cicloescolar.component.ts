import { MateriaNoBaseCicloEscolar } from './../../../../modelos/Catalogos';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RelMateriasNobaseCicloEscolar } from 'src/app/modelos/Catalogos';
import { DocenteMateriaModel, GrupoMateriaDocenteHorarioModel, GrupoMateriaPlantillaModel, HorarioMateriaDocente } from 'src/app/modelos/Grupo.model';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'app-agregar-materia-nobase-cicloescolar',
  templateUrl: './agregar-materia-nobase-cicloescolar.component.html',
  styleUrls: ['./agregar-materia-nobase-cicloescolar.component.scss']
})
export class AgregarMateriaNobaseCicloescolarComponent implements OnInit {
  displayBasic = false;
  formMateria: FormGroup;
  alta: boolean
  listaMateriaNoBase: MateriaNoBaseCicloEscolar[] = []
  grupoModel: GrupoMateriaDocenteHorarioModel;
  PLACEHOLDER = 'SELECCIONE UNA OPCIÓN'

  constructor(
    private dialogRef: MatDialogRef<AgregarMateriaNobaseCicloescolarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService
  ) {

    this.iniciarForm();
  }


  get materia() { return this.formMateria.get('materia') }

  async ngOnInit() {

    this.listaMateriaNoBase = await this.consultarMateriasNobase()

    this.listaMateriaNoBase.length > 0 ? this.PLACEHOLDER = 'SELECCIONE UNA OPCIÓN' : this.PLACEHOLDER = 'NO SE ENCONTRARON MATERIAS NO BASE';

  }


  public async consultarMateriasNobase(){
   const respueta = await this.catalogosService.consultarMateriasNobase();
   return respueta.exito ? respueta.objeto : [];
  }

  public async guardarMateriaNoBase(){

    debugger
    let  materiaNoBase  = new RelMateriasNobaseCicloEscolar();

    //la relacion con el ciclo escolar la hace el servicio
    materiaNoBase.relMateriaPlantillaId = this.materia.value;
    //const respuesta = await this.catalogosService.insertarmateriaNoBaseMateria(materiaNoBase);
    const respuesta = await this.catalogosService.agregarMateriaNobaseCicloEscolar(materiaNoBase);
    if(respuesta.exito){

      this.toastService.toastSuccess(respuesta.mensaje);
      this.close(true);
    } else {

      this.toastService.toastErr(respuesta.error);

    }

  }


  public cerrarHorariosEncontradas(){
    this.displayBasic = false;
  }


  public iniciarForm() {
    this.formMateria = this.formBuilder.group({
      materia: [null, [Validators.required]]
    })
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
