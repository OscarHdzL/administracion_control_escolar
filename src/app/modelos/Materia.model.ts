export class MateriaModel {
  id: number;
  materia: string;
  rama: string;
  creditos: number;
  base: string;
}


export class vwMateria {
  idOferta: number;
  ofertaEducativa: string;
  idSemestre: number;
  semestre: string;
  idMateria: number;
  materia: string;
  abreviatura: string;
  catEspaciosAcademicosId: number;
  catRamaId: number;
  status: boolean;
  base: boolean;
  creditos: number;
  idPlanEstudios: number;
  carrera: string;
  semestres: number;
  inicio: Date;
  fin: Date;
  idPlantilla: number;
  relMateriaPlantillaId: number;
}


export class MateriasNoBasebySemestre {
  id: number;
  catDeporteId: number;
  deporte: string;
  catMateriaId: number;
  materia: string;
  creditos: number;
  catRamaId: number;
  rama: string;
  inclusion: Date;
  catSemestreId: number;
  semestre: string;
  relPlantillaId: number;
  relDocenteMateriaNobasePlantillaId: number;
  nombreDocente: string;
  idCicloEscolar: number;
  idPeriodo: number;
}


export class HorarioMateriaNobaseSemestre {
  id: number;
  relDocenteMateriaNobasePlantillaId: number;
  nombreDocente: string;
  idDocente: number;
  relMateriaPlantillaId: number;
  materia: string;
  horaInicio: string;
  horaFin: string;
  dia: number;
  inclusion: Date;
  catSemestreId: number;
  semestre: string;
  catCicloEscolarId: number;
  catPeriodoId: number;
}


export class HorarioDocenteMateriaNoBase {
  id: number;
  relDocenteMateriaNobasePlantillaId: number;
  horaInicio: string;
  horaFin: string;
  dia: number;
  inclusion: Date;
}
