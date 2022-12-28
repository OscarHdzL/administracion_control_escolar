import { ModalPeriodoComponent } from './Operaciones/ciclo-escolar/modal-periodo/modal-periodo.component';
import { MateriasNobaseDocenteComponent } from './Operaciones/Docentes/materias-nobase-docente/materias-nobase-docente.component';
import { AgregarMateriaNobaseCicloescolarComponent } from './Operaciones/configuracion-materias-nobase/agregar-materia-nobase-cicloescolar/agregar-materia-nobase-cicloescolar.component';
import { ConfiguracionMateriasNobaseCicloEscolarComponent } from './Operaciones/configuracion-materias-nobase/configuracion-materias-nobase-cicloescolar.component';
import { MateriaNobaseComponent } from './Operaciones/materia-nobase/materia-nobase.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { GruposDocenteComponent } from './Docentes/grupos-docente/grupos-docente.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ListaopcionesComponent } from './FormularioDinamico/listaopciones/listaopciones.component';
import { ListaformularioComponent } from './FormularioDinamico/listaformulario/listaformulario.component';
import { ModallistaopcionesComponent } from './FormularioDinamico/listaopciones/modallistaopciones/modallistaopciones.component';
import { ModallistaformularioComponent } from './FormularioDinamico/listaformulario/modallistaformulario/modallistaformulario.component';
import { ModallistapreguntasComponent } from './FormularioDinamico/listaformulario/modallistapreguntas/modallistapreguntas.component';
import { ModalpreguntaComponent } from './FormularioDinamico/listaformulario/modalpregunta/modalpregunta.component';

import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegistroDocentesComponent } from './Operaciones/Docentes/registro-docentes/registro-docentes.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from "@angular/material/form-field";
import { PlanEstudiosComponent } from './Operaciones/plan-estudios/plan-estudios.component';
import { AltaPlanComponent } from './Operaciones/plan-estudios/alta-plan/alta-plan.component';
import { ListaPlanesComponent } from './Operaciones/plan-estudios/lista-planes/lista-planes.component';
import { MateriaComponent } from './Operaciones/materia/materia.component';
import { ModalMateriaComponent } from './Operaciones/materia/modal-materia/modal-materia.component';
import { MateriaOptativaComponent } from './Operaciones/materia-optativa/materia-optativa.component';
import { ModalMateriaOptativaComponent } from './Operaciones/materia-optativa/modal-materia-optativa/modal-materia-optativa.component';
import { OfertaEducativaComponent } from './Operaciones/oferta-educativa/oferta-educativa.component';
import { ModalOfertaEducativaComponent } from './Operaciones/oferta-educativa/modal-oferta-educativa/modal-oferta-educativa.component';
import { EspaciosAcademicosComponent } from './Operaciones/espacios-academicos/espacios-academicos.component';
import { ModalEspaciosAcademicosComponent } from './Operaciones/espacios-academicos/modal-espacios-academicos/modal-espacios-academicos.component';
import { CicloEscolarComponent } from './Operaciones/ciclo-escolar/ciclo-escolar.component';
import { ModalCicloEscolarComponent } from './Operaciones/ciclo-escolar/modal-ciclo-escolar/modal-ciclo-escolar.component';
import { ModalConfigurarPeriodoEscolarComponent } from './Operaciones/ciclo-escolar/modal-configurar-periodo-escolar/modal-configurar-periodo-escolar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ListaDocentesComponent } from './Operaciones/Docentes/lista-docentes/lista-docentes.component';
import { DocentesComponent } from './Operaciones/Docentes/docentes.component';
import { GrupoComponent } from './Operaciones/grupo/grupo.component';
import { AltaGrupoComponent } from './Operaciones/grupo/alta-grupo/alta-grupo.component';
import { ListaGrupoComponent } from './Operaciones/grupo/lista-grupo/lista-grupo.component';
import { ValidacionDocumentosPreinscripcionComponent } from './Aspirantes/validacion-documentos-preinscripcion/validacion-documentos-preinscripcion.component';
import { ListaAspirantesComponent } from './Aspirantes/validacion-documentos-preinscripcion/lista-aspirantes/lista-aspirantes.component';
import { ListaDocumentosAspiranteComponent } from './Aspirantes/validacion-documentos-preinscripcion/lista-documentos-aspirante/lista-documentos-aspirante.component';
import { ValidacionDocumentoComponent } from './Aspirantes/validacion-documentos-preinscripcion/validacion-documento/validacion-documento.component';
import { HistorialValidacionComponent } from './Aspirantes/validacion-documentos-preinscripcion/historial-validacion/historial-validacion.component';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import { CargaMasivaComponent } from './Carga/carga-masiva/carga-masiva.component';
import { FileDragNDropDirective } from '../Directive/file-drag-n-drop.directive';
import { AperturaInscripcionComponent } from './Operaciones/apertura-inscripcion/apertura-inscripcion.component';
import { ModalAperturaInscripcionComponent } from './Operaciones/apertura-inscripcion/modal-apertura-inscripcion/modal-apertura-inscripcion.component';
import { SeleccionarAspirantesComponent } from './Aspirantes/seleccionar-aspirantes/seleccionar-aspirantes.component';
import { SeleccionarAspirantesPosgradoComponent } from './Aspirantes/seleccionar-aspirantes-posgrado/seleccionar-aspirantes-posgrado.component';
import { RamaComponent } from './Operaciones/rama/rama.component';
import { ModalRamaComponent } from './Operaciones/rama/modal-rama/modal-rama.component'
import { EscalafonAspiranteComponent } from './Aspirantes/escalafon-aspirante/escalafon-aspirante.component';
import { ListaAspiranteEscalafonComponent } from './Aspirantes/escalafon-aspirante/lista-aspirante-escalafon/lista-aspirante-escalafon.component';
import { ProcesoAdmisionComponent } from './Aspirantes/escalafon-aspirante/proceso-admision/proceso-admision.component';
import { CalendarioComponent } from './calendario/calendario.component'

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {ListboxModule} from 'primeng/listbox';
import {ConfirmationService, MessageService} from 'primeng/api';
import { DeportesEspecialidadComponent } from './Operaciones/deportes-especialidad/deportes-especialidad.component';
import { ModalDeportesEspecialidadComponent } from './Operaciones/deportes-especialidad/modal-deportes-especialidad/modal-deportes-especialidad.component'
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { AltaMateriasGrupoComponent } from './Operaciones/grupo/alta-materias-grupo/alta-materias-grupo.component';
import { HorariosComponent } from './Operaciones/horarios/horarios.component';
import { CalendarioHorarioComponent } from './Operaciones/horarios/calendario-horario/calendario-horario.component';
import { AltaDocenteMateriaGrupoComponent } from './Operaciones/grupo/alta-materias-grupo/alta-docente-materia-grupo/alta-docente-materia-grupo.component';
import { CalendarioGrupoComponent } from './Operaciones/grupo/calendario-grupo/calendario-grupo.component';
import {DialogModule} from 'primeng/dialog';
import { MateriasDocenteComponent } from './Operaciones/Docentes/materias-docente/materias-docente.component';
import { CalificacionesAlumnosComponent } from './Docentes/calificaciones-alumnos/calificaciones-alumnos.component';
import { NgxMaskModule } from 'ngx-mask-2';
import { ModalParcialesPeriodoComponent } from './Operaciones/ciclo-escolar/modal-parciales-periodo/modal-parciales-periodo.component';
import { ModalMateriaNobaseComponent } from './Operaciones/materia-nobase/modal-materia-nobase/modal-materia-nobase.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ".",
  precision: 2,
  prefix: "$ ",
  suffix: "",
  thousands: ","
};


