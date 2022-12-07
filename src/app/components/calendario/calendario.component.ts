import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { Calendar, EventApi } from "@fullcalendar/core";
//import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { ConfirmationService, MessageService, TreeNode } from "primeng/api";

@Component({
  selector: 'vex-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CalendarioComponent implements OnInit {

  @ViewChild("mycalendar_") calendarComponent: FullCalendarComponent;
  //listaEvento = [{id: 1, nombre: "Clase 1", fondo: 'blue', optativa: true, profesor: 'Profe 1'},{id: 2, nombre: "Clase 2", fondo: 'green', profesor: 'Profe 1'},{id: 3, nombre: "Clase 3", fondo: 'brown', profesor: 'Profe 2'}];

  listaEvento: any[] = [
    {
      label: "Profesor 1",
      value: "a",
      items: [
        {
          id: 1,
          label: "UNIDAD DE APRENDIZAJE 1",
          value: "UNIDAD DE APRENDIZAJE 1",
          fondo: "blue",
          optativa: true,
        },
        {
          id: 2,
          label: "UNIDAD DE APRENDIZAJE 2",
          value: "UNIDAD DE APRENDIZAJE 2",
          fondo: "green",
        },
      ],
    },
    {
      label: "Profesor 2",
      value: "a",
      items: [{ id: 3,
        label: "UNIDAD DE APRENDIZAJE 3",
        value: "UNIDAD DE APRENDIZAJE 3",
        fondo: "brown" }],
    },
  ];

  items = [
    {
        label: 'File',
        icon: 'pi pi-pw pi-file',
        items: [{
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {label: 'User', icon: 'pi pi-fw pi-user-plus'},
                    {label: 'Filter', icon: 'pi pi-fw pi-filter'}
                ]
            },
            {label: 'Open', icon: 'pi pi-fw pi-external-link'},
            {separator: true},
            {label: 'Quit', icon: 'pi pi-fw pi-times'}
        ]
    },
    {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
            {label: 'Delete', icon: 'pi pi-fw pi-trash'},
            {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
    },
    {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
            {
                label: 'Contents',
                icon: 'pi pi-pi pi-bars'
            },
            {
                label: 'Search',
                icon: 'pi pi-pi pi-search',
                items: [
                    {
                        label: 'Text',
                        items: [
                            {
                                label: 'Workspace'
                            }
                        ]
                    },
                    {
                        label: 'User',
                        icon: 'pi pi-fw pi-file',
                    }
            ]}
        ]
    },
    {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {label: 'Save', icon: 'pi pi-fw pi-save'},
                    {label: 'Update', icon: 'pi pi-fw pi-save'},
                ]
            },
            {
                label: 'Other',
                icon: 'pi pi-fw pi-tags',
                items: [
                    {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                ]
            }
        ]
    }
];

  events: any[];

  options: CalendarOptions;
  cars: any[] = [{}];

  header: any;
  public calendarOptions: any;
  public misEventos = [];
  activeState: boolean[] = [true, false, false];

  countries: any[];

  selectedCountries: any[];

  files1: TreeNode[];

  files2: TreeNode[];

  files3: TreeNode[];

  files4: TreeNode[];

  files5: TreeNode[];

  selectedNode1: TreeNode;

  selectedNode2: TreeNode;

  selectedNodes1: TreeNode[];

  selectedNodes2: TreeNode[];

  selectedNodes3: TreeNode[];

  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private dialog: MatDialog,) {
    const name = Calendar.name; // add this line in your constructor
  }

  ngOnInit(): void {

    this.cols = [
      { field: "name", header: "Name" },
      /*      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' } */
    ];



    this.options = {
      dayPopoverFormat: { month: 'long', day: 'numeric', year: 'numeric' },
      plugins: [interactionPlugin, timeGridPlugin],
      headerToolbar: {
        left: "",
        center: "",
        right: "",
      },
      locale: "es",
      weekNumbers: true,
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
      slotMaxTime: "18:00:00",
      allDaySlot: false,
      droppable: true,
      editable: true,
      selectable: true,
      slotLabelFormat: {
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: false,
        //meridiem: 'short',
        hour12: true,
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
        //eventClick.event.remove();
        this.confirm(eventClick);
      },
    };
  }


  confirm(evento) {
    console.log("evento click",evento);

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

public obtenerEventos(bol: boolean) {
  if (bol) {
    let calendario = this.calendarComponent;
    console.log("agregar",calendario.getApi().getEvents());
    calendario.getApi().removeAllEvents();
    this.ngAfterViewInit();
    //this.listBox._options = [];
    //this.limpiarCalendario.emit(this.listaEvento);
  }
  else {
    let calendario = this.calendarComponent;
    console.log("cancelar",calendario.getApi().getEvents());
    calendario.getApi().removeAllEvents();
    this.ngOnInit();
    //this.listBox._options = [];
    //this.limpiarCalendario.emit(this.listaEvento);
  }


}

  ngAfterViewInit(): void {
    this.convertirADraggable(this.listaEvento);
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    // this.listaEvento.forEach((y) => {
    //   y.items.forEach((x) => {
    //   let draggableEl = document.getElementById("mydraggable" + x.id);
    //   new Draggable(draggableEl, {
    //     eventData: {
    //       title: x.label,
    //       duration: "01:00",
    //       durationEditable: false,
    //       backgroundColor: x.fondo,
    //       extendedProps: {
    //         optativa: x.optativa ? x.optativa : false,
    //       },
    //     },
    //   });
    // });
    // });

    /* this.listaEvento.forEach((x) => {
      let draggableEl = document.getElementById("mydraggable" + x.id);
      new Draggable(draggableEl, {
        eventData: {
          title: x.nombre,
          duration: "01:00",
          backgroundColor: x.fondo,
          extendedProps: {
            optativa: x.optativa ? x.optativa : false,
          },
        },
      });
    }); */

    /* this.listaEvento.forEach((y) => {
      y.clases.forEach((x) => {
        let draggableEl = document.getElementById("mydraggable" + x.id);

      new Draggable(draggableEl, {
        eventData: {
          title: x.nombre,
          duration: "01:00",
          backgroundColor: x.fondo,
          extendedProps: {
            optativa: x.optativa ? x.optativa : false,
          },
        },
      });
      });

    }); */
  }


  convertirADraggable(obj: any[]){

    obj.forEach((y) => {
      y.items.forEach((x) => {
      let draggableEl = document.getElementById("mydraggable" + x.id);
      new Draggable(draggableEl, {
        eventData: {
          title: x.label,
          duration: "01:00",
          backgroundColor: x.fondo,
          extendedProps: {
            optativa: x.optativa ? x.optativa : false,
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
    ;
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

  // public obtenerEventos() {
  //   let calendario = this.calendarComponent;
  //   //console.log(calendario.getApi());
  //   console.log(calendario.getApi().getEvents());
  // }

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

}
