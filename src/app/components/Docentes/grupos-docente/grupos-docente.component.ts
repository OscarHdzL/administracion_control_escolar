import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CalificacionesAlumnosDocente, GruposDocenteModel } from 'src/app/modelos/GruposDocente.model';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { CalificacionesAlumnosComponent } from '../calificaciones-alumnos/calificaciones-alumnos.component';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'app-grupos-docente',
  templateUrl: './grupos-docente.component.html',
  styleUrls: ['./grupos-docente.component.css']
})
export class GruposDocenteComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  calificacionesAlumno: CalificacionesAlumnosDocente

  datosSesion = {
    idDocente: 2,
    nombre: 'JOSE ALFREDO  TAPIA HERNÁNDEZ'
  }

  gruposDocenteModel: GruposDocenteModel = new GruposDocenteModel();

  constructor(
    private catalogosService: CatalogosServices,
    private dialog: MatDialog,
    private toastService:VariablesService,
  ) { }

  async ngOnInit() {
    this.gruposDocenteModel = await this.obtenerGruposDocente();
    setTimeout(() => {

      this.accordion.openAll();
    }, 1000);
  }



  public async obtenerGruposDocente(){

    const respuesta = await this.catalogosService.consultarGruposDocente(this.datosSesion.idDocente);
    return respuesta.objeto ? respuesta.objeto : new GruposDocenteModel();

  }


  public async consultarCalificacionesAlumnosParcial(idGrupoDocente){
    const respuesta = await this.catalogosService.consultarCalificacionesAlumnosParcial(idGrupoDocente);
    return respuesta.objeto ? respuesta.objeto : new CalificacionesAlumnosDocente();
  }


  public async abrirModalCalificacionesAlumnos(objeto){

    this.calificacionesAlumno = await this.consultarCalificacionesAlumnosParcial(objeto.idGrupoDocente);

    if( this.calificacionesAlumno.idParcialHabilitado > 0)
    {
      console.log('CALIFICACIONES');
      console.log(this.calificacionesAlumno);
      this.dialog.open(CalificacionesAlumnosComponent,{
        height: '70%',
        width: '90%',
        autoFocus: false,
        data: {calificaciones: this.calificacionesAlumno, idGrupoDocente: objeto.idGrupoDocente }
     }).afterClosed().subscribe((  apertura: any) => {
        /**
         * Customer is the updated   apertura (if the user pressed Save - otherwise it's null)
         */
        console.log('se guardo bien');

        //this.ngOnInit();
      });
    } else {
      this.toastService.toastErr('No se encontró un parcial abierto para cargar calificaciones');
    }



  }



}