@NgModule({
  declarations: [
    ListaopcionesComponent,
    ListaformularioComponent,
    ModallistaopcionesComponent,
    ModallistaformularioComponent,
    ModallistapreguntasComponent,
    ModalpreguntaComponent,
    RegistroDocentesComponent,
    PlanEstudiosComponent,
    AltaPlanComponent,
    ListaPlanesComponent,
    MateriaComponent,
    ModalMateriaComponent,
    MateriaOptativaComponent,
    ModalMateriaOptativaComponent,
    OfertaEducativaComponent,
    ModalOfertaEducativaComponent,
    ModalEspaciosAcademicosComponent,
    EspaciosAcademicosComponent,
    CicloEscolarComponent,
    ModalCicloEscolarComponent,
    ModalConfigurarPeriodoEscolarComponent,
    ListaDocentesComponent,
    DocentesComponent,
    GrupoComponent,
    AltaGrupoComponent,
    ListaGrupoComponent,
    ValidacionDocumentosPreinscripcionComponent,
    ListaAspirantesComponent,
    ListaDocumentosAspiranteComponent,
    ValidacionDocumentoComponent,
    HistorialValidacionComponent,
    CargaMasivaComponent,
    FileDragNDropDirective,
    AperturaInscripcionComponent,
    ModalAperturaInscripcionComponent,
    SeleccionarAspirantesComponent,
    SeleccionarAspirantesPosgradoComponent,
    RamaComponent,
    ModalRamaComponent,
    EscalafonAspiranteComponent,
    ListaAspiranteEscalafonComponent,
    ProcesoAdmisionComponent,
    CalendarioComponent,
    AltaMateriasGrupoComponent,
    DeportesEspecialidadComponent,
    ModalDeportesEspecialidadComponent,
    HorariosComponent,
    CalendarioHorarioComponent,
    AltaDocenteMateriaGrupoComponent,
    CalendarioGrupoComponent,
    MateriasDocenteComponent,
    GruposDocenteComponent,
    CalificacionesAlumnosComponent,
    MateriasDocenteComponent,
    ModalParcialesPeriodoComponent,
    MateriaNobaseComponent,
    ModalMateriaNobaseComponent,
    ConfiguracionMateriasNobaseCicloEscolarComponent,
    AgregarMateriaNobaseCicloescolarComponent,
    MateriasNobaseDocenteComponent,
    ModalPeriodoComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    PageLayoutModule,
    BreadcrumbsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule,
    MatRadioModule,
    MatGridListModule,
    MatToolbarModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    FullCalendarModule,
    ToastModule,
    ConfirmPopupModule,
    ListboxModule,
    DialogModule,
    TableModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ],
  providers: [{
    provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig
  }]
})
export class ComponentsModule { }
