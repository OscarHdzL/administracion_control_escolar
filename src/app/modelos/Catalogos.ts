export class TipoMateria {
  id: number;
  tipoMateria: string;
  inclusion: Date;
  catMateria: any[];
}

export class CicloEscolar{
    id?: number;
    fechaInicio?: Date;
    fechaFin?: Date;
    inicio?: string;
    fin?: string;
    catEstatusCicloEscolarId?: number;
    estatus?: string;
}
export class PeriodoEscolar{
    id?: number;
    fechaInicio?: string;
    fechaFin?: string;
    estatus?: any;
}
export class Periodo{
  id?: number;
  inicio?: string;
  fin?: string;
  vigente?: boolean;
  catCicloEscolarId?: number;
  periodo?: any;
  estatus?:any;
  tblGrupos?:any;
}
export class Espacio{
    id?: number;
    espacio?: string;
}
export class Deporte{
    id?: number;
    deporte?: string;
    activo?: Boolean;
}
export class Rama{
    id?: number;
    rama?: string;
    activo?: Boolean;
}
export class Materia {
    idMateria?: number;
    materia?: string;
    abreviatura?: string;
    catEspaciosAcademicosId?: number;
    catRamaId?: number;
    status?: boolean;
    base?: boolean;
    estatus?: string;
    espacio?: string;
    rama?: string;
    creditos?: number;
    idSemestre?: number;
    idOferta?: number;
    idPlanEstudio?: number;
    semestre?: string;
    catTipoMateriaId?: number;
    catDeporteId?: number;

}
export class Oferta {
    id?: number;
    semestre?: string;
    sigla?: string;
}
export class AperturaInscripcion{
    id?: number;
    nombre?: string;
    fechaInicio?: string;
    fechaFin?: string;
    idOferta?: number;
    oferta?: string;
}
export class PlanEstudioSelect {
    id: number;
    periodo: string;
    carrera: string;
    inicio: Date;
    fin: Date;
    creditos: number;
    semestres: number;
    inclusion: Date;
    relPlantillas: any[];
}
export class GrupoMaterias{
    id?: number;
    grupo?: string;
    aforomax?: number;
    materias?: Array<MateriaGrupo>;
}
export class MateriaGrupo{
    idMateria?: number;
    materia?: string;
    base?: boolean;
    creditos?: number;
    relMateriaPlantillaId?: number;
    nombreDocente?: string;
    relGrupoMateriaPlantillaId?: number;
    relGrupoMateriaPlantillaDocenteId?: number;
    grupo?: string;
}


export class PaisModel {
  id: number;
  iso: string;
  nombre: string;
}

export class UbicacionGeograficaModel {
  id: number;
  catEstadoId: number;
  codigoPostal: string;
  colonia: string;
  municipio: string;
  estado: string;
  ciudad: string;
  inclusion: Date;
  catEstado?: any;
  catPersonafisicas: any[];
  tblFisicaSolicituds: any[];
  tblOrganismos: any[];
  tblOrganismosSolicituds: any[];
}

export class DatosPersonaFisicaCURPModel {
  idPersona: number;
  paterno: string;
  materno: string;
  nombre: string;
  curp: string;
  fechaNacimiento: string;
  fechaRegistro: string;
  fechaModificacion: string;
  activo: number;
  idEscolaridad?: any;
  idEstatusEscolaridad?: any;
  calle?: any;
  numExt?: any;
  numInt?: any;
  idGenero: number;
  extranjero: boolean;
  tipoIdentificacion?: any;
  numeroIdentificacion?: any;
  catUbicaciongeograficaId?: any;
  tblOrganismosId?: any;
  tokenFoto?: any;
  comentarioInactivo?: any;
  colonia?: any;
  fm3?: any;
  noPasaporte?: any;
  tblPaisId?: any;
  tblEquipoMultidiciplinarioId?: any;
  catUbicaciongeografica?: any;
  relPersonasFisicas: any[];
  tblClavealfaPersonafisicas: any[];
  tblPersonafisicaDocumentos: any[];
  correo? :string;

