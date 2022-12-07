export class Periodo {
  idCicloEscolar: number;
  cicloEscolar: string;
  idPeriodo: number;
  periodo: string;
  inicio: Date;
  fin: Date;
  vigente: boolean;

  constructor(){
    this.idCicloEscolar = 0,
    this.cicloEscolar = null,
    this.idPeriodo = 0;
    this.inicio = new Date(),
    this.fin = new Date(),
    this.vigente = false
  }
}

export class Grupos {
  idPlantilla: number;
  idMateria: number;
  idDocente: number;
  idGrupo: number;
  idGrupoDocente: number;
  idGrupoMateria: number;
  idDocenteMateria: number;
  idCicloEscolar: number;
  idPeriodo: number;
  idSemestre: number;
  materia: string;
  grupo: string;
  aforomax: number;
  tieneasignacion: boolean;
  horarioInicio: string;
  horarioFin: string;
  horasNombramiento: string;
  horasFrentegrupo: string;
  horasDescargaacademica: string;
  nombreDocente: string;
  curp: string;
  categoriaAcademico: string;
  departamento: string;
  perfilAcademico: string;
  periodo: string;
  cicloEscolar: string;
  semestre: string;
}

export class SemestresDocente {
  idSemestre: number;
  semestre: string;
  grupos: Grupos[];
}

export class GruposDocenteModel {
  periodo: Periodo = new Periodo();
  semestresDocente: SemestresDocente[] = [];

}


export class AlumnoCalificacionModel {
  idRelAlumno: number;
  idAlumno: number;
  matricula: string;
  rfc: string;
  idPersonaF: number;
  nombre: string;
  nombreAlumno: string;
  paterno: string;
  materno: string;
  idAlumnoCalificacion: number;
  idGrupoDocente: number;
  primerParcial: number;
  segundoParcial: number;
  tercerParcial: number;
  promedioFinal: number;
  materia: string;
  nombre_docente: string;
}

export class CalificacionesAlumnosDocente {
  idParcialHabilitado: number;
  parcialHabilitado: string;
  alumnos: AlumnoCalificacionModel[];

  constructor(){
    this.idParcialHabilitado = 0,
    this.parcialHabilitado = 'NINGUNO',
    this.alumnos = [];

  }
}

export class CalificacionAlumno{
  id: number;
  relAlumnoId: number;
  relGrupoMateriaPlantillaDocenteId: number;
  primerParcial: number;
  segundoParcial: number;
  tercerParcial: number;
  promedioFinal?: any;
  inclusion: Date;
  constructor(){
    this.id = 0,
    this.relAlumnoId = 0,
    this.relGrupoMateriaPlantillaDocenteId = 0,
    this.primerParcial = 0,
    this.segundoParcial = 0,
    this.tercerParcial = 0,
    this.promedioFinal = 0
    this.inclusion = new Date()
  }
}
