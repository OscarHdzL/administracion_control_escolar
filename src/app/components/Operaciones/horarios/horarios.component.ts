import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { Calendar, EventApi } from "@fullcalendar/core";
//import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { ConfirmationService, MessageService, TreeNode } from "primeng/api";
import { GrupoMaterias, MateriaGrupo } from "src/app/modelos/Catalogos";
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { Subject } from "rxjs";
@Component({
  selector: 'vex-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class HorariosComponent implements OnInit {


  //listaEvento = [{id: 1, nombre: "Clase 1", fondo: 'blue', optativa: true, profesor: 'Profe 1'},{id: 2, nombre: "Clase 2", fondo: 'green', profesor: 'Profe 1'},{id: 3, nombre: "Clase 3", fondo: 'brown', profesor: 'Profe 2'}];
  // eventsSubject: Subject<void> = new Subject<void>();

  // emitEventToChild() {
  //   this.eventsSubject.next();
  // }
  catGrupos: GrupoMaterias [] = [];
  catMaterias: MateriaGrupo [] = [];
  listaEvento: any[] = [];
  idGrupo: number;
  grupoSeleccionado: number;
  verCalendario: boolean = false;

  constructor(private catalogosServices: CatalogosServices,
              private swalService: SwalServices,
              private toastService:VariablesService) {
  }
  seleccionarGrupo(event){
    this.listaEvento = [];
    var grupoSelect = this.catGrupos.filter(x => x.id == event);
    this.catMaterias = grupoSelect[0].materias;
    this.listaEvento.push(
      {
        label: "Materias del Grupo: " + grupoSelect[0].grupo,
        value: "a",
        items: []
      }
    )
    for (let i = 0; i < this.catMaterias.length; i++) {
      var simbolos, color;
      simbolos = "0123456789ABCDEF";
      color = "#";

      for(var x = 0; x < 6; x++){
        color = color + simbolos[Math.floor(Math.random() * 16)];
      }

      this.listaEvento[0].items.push(
        {
          id: i + 1,
          /* label: this.catMaterias[i].materia,
          value: this.catMaterias[i].materia, */

          label: (this.catMaterias[i].materia + (this.catMaterias[i].nombreDocente ? (' - ' + this.catMaterias[i].nombreDocente): '')).toUpperCase(),
          value: (this.catMaterias[i].materia + (this.catMaterias[i].nombreDocente ? (' - ' + this.catMaterias[i].nombreDocente): '')).toUpperCase(),
          optativa: true,
          fondo: color,
           //SE USARIA PARA OBTNER LOS DOCENTES QUE ESTEN LIGADOS A relMateriaPlantillaId
           relMateriaPlantillaId: this.catMaterias[i].relMateriaPlantillaId,

           //SE USARIA PARA GUARDAR EN rel_grupo_materia_plantilla_docente
           relGrupoMateriaPlantillaId: this.catMaterias[i].relGrupoMateriaPlantillaId,
           relGrupoMateriaPlantillaDocenteId: this.catMaterias[i].relGrupoMateriaPlantillaDocenteId,


           grupo: this.catMaterias[i].grupo,
           materia: this.catMaterias[i].materia,
        }
      )
    }
    this.verCalendario = true;
  }

  clear($event){
    $event = [];
    this.verCalendario = false;
    this.grupoSeleccionado = null;
  }

  async ngOnInit(): Promise<void> {
    let resGrupo = await this.catalogosServices.consultarGruposMaterias();
    console.log(resGrupo);

    for (let i = 0; i < resGrupo.objeto.length; i++) {
      this.catGrupos.push({
        id: resGrupo.objeto[i].id,
        grupo: resGrupo.objeto[i].grupo,
        aforomax: resGrupo.objeto[i].aforomax,
        materias: resGrupo.objeto[i].materias
      });
    }
  }


}
