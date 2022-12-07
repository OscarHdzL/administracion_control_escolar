import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { Calendar, EventApi } from "@fullcalendar/core";
//import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { ConfirmationService, MessageService, TreeNode } from "primeng/api";
import { Listbox } from 'primeng/listbox';
import { Observable, Subscription } from 'rxjs';
import { GrupoMaterias, MateriaGrupo } from "src/app/modelos/Catalogos";
import { GrupoMateriaDocenteHorarioModel, GrupoMateriaPlantillaModel } from 'src/app/modelos/Grupo.model';
import { AltaDocenteMateriaGrupoComponent } from '../../grupo/alta-materias-grupo/alta-docente-materia-grupo/alta-docente-materia-grupo.component';

@Component({
  selector: 'vex-calendario-horario',
  templateUrl: './calendario-horario.component.html',
  styleUrls: ['./calendario-horario.component.scss']
})
export class CalendarioHorarioComponent implements OnInit, AfterViewInit {

  @Input() listaEvento: any[];
  //@Input() eventos: Observable<void>;
  @Output() limpiarCalendario = new EventEmitter<any>();
  // private eventsSubscription: Subscription;
  @Input() limpiarComponente = new EventEmitter<any>();
  @ViewChild("mycalendar_") calendarComponent: FullCalendarComponent;
  @ViewChild("listBox") listBox: Listbox
  events: any[];
  options: CalendarOptions;
  activeState: boolean[] = [true, false, false];

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private dialog: MatDialog
              ) {
    const name = Calendar.name; // add this line in your constructor
  }
  // ngOnDestroy() {
  //   this.eventsSubscription.unsubscribe();
  // }

 async ngOnInit() {
  console.log('ON INIT')
    //this.eventsSubscription = this.eventos.subscribe(() => this.ngOnInit());
    console.log(this.listaEvento);

    this.options = {
      dayPopoverFormat: { month: 'long', day: 'numeric', year: 'numeric' },
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
      editable: true,
      selectable: true,
      slotLabelFormat: {
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: false,
        //meridiem: 'short',
        hour12: false,
      },
      //eventOverlap: false,
      slotDuration: "00:30",
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
      eventReceive: this.funcionReceive.bind(this),
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
      eventClick: (eventClick) => {
        ;
        console.log("eventClick");
        console.log(eventClick);
        //this.confirm(eventClick);

        this.openModalDocenteMateriaGrupo(eventClick)
      },
    };



  }
  confirm(evento) {
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
        message: '¿Quiere eliminar el evento?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            //confirm action
            evento.event.remove();
        },
        header: evento.event.title,
        acceptLabel: 'Eliminar',
        rejectLabel: 'Cancelar'
    });
  }
  save(){

  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT')
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
   /*  this.listaEvento.forEach((y) => {
      y.items.forEach((x) => {
      let draggableEl = document.getElementById("mydraggable" + x.id);
      new Draggable(draggableEl, {
        eventData: {
          title: x.label,
          // duration: "01:00",
          // durationEditable: false,
          backgroundColor: x.fondo,
          extendedProps: {
            optativa: x.optativa ? x.optativa : false,
          },
        },
      });
    });
    }); */
    this.convertirADraggable();
  }


  convertirADraggable(){

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

            //SE USARIA PARA OBTNER LOS DOCENTES QUE ESTEN LIGADOS A relMateriaPlantillaId
            relMateriaPlantillaId: x.relMateriaPlantillaId,

            //SE USARIA PARA GUARDAR EN rel_grupo_materia_plantilla_docente
            relGrupoMateriaPlantillaId: x.relGrupoMateriaPlantillaId,
            relGrupoMateriaPlantillaDocenteId: x.relGrupoMateriaPlantillaDocenteId,


            grupo: y.grupo,
            materia: x.materia,

          },
        },
      });
    });
    });
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
      if(this.eventoIntercalado(evento)){
        //alert('evento intercalado');
        this.messageService.add({
          severity: "info",
          summary: "Tab Closed",
          detail: "Evento intercalado",
        });
        if(!this.eventoOptativo(evento)){
          evento.revert();
          //alert("El evento no es optativo");
          this.messageService.add({
            severity: "warn",
            summary: "Tab Closed",
            detail: "El evento no es optativo",
          });
          return;
        }else{
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

  public funcionReceive(evento) {



    console.log("funcionReceive");
    if (this.eventoExisteEnDia(evento)) {
        evento.revert();
        //alert("El evento ya existe en el dia");
        this.messageService.add({
          severity: "warn",
          summary: "Tab Closed",
          detail: "El evento ya existe en el dia",
        });
        return;
    }
    if (this.eventoRepetido(evento)) {
      /* alert("Evento repetido"); */
      this.messageService.add({
        severity: "warn",
        summary: "Tab Closed",
        detail: "Evento repetido",
      });
      evento.revert();
      return;
    } else {
      if(this.eventoIntercalado(evento)){
//        alert('evento intercalado');
        this.messageService.add({
          severity: "info",
          summary: "Tab Closed",
          detail: "Evento intercalado",
        });
        if(!this.eventoOptativo(evento)){
          evento.revert();
          //alert("El evento no es optativo");
          this.messageService.add({
            severity: "warn",
            summary: "Tab Closed",
            detail: "El evento no es optativo",
          });
          return;
        }else{
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


  public funcionResize(evento: any) {
    ;
    console.log("funcionResize");
    if (this.eventoExisteEnDia(evento)) {

        evento.revert();
        alert("El evento ya existe en el dia");

    }
    if(this.eventoIntercalado(evento)){
      alert('evento intercalado');
      if(!this.eventoOptativo(evento)){
        evento.revert();
        alert("El evento no es optativo");
        return;
      }else{
        alert("Evento optativo");
        return;
      }
    }
  }



  public funcionDragStop(evento: any) {
    ;
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
      if(this.eventoIntercalado(evento)){
        alert('evento intercalado');
        if(!this.eventoOptativo(evento)){
          evento.revert();
          alert("El evento no es optativo");
          return;
        }else{
          alert("Evento optativo");
          return;
        }
      }
    }
  }

  public validarEvento(evento: any) {
    ;
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
      console.log("agregar",calendario.getApi().getEvents());
      calendario.getApi().removeAllEvents();
      this.listBox._options = [];
      this.limpiarCalendario.emit(this.listaEvento);
    }
    else {
      let calendario = this.calendarComponent;
      console.log("cancelar",calendario.getApi().getEvents());
      calendario.getApi().removeAllEvents();
      this.listBox._options = [];
      this.limpiarCalendario.emit(this.listaEvento);

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

  public eventoIntercalado(evento: any){

    let eventos = this.calendarComponent.getApi().getEvents().filter((ev)=>
        (
          ev.start.getDate() == evento.event.start.getDate() &&
          ev.start.getMonth() == evento.event.start.getMonth() &&
          ev.start.getFullYear() == evento.event.start.getFullYear() &&
          ((ev.start <= evento.event.start && ev.end > evento.event.start) || (ev.start < evento.event.end && ev.end >= evento.event.end))
        )
    );

    if(eventos.length > 1){
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
    ;
    this.messageService.add({
      severity: "info",
      summary: "Tab Closed",
      detail: "Index: " + event.index,
    });
  }

  onTabOpen(event) {
    ;
    this.messageService.add({
      severity: "info",
      summary: "Tab Expanded",
      detail: "Index: " + event.index,
    });
  }

  toggle(index: number) {
    ;
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

        ;
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



  openModalDocenteMateriaGrupo(model: any) {
    //GrupoMateriaPlantillaModel
    console.log(model.event.extendedProps);

let fechaInicio: Date = model.event.start;
let fechaFin: Date = model.event.end;


let horaInicio: string = this.obtenerHoraCadena(fechaInicio);
let horaFin: string = this.obtenerHoraCadena(fechaFin);
let dia = fechaFin.getDay();

let mod = new GrupoMateriaDocenteHorarioModel()
mod.relGrupoMateriaPlantillaId = model.event.extendedProps.relGrupoMateriaPlantillaId;
mod.relMateriaPlantillaId = model.event.extendedProps.relMateriaPlantillaId;
mod.horaInicio = horaInicio;
mod.horaFin = horaFin;
mod.dia = dia;

    this.dialog.open(AltaDocenteMateriaGrupoComponent, {
      width: '40%',
      height: '40%',
      autoFocus: false,
      data: { alta: true, grupo: mod },
      disableClose: true
    }).afterClosed().subscribe(result => {

      if(result){
       // this.ngOnInit();
      }
      console.log(result);
    });
  }


  public obtenerHoraCadena(fecha: Date): string{

    let horas = (fecha.getHours() < 10) ? ('0' + fecha.getHours().toString()) : fecha.getHours().toString();
    let minutos = (fecha.getMinutes() < 10) ? ('0' + fecha.getMinutes().toString()) : fecha.getMinutes().toString();
    return (horas + ':' + minutos + ':00')

  }


}
