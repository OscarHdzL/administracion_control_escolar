import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  Inject,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { Calendar, EventApi } from "@fullcalendar/core";
//import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { ConfirmationService, MessageService, TreeNode } from "primeng/api";
import { Listbox } from "primeng/listbox";
import { Observable, Subscription } from "rxjs";
import { GrupoMaterias, MateriaGrupo } from "src/app/modelos/Catalogos";
import {
  GrupoMateriaDocenteHorarioModel,
  GrupoMateriaPlantillaModel,
  GrupoModel,
  HorarioDocente,
  HorarioMateriaDocente,
} from "src/app/modelos/Grupo.model";
import { CatalogosServices } from "src/app/servicios/catalogos.service";
import { VariablesService } from "src/app/servicios/variableGL.service";

import { Location } from '@angular/common';
import { AltaDocenteMateriaGrupoComponent } from "../grupo/alta-materias-grupo/alta-docente-materia-grupo/alta-docente-materia-grupo.component";
import { HorarioDocenteMateriaNoBase, HorarioMateriaNobaseSemestre, MateriasNoBasebySemestre } from 'src/app/modelos/Materia.model';


@Component({
  selector: 'app-calendario-materias-nobase',
  templateUrl: './calendario-materias-nobase.component.html',
  styleUrls: ['./calendario-materias-nobase.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CalendarioMateriasNobaseComponent implements OnInit {
  formSemestre: FormGroup
  IDSEMESTRE: number
  listaSemestres = []
  PLACEHOLDER = "Seleccione una opción"
  displayBasic = false;
  listaEvento: any[] = [];
  ID_GRUPO = 3;
  @ViewChild("mycalendar_") calendarComponent: FullCalendarComponent;
  @ViewChild("listBox") listBox: Listbox;
  events: any[];
  options: CalendarOptions;
  activeState: boolean[] = [true, false, false];

listaMateriasSemestre : MateriasNoBasebySemestre[] = []

  listaHorariosExistentes: HorarioMateriaDocente[] = [];

  listaPaletaColores = [
    //AZULES
    "#1C4C96",
    "#256Edc",
    "#427ed7",
    "#5f95e7",
    "#97bdf5",
    "#3e5f8a",
    "#6a041a",
    "#9a0526",
    "#9a0526",
    "#5783bc",
    "#6a9cde",
    "#a0c5f7",
    "#cadffb",
    "#8e22bb",
    "#ab49cc",
    "#ff69b4",
    "#ff7cbc",
    "#318CE7",
    "#4a9ae9",
    "#6aa9e9",
    "#014ba0",
    "#0a5cb8",
    "#1466c3",
    "#2174d4",
    "#670010",
    "#cb4c46",
    "#952f57",
    "#ca668b",
    "#3b8eed",
    "#2196f3",
    "#0069c0",
    "#137fd9",
    "#2196f3",
    "#107acc",


    "#ab022f",
    "#cd0c36",
    "#ff0000",
    "#ff9ea2",

    //TERMINA ROJOS


    ///
    "#4b0081",
    "#7f00b2",
    "#681c7c",
    "#7f00b2",
    '#666f88',
    '#788199',
    '#8990a2',
    '#a3a8b7',
    '#b5bac9',


  ]
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialog: MatDialog,
    private catalogosService: CatalogosServices,
    private toastService:VariablesService,
    private router: ActivatedRoute,
    private _location: Location,
    private formBuilder: FormBuilder,
  ) {


    this.ID_GRUPO = this.router.snapshot.paramMap.get('id') ? Number(this.router.snapshot.paramMap.get('id')) : 0;

    const name = Calendar.name; // add this line in your constructor

    this.options = {
      eventContent: function (args, createElement) {

        const icon = args.event._def.extendedProps.img;
        const text = "<em class='fa " + icon + "'></em> " + '<strong>' + args.event._def.extendedProps.materia + '</strong>' + ' - ' + args.event._def.extendedProps.nombreDocente
        /* + ' <br><strong>' + args.event.start.toLocaleString('es-es', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' - ' + args.event.end.toLocaleString('es-es', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + '<strong>'; */
        return {
          html: text
        };
      },
      dayPopoverFormat: { month: "long", day: "numeric", year: "numeric" },
      plugins: [interactionPlugin, timeGridPlugin],
      headerToolbar: {
        left: "",
        center: "",
        right: "",
      },
      locale: "es",
      weekNumbers: false,
      dayHeaders: true,
      /*  titleFormat: { // will produce something like "Tuesday, September 18, 2018"
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        weekday: 'long'
      }, */
      contentHeight: "auto",
      weekends: false,
      slotMinTime: "07:00:00",
      slotMaxTime: "15:00:00",
      allDaySlot: false,
      droppable: true,
      editable: false,
      selectable: true,
      slotLabelFormat: {
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: false,
        //meridiem: 'short',
        hour12: false,
      },
      //eventOverlap: false,

      /* dayHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: false }, */
      dayHeaderFormat: { weekday: "short" },

      //CUANDO SE DEJA CAER EL DRAGGABLE EN EL CALENDARIO
      eventDrop: this.funcionDrop.bind(this),
      /* eventDragStop: (eventDragStopEvent) => {
        console.log("EVENT DRAG STOP !!!");
        console.log(eventDragStopEvent);
        this.misEventos.push(eventDragStopEvent.event);
      }, */
      //CUANDO SE REUBICA UN EVENTO A OTRO DIA U OTRO HORARIO
      //eventDragStop: this.funcionDragStop.bind(this),
      /* eventReceive: (eventReceiveEvent) => {
        console.log("EVENT RECEIVE !!!");
      }, */
      eventReceive: this.funcionReceiveMateria.bind(this),
      //EVENTO QUE SE EJECUTA

      /*
        eventResize: (eventResize) =>  {
        console.log('eventResize');
        console.log(eventResize);
        }, */
      eventResize: this.funcionResize.bind(this),
      /*
        eventResizeStart: (eventResizeStart) =>  {
        console.log('eventResizeStart');
        console.log(eventResizeStart);
      },
      eventResizeStop: (eventResizeStop) =>  {
        console.log('eventResizeStop');
        console.log(eventResizeStop);

      }, */
      /*       eventClick: (eventClick) => {
        ;
        console.log("eventClick");
        console.log(eventClick);
        //this.confirm(eventClick);

        this.openModalDocenteMateriaGrupo(eventClick)
      }, */

      //eventClick: this.openModalDocenteMateriaGrupo.bind(this),
      eventClick: this.confirm.bind(this),
    };
  }



  async ngOnInit() {
    console.log("ON INIT");
    //this.eventsSubscription = this.eventos.subscribe(() => this.ngOnInit());
    console.log(this.listaEvento);

    this.iniciarForm();
    await this.obtenerSemestres()
  }

  public iniciarForm() {
    this.formSemestre = this.formBuilder.group({
      semestre: [null, [Validators.required]]
    })
    this.onChangeSemestre();
  }

  get semestre() { return this.formSemestre.get('semestre') }


  public onChangeSemestre(){
    this.semestre.valueChanges.subscribe(async idSemestre=>{
      debugger
      if(idSemestre){
        this.IDSEMESTRE = idSemestre;
        await this.obtenerMateriasDocenteBySemestre(this.IDSEMESTRE);
        await this.obtenerHorariosSemestre(this.IDSEMESTRE)
      }
    });
  }

  public randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public irAtras(){
    this._location.back();
  }

  public async obtenerSemestres(){
    const respuesta = await this.catalogosService.consultarSemestres();
    this.listaSemestres = respuesta.exito ? respuesta.objeto : [];
  }


  public async obtenerHorariosSemestre(idSemestre) {
    const respuesta = await this.catalogosService.consultarHorariosMateriasNoBaseByIdSemestre(
      idSemestre
    );
    let horarios: HorarioMateriaNobaseSemestre[] = respuesta.objeto
      ? respuesta.objeto
      : [];
    let listaEventosCalendario = [];

    horarios.forEach((element) => {

      listaEventosCalendario.push({
        title: element.materia + " - " + element.nombreDocente,
        start: this.establecerHorario(element.dia, element.horaInicio),
        end: this.establecerHorario(element.dia, element.horaFin),
        duration: "01:00",
        durationEditable: false,
        id: 1,
        backgroundColor: "#1DB93A",
        icon: "asterisk",
        extendedProps: {
          img: 'fa-dot-circle-o',
          optativa: false,

          //SE USARIA PARA BORRAR EL HORARIO
          horarioId: element.id,

          //SE USARIA PARA OBTNER LOS DOCENTES QUE ESTEN LIGADOS A relMateriaPlantillaId
/*           relMateriaPlantillaId: element.relMateriaPlantillaId,

          //SE USARIA PARA GUARDAR EN rel_grupo_materia_plantilla_docente
          relGrupoMateriaPlantillaId: element.relGrupoMateriaPlantillaId,
          relGrupoMateriaPlantillaDocenteId:
            element.relGrupoMateriaPlantillaDocenteId,

          grupo: element.grupo.toUpperCase(), */
          materia: element.materia.toUpperCase(),
          nombreDocente: element.nombreDocente.toUpperCase()
        },
      });
    });
    this.options.events = listaEventosCalendario;
  }

 /*  public async obtenerHorariosGrupo() {
    const respuesta = await this.catalogosService.consultarHorariosByIdGrupo(
      this.ID_GRUPO
    );
    let horarios: HorarioMateriaDocente[] = respuesta.objeto
      ? respuesta.objeto
      : [];
    let listaEventosCalendario = [];

    horarios.forEach((element) => {

      listaEventosCalendario.push({
        title: element.materia + " - " + element.nombreDocente,
        start: this.establecerHorario(element.dia, element.horaInicio),
        end: this.establecerHorario(element.dia, element.horaFin),
        duration: "01:00",
        durationEditable: false,
        id: 1,
        backgroundColor: "#1DB93A",
        icon: "asterisk",
        extendedProps: {
          img: 'fa-dot-circle-o',
          optativa: false,

          //SE USARIA PARA BORRAR EL HORARIO
          horarioId: element.id,

          //SE USARIA PARA OBTNER LOS DOCENTES QUE ESTEN LIGADOS A relMateriaPlantillaId
          relMateriaPlantillaId: element.relMateriaPlantillaId,

          //SE USARIA PARA GUARDAR EN rel_grupo_materia_plantilla_docente
          relGrupoMateriaPlantillaId: element.relGrupoMateriaPlantillaId,
          relGrupoMateriaPlantillaDocenteId:
            element.relGrupoMateriaPlantillaDocenteId,

          grupo: element.grupo.toUpperCase(),
          materia: element.materia.toUpperCase(),
          nombreDocente: element.nombreDocente.toUpperCase()
        },
      });
    });
    this.options.events = listaEventosCalendario;
  } */


public async obtenerMateriasDocenteBySemestre(idSemestre) {
  debugger
  const respuesta = await this.catalogosService.consultarMateriasNoBaseDocenteByIdSemestre(idSemestre);
  this.listaMateriasSemestre = respuesta.exito ? respuesta.objeto : [];

  //Se limpia lista de draggable
  this.listaEvento = [];

  //Se agrega Seccion/Titulo
  this.listaEvento.push({
    label: "Materias del semestre",
    value: "a",
    items: [],
  });

  for (let i = 0; i < this.listaMateriasSemestre.length; i++) {

    this.listaEvento[0].items.push({
      id: i + 1,
      label: (
        this.listaMateriasSemestre[i].materia  +
        (this.listaMateriasSemestre[i].nombreDocente
          ? " - " + this.listaMateriasSemestre[i].nombreDocente
          : "")
      ).toUpperCase(),
      value: (
        this.listaMateriasSemestre[i].materia +
        (this.listaMateriasSemestre[i].nombreDocente
          ? " - " + this.listaMateriasSemestre[i].nombreDocente
          : "")
      ).toUpperCase(),
      optativa: true,
      //fondo: color,
      fondo: this.listaPaletaColores[this.randomInteger(0,this.listaPaletaColores.length - 1)],

      //SE USARIA PARA GUARDAR EN rel_grupo_materia_plantilla_docente
     /*  relGrupoMateriaPlantillaId: listaMateriaGrupo[i].id,
      relGrupoMateriaPlantillaDocenteId:
        listaMateriaGrupo[i].relGrupoMateriaPlantillaDocenteId,

      grupo: listaMateriaGrupo[i].grupo, */

      relDocenteMateriaNobasePlantillaId: this.listaMateriasSemestre[i].relDocenteMateriaNobasePlantillaId,
      materia: this.listaMateriasSemestre[i].materia,
      nombreDocente: this.listaMateriasSemestre[i].nombreDocente? this.listaMateriasSemestre[i].nombreDocente: '',
    });
  }

  setTimeout(() => {
    console.log("inicia timeout");
    this.listaEvento.forEach((y) => {
      y.items.forEach((x) => {
        let draggableEl = document.getElementById("mydraggable" + x.id);

        new Draggable(draggableEl, {
          eventData: {
            title: x.label,
            duration: "01:00",
            durationEditable: false,
            backgroundColor: x.fondo,
            extendedProps: {
              optativa: x.optativa ? x.optativa : false,
              relDocenteMateriaNobasePlantillaId: x.relDocenteMateriaNobasePlantillaId,
              materia: x.materia,
              nombreDocente: x.nombreDocente
            },
          },
        });
      });
    });
  }, 1500);

}



  confirm(evento) {
debugger
    /* this.confirmationService.confirm({
          message:'¿Quiere eliminar el evento?',
          accept: () => {
              //Actual logic to perform a confirmation
              evento.event.remove();
          },
          header: evento.event.title,
          acceptLabel: 'Eliminar',
          rejectLabel: 'Cancelar'
      }); */
    this.confirmationService.confirm({
      target: evento.el,
      message: "¿Quiere eliminar el horario?",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        //confirm action

        debugger
        const respuesta = await this.catalogosService.eliminarHorarioDocenteMateriaNoBase(evento.event.extendedProps.horarioId);
        if(respuesta.exito){
          this.toastService.toastSuccess(respuesta.mensaje);
          evento.event.remove();
         /*  await this.obtenerMateriasGrupo();
          await this.obtenerHorariosGrupo(); */
        } else {
          this.toastService.toastErr(respuesta.error);
        }

      },
      header: evento.event.title,
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
    });
  }

  save() {}

  ngAfterViewInit(): void {
    console.log("AFTER VIEW INIT");
  }

  convertirADraggable() {}

/*   openModalDocenteMateriaGrupo(model: any) {
    ;
    //GrupoMateriaPlantillaModel
    console.log(model.event.extendedProps);

    if (model.event.extendedProps.relGrupoMateriaPlantillaDocenteId) {
      this.confirm(model);
      return;
    }

    let fechaInicio: Date = model.event.start;
    let fechaFin: Date = model.event.end;

    let horaInicio: string = this.obtenerHoraCadena(fechaInicio);
    let horaFin: string = this.obtenerHoraCadena(fechaFin);
    let dia = fechaFin.getDay();

    let mod = new GrupoMateriaDocenteHorarioModel();
    mod.relGrupoMateriaPlantillaId =
    model.event.extendedProps.relGrupoMateriaPlantillaId;
    mod.relMateriaPlantillaId = model.event.extendedProps.relMateriaPlantillaId;
    mod.horaInicio = horaInicio;
    mod.horaFin = horaFin;
    mod.dia = dia;

    this.dialog
      .open(AltaDocenteMateriaGrupoComponent, {
        width: "40%",
        height: "30%",
        autoFocus: false,
        data: { alta: true, grupo: mod },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(async (result) => {
        if (result) {

          //model.event.remove();
          this.limpiarCalendario(); //SE BORRAN LOS EVENTOS
          await this.obtenerMateriasGrupo();
          await this.obtenerHorariosGrupo();

        }
        console.log(result);
      });
  } */

  public obtenerHoraCadena(fecha: Date): string {
    let horas =
      fecha.getHours() < 10
        ? "0" + fecha.getHours().toString()
        : fecha.getHours().toString();
    let minutos =
      fecha.getMinutes() < 10
        ? "0" + fecha.getMinutes().toString()
        : fecha.getMinutes().toString();
    return horas + ":" + minutos + ":00";
  }

  public establecerHorario(dia: number, hora: string) {
    //SE OBTIENE EL DIA ACTUAL

    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    curr = new Date();
    var fechaDomingo = new Date(curr.setDate(first));
    curr = new Date();
    var fechaSabado = new Date(curr.setDate(last));

    let fecha: Date;
    curr = new Date();
    fecha = new Date(curr.setDate(first + dia));

    let horaSplit = hora.split(":");

    fecha.setHours(Number(horaSplit[0]));
    fecha.setMinutes(Number(horaSplit[1]));
    fecha.setSeconds(Number(horaSplit[2]));

    /*

switch(dia){
  //LUNES
  case 1:
    fecha = new Date(curr.setDate(first + dia + 1));
  break;

  //MARTES
  case 2:

  break;

  //MIERCOLES
  case 3:

  break;

  //JUEVES
  case 4:

  break;

  //VIERNES
  case 5:

  break;


} */
    return fecha;
  }

  handleDateClick(arg) {
    alert("date click! " + arg.dateStr);
  }

  public funcionDrop(evento: any) {
    console.log("funcionDrop");
    if (this.eventoExisteEnDia(evento)) {
      evento.revert();
      //alert("El evento ya existe en el dia");
      this.messageService.add({
        severity: "warn",
        summary: "Tab Closed",
        detail: "El evento ya existe en el dia",
      });
    }
    if (this.eventoRepetido(evento)) {
      //alert("Evento repetido");
      this.messageService.add({
        severity: "warn",
        summary: "Tab Closed",
        detail: "Evento repetido",
      });

      evento.revert();
    } else {
      if (this.eventoIntercalado(evento)) {
        //alert('evento intercalado');
        this.messageService.add({
          severity: "info",
          summary: "Tab Closed",
          detail: "Evento intercalado",
        });
        if (!this.eventoOptativo(evento)) {
          evento.revert();
          //alert("El evento no es optativo");
          this.messageService.add({
            severity: "warn",
            summary: "Tab Closed",
            detail: "El evento no es optativo",
          });
          return;
        } else {
          //alert("Evento optativo");
          this.messageService.add({
            severity: "info",
            summary: "Tab Closed",
            detail: "Evento optativo",
          });
          return;
        }
      }
    }
  }

  /* public async funcionReceive(evento) {


    if(this.eventoIntercalado(evento)){
      this.toastService.toatsWarning('No se pueden intercarlar horarios')
      evento.revert();
      return ;
    }

   if(evento.event.extendedProps.relGrupoMateriaPlantillaDocenteId){
    let mod = new HorarioDocente();

    let fechaInicio: Date = evento.event.start;
    let fechaFin: Date = evento.event.end;

    let horaInicio: string = this.obtenerHoraCadena(fechaInicio);
    let horaFin: string = this.obtenerHoraCadena(fechaFin);
    let dia = fechaFin.getDay();


    mod.relGrupoMateriaPlantillaDocente = evento.event.extendedProps.relGrupoMateriaPlantillaDocenteId;
    mod.horaInicio = horaInicio;
    mod.horaFin = horaFin;
    mod.dia = dia;

    const respuesta = await this.catalogosService.insertarHorarioDocente(mod);
    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);

      await this.obtenerMateriasGrupo();
      await this.obtenerHorariosGrupo();
      evento.revert();
    } else {



      this.listaHorariosExistentes = respuesta.objeto ? respuesta.objeto : [];
      this.displayBasic = true;
      this.toastService.toastErr(respuesta.error);
      evento.revert();
    }
  }
  } */

  public async funcionReceiveMateria(evento) {

debugger
    if(this.eventoIntercalado(evento)){
      this.toastService.toatsWarning('No se pueden intercarlar horarios')
      evento.revert();
      return ;
    }

   if(evento.event.extendedProps.relDocenteMateriaNobasePlantillaId){
    let mod = new HorarioDocenteMateriaNoBase();

    let fechaInicio: Date = evento.event.start;
    let fechaFin: Date = evento.event.end;

    let horaInicio: string = this.obtenerHoraCadena(fechaInicio);
    let horaFin: string = this.obtenerHoraCadena(fechaFin);
    let dia = fechaFin.getDay();


    mod.relDocenteMateriaNobasePlantillaId = evento.event.extendedProps.relDocenteMateriaNobasePlantillaId;
    mod.horaInicio = horaInicio;
    mod.horaFin = horaFin;
    mod.dia = dia;

    const respuesta = await this.catalogosService.insertarHorarioDocenteMateriaNoBase(mod);
    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);

      await this.obtenerMateriasDocenteBySemestre(this.IDSEMESTRE);
      await this.obtenerHorariosSemestre(this.IDSEMESTRE);
      evento.revert();
    } else {



      this.listaHorariosExistentes = respuesta.objeto ? respuesta.objeto : [];
      this.displayBasic = true;
      this.toastService.toastErr(respuesta.error);
      evento.revert();
    }
  }
  }

  public cerrarHorariosEncontradas(){
    this.displayBasic = false;
  }

  public funcionResize(evento: any) {
    console.log("funcionResize");
    if (this.eventoExisteEnDia(evento)) {
      evento.revert();
      alert("El evento ya existe en el dia");
    }
    if (this.eventoIntercalado(evento)) {
      alert("evento intercalado");
      if (!this.eventoOptativo(evento)) {
        evento.revert();
        alert("El evento no es optativo");
        return;
      } else {
        alert("Evento optativo");
        return;
      }
    }
  }

  public funcionDragStop(evento: any) {
    console.log("funcionDragStop");
    console.log(evento);

    if (this.eventoExisteEnDia(evento)) {
      evento.revert();
      alert("El evento ya existe en el dia");
    }
    if (this.eventoRepetido(evento)) {
      alert("Evento repetido");
      evento.revert();
    } else {
      if (this.eventoIntercalado(evento)) {
        alert("evento intercalado");
        if (!this.eventoOptativo(evento)) {
          evento.revert();
          alert("El evento no es optativo");
          return;
        } else {
          alert("Evento optativo");
          return;
        }
      }
    }
  }

  public validarEvento(evento: any) {
    console.log("EVENTO A VALIDAR");
    console.log(evento);
    //console.log(tipoEvento);
    let eventos = this.calendarComponent.getApi().getEvents();

    this.eventoExisteEnDia(evento);
    /* //if(evento.event.extendedProps.optativa){
      if('1' != '1'){
      alert('La clase '+ evento.event.title+' es optativa');
    } else {

      let eventos = this.calendarComponent.getApi().getEvents()
      let eventoExiste = eventos.filter((ev)=> ev.startStr == evento.event.startStr && ev.endStr == evento.event.endStr && ev.title == evento.event.title);

      if(eventoExiste.length > 1){
        alert('YA EXISTE EL EVENTO');
        evento.revert();
      }else{
        if(!evento.event.extendedProps.optativa){
          alert('La clase '+ evento.event.title+' no es optativa');
          evento.revert();
        }
      }
      //evento.revert();
    }
 */
  }

  public obtenerEventos(bol: boolean) {
    if (bol) {
      let calendario = this.calendarComponent;
      console.log("agregar", calendario.getApi().getEvents());
      calendario.getApi().removeAllEvents();
      this.listBox._options = [];
    } else {
      let calendario = this.calendarComponent;
      console.log("cancelar", calendario.getApi().getEvents());
      calendario.getApi().removeAllEvents();
      this.listBox._options = [];
    }
  }

  public eventoExisteEnDia(evento) {
    let eventos = this.calendarComponent.getApi().getEvents();
    let eventoExiste = eventos.filter(
      (ev) =>
        ev.start.getDate() == evento.event.start.getDate() &&
        ev.start.getMonth() == evento.event.start.getMonth() &&
        ev.start.getFullYear() == evento.event.start.getFullYear() &&
        ev.title == evento.event.title
    );

    //EN EL MOMENTO QUE SE EJECUTA ESTE CODIGO, EL EVENTO YA SE AGREGO AL CALENDARIO, SI HAY MAS DE UNO, YA HAY DUPLICIDAD
    if (eventoExiste.length > 1) {
      //alert("EL EVENTO YA FUE AGREGADO EN EL DIA")
      //evento.revert();
      return true;
    } else {
      return false;
    }
  }

  public eventoIntercalado(evento: any) {
    let eventos = this.calendarComponent
      .getApi()
      .getEvents()
      .filter(
        (ev) =>
          ev.start.getDate() == evento.event.start.getDate() &&
          ev.start.getMonth() == evento.event.start.getMonth() &&
          ev.start.getFullYear() == evento.event.start.getFullYear() &&
          ((ev.start <= evento.event.start && ev.end > evento.event.start) ||
            (ev.start < evento.event.end && ev.end >= evento.event.end))
      );

    if (eventos.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  public eventoRepetido(evento: any) {
    /*
    {
      event: EventApi,
      relatedEvent: any,
      revert(),
      view:ViewApi,
      draggedEl:
    }
    */
    let eventos = this.calendarComponent
      .getApi()
      .getEvents()
      .filter(
        (x) =>
          x.start == evento.start &&
          x.end == evento.end &&
          x.title == evento.title
      );

    if (eventos.length > 1) {
      //YA EXISTE
      return true;
    } else {
      return false;
    }
  }

  public eventoOptativo(evento: any) {
    if (evento.event.extendedProps.optativa) {
      return true;
    } else {
      return false;
    }
  }

  /* public eventoOptativo(evento: any){
    if(evento.event.extendedProps.optativa){
      return true;
    } else {
      return false;
    }
  } */

  onTabClose(event) {
    this.messageService.add({
      severity: "info",
      summary: "Tab Closed",
      detail: "Index: " + event.index,
    });
  }

  onTabOpen(event) {
    this.messageService.add({
      severity: "info",
      summary: "Tab Expanded",
      detail: "Index: " + event.index,
    });
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  onNodeExpand(eventos) {
    document.getElementById("mydraggableangular");
    console.log(eventos);
    if (eventos.node.parent) {
      eventos.node.children.forEach((element) => {
        console.log(element.data.name);

        let nomre = "mydraggable" + element.data.name;
        let draggableEl = document.getElementById(
          "mydraggable" + element.data.name
        );

        new Draggable(draggableEl, {
          eventData: {
            title: element.data.name,
            duration: "01:00",
            backgroundColor: "green",
            /* extendedProps: {
              optativa: x.optativa ? x.optativa : false,
            }, */
          },
        });
      });
    }
  }

/*   public limpiarCalendario(){
    let calendario = this.calendarComponent;
    calendario.getApi().removeAllEvents();
  } */

  public async limpiarCalendario() {
      let calendario = this.calendarComponent;
      calendario.getApi().removeAllEvents();
      this.listBox._options = [];


      await this.obtenerHorariosSemestre(this.IDSEMESTRE);

  }
}
