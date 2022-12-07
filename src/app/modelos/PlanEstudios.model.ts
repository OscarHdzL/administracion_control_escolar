export class PlanEstudiosModel {
  id?: number;
  inicio?: string;
  fin?: string;
  creditos?: number;
  semestres?: number;
  carrera?: string;
  constructor() {
    this.id = 0;
    this.inicio = '';
    this.fin = '';
    this.creditos = 0;
    this.semestres = 0;
    this.carrera = '';
  }
}
