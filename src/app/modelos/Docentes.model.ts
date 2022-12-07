export class DocentesModel {
  /* id: number;
  curp: string;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  calle: string;
  noExterior: string;
  noInterior: string;
  colonia: string;
  idPais: number;
  pais?: string;
  idEstado: number;
  estado?: string;
  idMunicipio: number;
  municipio?: string;
  cp: string;
  listaTelefonos: TipoTelefonoModel[];
  turno: string;

  idCategoria: number;
  categoria?: string;
  idTipoContratacion: number;
  tipoContratacion?: string;
  idNivelAcademico: number;
  nivelAcademico?: string;
  tieneAsignacion: boolean;
  idPerfilAcademico: number;
  perfilAcademico?: string;
  idDepartamento: number;
  departamento?: string;

  horaInicio: string;
  horafin: string;
  horasNombramiento: number;
  horasFrenteGrupo: number;
  horasDescarga: number;

  constructor() {
    this.listaTelefonos = [];
  } */


  relContactosDocente: any[];
  id: number;
  personafisicaId: number;
  nombreDocente: string;
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
}

export class TipoTelefonoModel {
  idTipo: number;
  tipo?: string;
  numero: number;
}



export class MateriaDocenteModel {
  idPlantilla: number;
  idRelMateriaPlantilla: number;
  idMateria: number;
  materia: string;
  base: boolean;
  creditos: number;
  status: boolean;
  idRelDocenteMateriaPlantilla: number;
  idDocente: number;
  tieneasignacion: boolean;
  horarioInicio: string;
  horarioFin: string;
  horasNombramiento: string;
  horasFrentegrupo: string;
  horasDescargaacademica: string;
  nombre: string;
  paterno: string;
  materno: string;
  curp: string;
  activo: number;
  idEscolaridad: number;
  extranjero: boolean;
  estatus: string;
  categoriaAcademico: string;
  departamento: string;
  perfilAcademico: string;
}


export class RelDocenteMateriaPlantilla {
  id: number;
  relDocenteId: number;
  relMateriaPlantillaId: number;
  estatus: boolean ;
  inclusion: Date;

  constructor(){
    this.id = 0;
    this.relDocenteId = null;
    this.relMateriaPlantillaId = null;
    this.estatus = true;
    this.inclusion = new Date();
  }
}
