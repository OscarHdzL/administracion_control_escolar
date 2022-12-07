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
