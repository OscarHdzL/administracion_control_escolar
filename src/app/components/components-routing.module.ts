import { InscripcionNuevoIngresoComponent } from './Operaciones/inscripcion-nuevo-ingreso/inscripcion-nuevo-ingreso.component';
import { PeriodoReinscripcionComponent } from './Operaciones/periodo-reinscripcion/periodo-reinscripcion.component';
import { CalendarioMateriasNobaseComponent } from './Operaciones/calendario-materias-nobase/calendario-materias-nobase.component';
import { ConfiguracionMateriasNobaseCicloEscolarComponent } from './Operaciones/configuracion-materias-nobase/configuracion-materias-nobase-cicloescolar.component';
import { GruposDocenteComponent } from './Docentes/grupos-docente/grupos-docente.component';
import { EscalafonAspiranteComponent } from './Aspirantes/escalafon-aspirante/escalafon-aspirante.component';
import { ValidacionDocumentosPreinscripcionComponent } from './Aspirantes/validacion-documentos-preinscripcion/validacion-documentos-preinscripcion.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaformularioComponent } from './FormularioDinamico/listaformulario/listaformulario.component';
import { ListaopcionesComponent } from './FormularioDinamico/listaopciones/listaopciones.component';
import { CicloEscolarComponent } from './Operaciones/ciclo-escolar/ciclo-escolar.component';
import { DocentesComponent } from './Operaciones/Docentes/docentes.component';
import { RegistroDocentesComponent } from './Operaciones/Docentes/registro-docentes/registro-docentes.component';
import { EspaciosAcademicosComponent } from './Operaciones/espacios-academicos/espacios-academicos.component';
import { MateriaOptativaComponent } from './Operaciones/materia-optativa/materia-optativa.component';
import { MateriaComponent } from './Operaciones/materia/materia.component';
import { OfertaEducativaComponent } from './Operaciones/oferta-educativa/oferta-educativa.component';
import { PlanEstudiosComponent } from './Operaciones/plan-estudios/plan-estudios.component';
import { DataResolverService } from './../servicios/params/data-resolver.service';
import { GrupoComponent } from './Operaciones/grupo/grupo.component';
import { CargaMasivaComponent } from './Carga/carga-masiva/carga-masiva.component';
import { AperturaInscripcionComponent } from './Operaciones/apertura-inscripcion/apertura-inscripcion.component';
import { SeleccionarAspirantesComponent } from './Aspirantes/seleccionar-aspirantes/seleccionar-aspirantes.component';
import { SeleccionarAspirantesPosgradoComponent } from './Aspirantes/seleccionar-aspirantes-posgrado/seleccionar-aspirantes-posgrado.component';
import { RamaComponent } from './Operaciones/rama/rama.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ListaPlanesComponent } from './Operaciones/plan-estudios/lista-planes/lista-planes.component';
import { DeportesEspecialidadComponent } from './Operaciones/deportes-especialidad/deportes-especialidad.component';
import { HorariosComponent } from './Operaciones/horarios/horarios.component';
import { ListaDocentesComponent } from './Operaciones/Docentes/lista-docentes/lista-docentes.component';
import { CalendarioGrupoComponent } from './Operaciones/grupo/calendario-grupo/calendario-grupo.component';
import { MateriaNobaseComponent } from './Operaciones/materia-nobase/materia-nobase.component';
const routes: Routes = [
  {
    path: 'lista-formulario',
    component: ListaformularioComponent,
    data: {
      title: 'lista-formulario'
    }
  },
  {
    path: 'lista-opciones',
    component: ListaopcionesComponent,
    data: {
      title: 'lista-opciones'
    }
  },
  {
    path: 'docentes',
    component: ListaDocentesComponent,
    data: {
      title: 'docentes'
    }
  },
  {
    path: 'registro-docentes',
    component: RegistroDocentesComponent,
    data: {
      title: 'registro-docentes'
    }
  },
  {
    path: 'editar-docentes/:id',
    component: RegistroDocentesComponent,
    data: {
      title: 'registro-docentes'
    },
    resolve: {
      docente: DataResolverService
    }
  },
  {
    path: 'asignatura/base',
    component: MateriaComponent,
    data: {
      title: 'asignatura'
    }
  },
  {
    path: 'asignatura/no-base',
    component: MateriaNobaseComponent,
    data: {
      title: 'asignatura-no-base'
    }
  },
  {
    path: 'espacios-academicos',
    component: EspaciosAcademicosComponent,
    data: {
      title: 'espacios-academicos'
    }
  },
  {
    path: 'ciclo-escolar',
    component: CicloEscolarComponent,
    data: {
      title: 'ciclo-escola'
    }
  },
  {
    path: 'oferta-educativa',
    component: OfertaEducativaComponent,
    data: {
      title: 'oferta-educativa'
    }
  },
  {
    path: 'plan-estudios',
    component: ListaPlanesComponent,
    data: {
      title: 'plan-estudios'
    }
  },
  {
    path: 'grupos',
    component: GrupoComponent,
    data: {
      title: 'grupos'
    }
  },
  {
    path: 'masiva',
    component: CargaMasivaComponent,
    data: {
      title: 'masiva'
    }
  },
  {
    path: 'apertura-inscripcion',
    component: AperturaInscripcionComponent,
    data: {
      title: 'apertura-inscripcion'
    }
  },
  {
    path: 'validacion-documentos-preinscripcion',
    component: ValidacionDocumentosPreinscripcionComponent,
    data: {
      title: 'validacion-documentos-preinscripcion'
    }
  },
  {
    path: 'seleccionar-aspirantes',
    component: SeleccionarAspirantesComponent,
    data: {
      title: 'seleccionar-aspirantes'
    }
  },
  {
    path: 'seleccionar-aspirantes-posgrado',
    component: SeleccionarAspirantesPosgradoComponent,
    data: {
      title: 'seleccionar-aspirantes-posgrado'
    }
  }
  ,
  {
    path: 'rama',
    component: RamaComponent,
    data: {
      title: 'rama'
    }
  },
  {
    path: 'escalafon-aspirantes',
    component: EscalafonAspiranteComponent,
    data: {
      title: 'escalafon-aspirantes'
    }
  },
  {
    path: 'calendario',
    component: CalendarioComponent,
    data: {
      title: 'calendario'
    }
  },
  {
    path: 'deportes-especialidad',
    component: DeportesEspecialidadComponent,
    data: {
      title: 'escalafon-aspirantes'
    }
  },
  {
    path: 'horarios',
    component: HorariosComponent,
    data: {
      title: 'horarios'
    }
  },
  {
    path: 'calendario-grupo/:id',
    component: CalendarioGrupoComponent,
    data: {
      title: 'calendario-grupo'
    }
  },
  {
    path: 'grupos-docente',
    component: GruposDocenteComponent,
    data: {
      title: 'calendario-grupo'
    }
  },
  {
    path: 'configuracion-materias-no-base',
    component: ConfiguracionMateriasNobaseCicloEscolarComponent,
    data: {
      title: 'configuracion-materias-no-base'
    }
  },
  {
    path: 'calendario-materias-no-base',
    component: CalendarioMateriasNobaseComponent,
    data: {
      title: 'calendario-materias-no-base'
    }
  }
  ,
  {
    path: 'periodo-reinscripcion',
    component: PeriodoReinscripcionComponent,
    data: {
      title: 'periodo_reinscripcion'
    }
  },
  {
    path: 'incripcion-nuevo-ingreso',
    component: InscripcionNuevoIngresoComponent,
    data: {
      title: 'incripcion-nuevo-ingreso'
    }
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
