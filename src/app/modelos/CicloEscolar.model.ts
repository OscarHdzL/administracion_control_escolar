import { PlanEstudiosModel } from "./PlanEstudios.model";

/* export class CicloEscolarModel {
  tblPlanestudio: PlanEstudiosModel;
  id: number;
  inicio: string;
  fin: string;
  catEstatusCicloEscolarId: number;
  inclusion: string;
} */



export interface Semestre {
  id: number;
  semestre: string;
  sigla: string;
  inclusion: Date;
  relOptativaSemestres: any[];
  relPlantillas: any[];
}

export interface CatPeriodo {
  semestre: Semestre[];
  id: number;
  inicio: Date;
  fin: Date;
  vigente: boolean;
  catCicloEscolarId: number;
  inclusion: Date;
  periodo: string;
  catCicloEscolar?: any;
  relAspirantePeriodos: any[];
  relPlantillas: any[];
}

export class CicloEscolarModel {
  //tblPlanestudio: PlanEstudiosModel;
  catPeriodos: CatPeriodo[];
  semestre: Semestre[];
  id: number;
  inicio: string;
  fin: string;
  catEstatusCicloEscolarId: number;
  inclusion: string;
  catEstatusCicloEscolar?: any;
  ciclo: string
}