  constructor(){
  this.idPersona= 0;
  this.paterno= null;
  this.materno= null;
  this.nombre= null;
  this.curp= null;
  this.fechaNacimiento= null;
  this.fechaRegistro= null;
  this.fechaModificacion= null;
  this.activo= 1;
  this.idEscolaridad =  null;
  this.idEstatusEscolaridad =  null;
  this.calle =  null;
  this.numExt =  null;
  this.numInt =  null;
  this.idGenero= null; // 1 Hombre, 2 Mujer
  this.extranjero= false;
  this.tipoIdentificacion =  null;
  this.numeroIdentificacion =  null;
  this.catUbicaciongeograficaId =  null;
  this.tblOrganismosId =  null;
  this.tokenFoto =  null;
  this.comentarioInactivo =  null;
  this.colonia =  null;
  this.fm3 =  null;
  this.noPasaporte =  null;
  this.tblPaisId =  null;
  this.tblEquipoMultidiciplinarioId =  null;
  this.catUbicaciongeografica =  null;
  this.relPersonasFisicas= null;
  this.tblClavealfaPersonafisicas= null;
  this.tblPersonafisicaDocumentos= null;
  this.correo=null;
  }

}

export class TipoContacto {
  id: number;
  tipo: string;
  tipoContacto: string;
}

export class CategoriaAcademico {
  id: number;
  categoriaAcademico: string;
  descripcion?: any;
  inclusion: Date;
  relDocentes: any[];
}

export class DepartamentoEned {
  id: number;
  departamento: string;
  descripcion?: any;
  inclusion: Date;
  relDocentes: any[];
}

export class PerfilAcademico {
  id: number;
  perfilAcademico: string;
  descripcion?: any;
  inclusion: Date;
  relDocentes: any[];
}

export class TipoContratacion {
  id: number;
  tipoContratacion: string;
  descripcion?: any;
  inclusion: Date;
}

export class NivelAcademico {
  id: number;
  nivelAcademico: string;
  descripcion: string;
  inclusion: Date;
}



export class RelDocenteComplex {
  id: number;
  bovedaCatPersonafisicaId: number;
  catEstatusDocentesId: number;
  catDocentesContactoId: number;
  catCategoriaAcademicoId: number;
  catDepartamentoEnedId: number;
  catPerfilAcademicoId: number;
  bovedaCatTipoContratacionId: number;
  bovedaCatNivelAcademicoId: number;
  tieneasignacion: boolean;
  horarioInicio: string;
  horarioFin: string;
  horasNombramiento: string;
  horasFrentegrupo: string;
  horasDescargaacademica: string;
  relContactosDocente: RelContactoDocente[]

  constructor(){
    this.id= 0;
    this.bovedaCatPersonafisicaId= 0;
    this.catEstatusDocentesId= 0;
    this.catDocentesContactoId= 0;
    this.catCategoriaAcademicoId= 0;
    this.catDepartamentoEnedId= 0;
    this.catPerfilAcademicoId= 0;
    this.bovedaCatTipoContratacionId= 0;
    this.bovedaCatNivelAcademicoId= 0;
    this.tieneasignacion = false;
    this.horarioInicio= null;
    this.horarioFin= null;
    this.horasNombramiento= null;
    this.horasFrentegrupo= null;
    this.horasDescargaacademica= null;
    this.relContactosDocente = []
  }
}

export class CndBoveda {
  idPersona: number;
  paterno: string;
  materno: string;
  nombre: string;
  curp: string;
  fechaNacimiento: string;
  fechaRegistro: any;
  fechaModificacion: any;
  activo: number;
  idEscolaridad: number;
  idEstatusEscolaridad: number;
  calle: string;
  numExt: string;
  numInt: string;
  idGenero: number;
  extranjero: boolean;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  catUbicaciongeograficaId: number;
  tblOrganismosId: number;
  tokenFoto?: any;
  comentarioInactivo?: any;
  colonia: string;
  fm3?: any;
  noPasaporte?: any;
  tblPaisId: number;
  tblEquipoMultidiciplinarioId: number;
  correo?:string;
  password?:string;

