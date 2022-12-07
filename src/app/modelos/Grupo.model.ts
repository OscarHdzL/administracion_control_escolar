export class GrupoModel {
  id: number;
  grupo: string;
  aforomax: number;
  inclusion: any;
  catDeporteId?: number;
  deporte: string;
  relPlantillaId: number;
  tblPlanestudiosId: number;
  catCicloEscolarId: number;
  catPeriodoId: number;
  catSemestreId: number;
  activo: boolean;


  constructor(){
    this.id = 0;
    this.grupo = null;
    this.aforomax= null
    this.inclusion = new Date()
    this.catDeporteId = null;
    this.deporte = null
    this.relPlantillaId = null;
    this.tblPlanestudiosId = null;
    this.catCicloEscolarId = null;
    this.catPeriodoId = null;
    this.catSemestreId = null;
    this.activo = true;
  }
}


export class RelPlantillaModel {
  id: number;
  catOfertaEducativaId: number;
  tblPlanestudiosId: number;
  catSemestreId: number;
  catPeriodoId: number;
  inclusion: Date;

  constructor(){
    this.id = 0;
    this.catOfertaEducativaId = null;
    this.tblPlanestudiosId= null
    this.catSemestreId = null
    this.catPeriodoId = null;
    this.inclusion = null
  }
}



export class GrupoMateriaPlantillaModel {
  id: number;
  tblGrupoId: number;
  grupo: string;
  aforomax: number;
  catDeporteId: number;
  deporte: string;
  relMateriaPlantillaId: number;
  catMateriaId: number;
  materia: string;
  creditos: string;
  catRamaId: number;
  rama: string;
  inclusion: Date;
  activo: boolean;
  base: boolean;
  relPlantillaId: number;
  relGrupoMateriaPlantillaDocenteId: number;
  nombreDocente: string;
}


export class GrupoMateriaDocenteHorarioModel {
  id: number;
  relGrupoMateriaPlantillaId: number;
  relDocenteMateriaPlantillaId: number;
  estatus: boolean;
  horaInicio: string;
  horaFin: string;
  dia: number;
  inclusion: any;

  //Auxiliar
  relMateriaPlantillaId: number;

  constructor(){
    this.id = 0,
    this.relGrupoMateriaPlantillaId = null;
    this.relDocenteMateriaPlantillaId = null;
    this.estatus = true;
    this.horaInicio = null;
    this.horaFin = null;
    this.dia = null;
    this.inclusion = new Date()
  }
}


export class HorarioDocente {
  id: number;
  relGrupoMateriaPlantillaDocente: number;
  horaInicio: string;
  horaFin: string;
  dia: number;
  inclusion: Date;
  constructor(){
    this.id = 0,
    this.relGrupoMateriaPlantillaDocente = null;
    this.horaInicio = null;
    this.horaFin = null;
    this.dia = null;
    this.inclusion = new Date()
  }
}




export class DocenteMateriaModel {
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


export class HorarioMateriaDocente {
  id: number;
  relGrupoMateriaPlantillaDocente: number;
  relDocenteMateriaPlantillaId: number;
  nombreDocente: string;
  idDocente: number;
  grupoId: number;
  relGrupoMateriaPlantillaId: number;
  relMateriaPlantillaId: number;
  relGrupoMateriaPlantillaDocenteId: number;
  grupo: string;
  materia: string;
  horaInicio: string;
  horaFin: string;
  dia: number;
  inclusion: Date;
}