  constructor(){

    this.idPersona= 0;
    this.paterno= null;
    this.materno= null;
    this.nombre= null;
    this.curp= null;
    this.fechaNacimiento= null;
    this.fechaRegistro= null;
    this.fechaModificacion= null;
    this.activo= 0;
    this.idEscolaridad= 0;
    this.idEstatusEscolaridad= 0;
    this.calle= null;
    this.numExt= null;
    this.numInt= null;
    this.idGenero= 0;
    this.extranjero= false;
    this.tipoIdentificacion= null;
    this.numeroIdentificacion= null;
    this.catUbicaciongeograficaId= 0;
    this.tblOrganismosId= 0;
    this.tokenFoto= null;
    this.comentarioInactivo= null;
    this.colonia= null;
    this.fm3= null;
    this.noPasaporte= null;
    this.tblPaisId= 0;
    this.tblEquipoMultidiciplinarioId= 0;
    this.correo=null;
    this.password=null;

  }
}
export class AltaDocenteModel {
  controlEscolar: RelDocenteComplex = new RelDocenteComplex();
  cndBoveda: CndBoveda = new CndBoveda()
}


export class RelDocente {
  id: number;
  personafisicaId: number;
  nombre: string;
  materno: string;
  paterno: string;
  curp: string;
  estatusdocenteId: number;
  estatus: string;
  docentecontactoId: number;
  contacto: string;
  categoriaacademicoId: number;
  categoriaAcademico: string;
  descripcionCategoria?: any;
  deptoenedId: number;
  departamento: string;
  perfilacademicoId: number;
  descripcionPerfil?: any;
  tipocontratacionId: number;
  descripcionTipocontratacion?: any;
  nivelacademicoId: number;
  descripcionNivel: string;
  tieneasignacion: boolean;
  horarioInicio: string;
  horarioFin: string;
  horasNombramiento: string;
  horasFrentegrupo: string;
  horasDescargaacademica: string;
  relContactosDocente: RelContactoDocente[] = []
  correo?:string;
}


export class RelContactoDocente {
  id: number;
  relDocenteId: number;
  bovedaCatTipoContactoId: number;
  contacto: string;
  tipo: string;
  inclusion: Date;

  constructor(){
    this.id = 0;
    this.relDocenteId = 0;
    this.bovedaCatTipoContactoId = null;
    this.tipo = null;
    this.contacto = null;
    this.inclusion = new Date();
  }
}


export class MateriaNoBaseCicloEscolar {
  idOferta: number;
  ofertaEducativa: string;
  idSemestre: number;
  semestre: string;
  idMateriaNoBaseCicloEscolar: number;
  idMateria: number;
  materia: string;
  abreviatura: string;
  catEspaciosAcademicosId: number;
  catRamaId: number;
  status: boolean;
  creditos: number;
  idPlanEstudios: number;
  carrera: string;
  semestres: number;
  inicio: Date;
  fin: Date;
  idPlantilla: number;
  relMateriaPlantillaId: number;
  catTipoMateriaId: number;
  tipoMateria: string;
  catDeporteId: number;
  especialidad: string;
  catCicloEscolarId: number;
  catPeriodoId: number;
}


export class RelMateriasNobaseCicloEscolar {
  id: number;
  relMateriaPlantillaId: number;
  catCicloEscolarId: number;
  inclusion: Date;
  catPeriodoId: number;
  constructor(){
    this.id = 0,
    this.relMateriaPlantillaId = 0,
    this.catCicloEscolarId = 0,
    this.inclusion = new Date(),
    this.catPeriodoId = 0
  }
}
