import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
@Injectable({
  providedIn: 'root'
})
export class CatalogosServices extends MainService {

    constructor(public http: HttpClient) {
      super(http);
    }


    //BOVEDA
    consultarPaises() {
      return this.getAsync(this.gatewayCatalogos + 'CatalogosBoveda/Pais');
  }

  consultarNivelAcademico() {
    return this.getAsync(this.gatewayCatalogos + 'CatalogosBoveda/NivelAcademico');
  }

  consultarTipoContratacion() {
    return this.getAsync(this.gatewayCatalogos + 'CatalogosBoveda/TipoContratacion');
  }

  consultarTipoContacto() {
    return this.getAsync(this.gatewayCatalogos + 'CatalogosBoveda/TipoContacto');
  }


  //CATALOGOS
  consultarPerfilAcademico() {
    return this.getAsync(this.gatewayCatalogos + 'api/PerfilAcademico/SelectPerfilAcademico');
}

consultarDepartamentosEned() {
  return this.getAsync(this.gatewayCatalogos + 'Catalogos/DepartamentosEned');
}

consultarCategoriasAcademico() {
  return this.getAsync(this.gatewayCatalogos + 'api/CategoriaAcademico/SelectCategoriaAcademico');
}



consultarUbicacionGeograficaCP(cp: number) {
  return this.getAsync(this.gatewayCatalogos + 'CatalogosBoveda/Ubicacion?codigoPostal=' + cp);
}

consultarUbicacionGeograficaById(idUbicacionGeografica: number) {
  return this.getAsync(this.gatewayCatalogos + 'CatalogosBoveda/UbicacionById?idUbicacionGeografica=' + idUbicacionGeografica);
}




    //ALUMNOS
    consultarCalificacionesAlumnosParcial(idGrupoDocente){
      return this.getAsync(this.gatewayCatalogos + 'api/Alumno/GetCalificacionesAlumnosByIdGrupoDocente?idGrupoDocente='+idGrupoDocente);
    }

    actualizarCalificacionAlumno(objeto) {
      return this.putAsync(this.gatewayCatalogos + 'api/Alumno/ActualizaAlumnoCalificacionParcial', objeto);
    }


    //DOCENTES
    consultarDocentes() {
      return this.getAsync(this.gatewayCatalogos + 'api/Docentes/ListadoDocentes');
  }


  consultarDocentesById(idDocente) {
    return this.getAsync(this.gatewayCatalogos + 'api/Docentes/ListadoDocentesId?id=' + idDocente);
}

  agregarDocente(objeto) {
    return this.postAsync(this.gatewayCatalogos + 'api/Docentes/AltaDocente', objeto);
  }

  actualizarDocente(objeto) {
    return this.putAsync(this.gatewayCatalogos + 'api/Docentes/ActualizacionDocente', objeto);
  }

  eliminarDocente(idDocente: any)
  {
      return this.deleteAsync(this.urlServicioControlEscolar + 'api/Docentes/InhabilitarDocente?idDocente=' + idDocente);
  }

    agregarMateriaDocente(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/Docentes/AgregarMateriaDocente', objeto)
    }

    agregarMateriaNobaseDocente(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/Docentes/AgregarMateriaNoBaseDocente', objeto)
    }


    eliminarMateriaDocente(idMateriaDocente){
      return this.deleteAsync(this.gatewayCatalogos + 'api/Docentes/InhabilitarMateriaDocente?idMateriaDocente=' + idMateriaDocente)
    }

    eliminarMateriaNoBaseDocente(idRelDocenteMateriaNoBasePlantilla){
      return this.deleteAsync(this.gatewayCatalogos + 'api/Docentes/InhabilitarMateriaNoBaseDocente?idRelDocenteMateriaNoBasePlantilla=' + idRelDocenteMateriaNoBasePlantilla)

    }

    validarCURP(curp) {
      return this.getAsync(this.gatewayCatalogos + 'api/Docentes/ValidaCurp/'+ curp);
    }



    consultarGruposDocente(idDocente) {
      return this.getAsync(this.gatewayCatalogos + 'api/Docentes/ListadoGruposDocente?idDocente=' + idDocente);
  }

    //Oferta Educativa
    consultarOfertaEducativa() {
        return this.getAsync(this.gatewayCatalogos + 'api/OfertaEducativa/GetAllOfertaEducativa');
    }
    consultarOfertaEducativaId(id: any) {
        return this.getAsync(this.gatewayCatalogos + 'api/OfertaEducativa/GetOfertaEducativaById?idOfertaEducativa=' + id);
    }
    //Ramas
    consultarRamas(){
      return this.getAsync(this.gatewayCatalogos + 'api/Rama/GetAllRama');
    }
    consultarRamaId(id: any) {
      return this.getAsync(this.gatewayCatalogos + 'api/Rama/GetRamaById?id=' + id);
    }
    agregarRama(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/Rama/AltaSemestre', objeto)
    }
    actualizarRama(objeto: any){
      return this.putAsync(this.gatewayCatalogos + 'api/Rama/ActualizacionSemestre', objeto)
    }
    eliminarRama(id: number){
      return this.deleteAsync(this.gatewayCatalogos + 'api/Rama/DeleteRama?id=' + id)
    }
    //Espacios Academicos
    consultarEspacios(){
      return this.getAsync(this.gatewayCatalogos + 'api/EspaciosAcademicos/GetAllEspaciosAcademicos');
    }
    consultarEspacioId(id: any) {
      return this.getAsync(this.gatewayCatalogos + 'api/EspaciosAcademicos/GetEspaciosAcademicosById?id=' + id);
    }
    agregarEspacio(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/EspaciosAcademicos/AltaEspaciosAcademicos', objeto)
    }
    actualizarEspacio(objeto: any){
      return this.putAsync(this.gatewayCatalogos + 'api/EspaciosAcademicos/ActualizacionEspeciosAcademicos', objeto)
    }
    eliminarEspacio(id: number){
      return this.deleteAsync(this.gatewayCatalogos + 'api/EspaciosAcademicos/DeleteEspeciosAcademicos?id=' + id)
    }
    //Deportes Academicos
    consultarDeportes(){
      return this.getAsync(this.gatewayCatalogos + 'api/Deporte/GetAllDeporte');
    }
    consultarDeporteId(id: any) {
      return this.getAsync(this.gatewayCatalogos + 'api/Deporte/GetDeporteById?id=' + id);
    }
    agregarDeporte(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/Deporte/AltaDeporte', objeto)
    }
    actualizarDeporte(objeto: any){
      return this.putAsync(this.gatewayCatalogos + 'api/Deporte/ActualizacionDeporte', objeto)
    }
    eliminarDeporte(id: number){
      return this.deleteAsync(this.gatewayCatalogos + 'api/Deporte/DeleteDeporte?id=' + id)
    }
    //Materias
    consultarMaterias(){
      return this.getAsync(this.gatewayCatalogos + 'api/Materia/GetAllMateria');
    }
    consultarMateriasNobase(){
      return this.getAsync(this.gatewayCatalogos + 'api/Materia/GetAllMateriaNoBase');
    }

    consultarMateriasNobaseCicloEscolar(){
      return this.getAsync(this.gatewayCatalogos + 'api/Materia/GetAllMateriaNoBaseCicloEscolar');
    }

    agregarMateriaNobaseCicloEscolar(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/Materia/AltaMateriaNobaseCicloEscolar', objeto)
    }


    consultarMateriasByIdDocente(idDocente: number){
      return this.getAsync(this.gatewayCatalogos + 'api/Materia/GetMateriaByIdDocente?idDocente='+ idDocente);
    }

    consultarMateriasNoBaseByIdDocente(idDocente: number){
      return this.getAsync(this.gatewayCatalogos + 'api/Materia/GetMateriaNoBaseByIdDocente?idDocente='+ idDocente);
    }

    consultarTiposMaterias(){
      return this.getAsync(this.gatewayCatalogos + 'Catalogos/TipoMateria');
    }

    consultarEspecialidad(){
      return this.getAsync(this.gatewayCatalogos + 'Catalogos/Deporte');
    }

    agregarMateria(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/Materia/AltaMateria', objeto)
    }
    actualizarMateria(objeto: any){
      return this.putAsync(this.gatewayCatalogos + 'api/Materia/ActualizacionMateria', objeto)
    }
    eliminarMateria(id: number){
      return this.deleteAsync(this.gatewayCatalogos + 'api/Materia/InhabilitarMateria?idMateria=' + id)
    }
    // PLAN ESTUDIOS
    consultarPlanesEstudio(){
      return this.getAsync(this.gatewayCatalogos + 'api/PlanEstudios/GetAllPlanEstudio');
    }
    consultarPlanEstudioId(id: number) {
      return this.getAsync(this.gatewayCatalogos + 'api/PlanEstudios/GetPlanEstudioById?idPlanEstudios=' + id);
    }
    agregarPlanEstudio(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/PlanEstudios/InsertPlanEstudios', objeto);
    }
    actualizarPlanEstudio(objeto: any){
      return this.putAsync(this.gatewayCatalogos + 'api/PlanEstudios/UpdatePlanEstudios', objeto);
    }
    //Ciclos Escolares
    consultarCiclos(){
      //Servicios/api/CicloEscolar/GetAllCicloEsc
      return this.getAsync(this.periodo + 'api/CicloEscolar/GetAllCicloEsc');
    }
    consultarCicloId(id: number) {
      return this.getAsync(this.gatewayCatalogos + 'api/CicloEscolar/GetClicloEscById?id=' + id);
    }
    agregarCiclo(objeto: any){
      return this.postAsync(this.gatewayCatalogos + 'api/CicloEscolar/AltaCicloEsc', objeto)
    }
    actualizarCiclo(objeto: any){
      return this.putAsync(this.gatewayCatalogos + 'api/CicloEscolar/ActualizacionCicloEsc', objeto)
    }
    eliminarCiclo(id: number){
      //return this.deleteAsync(this.gatewayCatalogos + 'api/Materia/InhabilitarMateria?idMateria=' + id)
    }
    //Estatus Ciclos Escolares
    consultarEstatusCiclos(){
      return this.getAsync(this.gatewayCatalogos + 'api/EstatusCicloEscolar/GetAllEstatusCicloEscolar');
    }
    consultarEstatusCicloId(id: number) {
      return this.getAsync(this.periodo + 'api/EstatusCicloEscolar/GetEstatusCicloEscolarById?id=' + id);
    }
    //Grupos
    consultarGruposMaterias() {
      return this.getAsync(this.gatewayCatalogos + 'api/Grupo/GetAllGrupoMateria');
    }

    /* DEPORTE */


    /* CICLO ESCOLAR */

  /*   public consultarCicloEscolarByPlanEstudio(idPlanEstudio)
    {
        return this.getAsync(this.urlServicioControlEscolar + 'api/CicloEscolar/GetCicloPlanEstudios?idPlanEstudios=' + idPlanEstudio);
    } */

    consultarCicloEscolarByPlanEstudioFechas(fechaInicio, fechaFin)
    {
        return this.getAsync(this.urlServicioControlEscolar + 'api/CicloEscolar/GetCicloPlanEstudios?fechaInicio=' + fechaInicio + '&fechaFin=' + fechaFin);
    }


    /* GRUPO */
    consultarGrupos()
    {
        return this.getAsync(this.gatewayCatalogos + 'api/Grupo/GetAllGrupo');
    }

    insertarGrupo(objeto: any)
    {
        return this.postAsync(this.gatewayCatalogos + 'api/Grupo/AgregarGrupo', objeto);
    }

    public editarGrupo(objeto: any)
    {
        return this.postAsync(this.urlServicioControlEscolar + 'api/Grupo/AgregarGrupo', objeto);
    }

    public consultarGrupoById(idGrupo: number)
    {
        return this.getAsync(this.gatewayCatalogos + 'api/Grupo/GetGrupoById' + idGrupo);
    }


    consultarMateriasGrupoById(idGrupo: number)
    {
        return this.getAsync(this.gatewayCatalogos + 'api/Grupo/GetMateriasGrupoById?idGrupo=' + idGrupo);
    }

    consultarHorariosByIdGrupo(idGrupo: number)
    {
        return this.getAsync(this.gatewayCatalogos + 'api/Grupo/GetHorariosByIdGrupo?idGrupo=' + idGrupo);
    }


    consultarMateriasNoBaseByIdPlantilla(idPlantilla: number)
    {
        return this.getAsync(this.gatewayCatalogos + 'api/Materia/GetMateriasNobaseByIdPlantilla?idPlantilla=' + idPlantilla);
    }


    insertarMateriaGrupo(objeto: any)
    {
        return this.postAsync(this.gatewayCatalogos + 'api/Grupo/AgregarMateriaGrupo', objeto);
    }



    public eliminarMateriaGrupo(idMateriaGrupo: any)
    {
        return this.deleteAsync(this.urlServicioControlEscolar + 'api/Grupo/InhabilitarMateriaGrupo?idMateriaGrupo=' + idMateriaGrupo);
    }



    public eliminarGrupo(idGrupo: any)
    {
        return this.deleteAsync(this.urlServicioControlEscolar + 'api/Grupo/InhabilitarGrupo?idGrupo=' + idGrupo);
    }


    /* VALIDA EXISTEN MATERIAS BASE */

    validarMateriasPlantilla(objeto: any)
    {
        return this.postAsync(this.gatewayCatalogos + 'api/Plantilla/ValidarExistenMateriasPlantilla', objeto);
    }



    consultarDocenteMateriaByMateriaPlantillaId(idPlantilla: number)
    {
        return this.getAsync(this.gatewayCatalogos + 'api/Docentes/DocentesMateriaByMateriaPlantillaId?idRelMateriaPlantilla=' + idPlantilla);
    }

    insertarDocenteGrupoMateria(objeto: any)
    {
        return this.postAsync(this.gatewayCatalogos + 'api/Grupo/AgregarGrupoDocente', objeto);
    }

    insertarDocenteGrupoMateriaHorario(objeto: any)
    {
        return this.postAsync(this.gatewayCatalogos + 'api/Grupo/AgregarGrupoDocenteHorario', objeto);
    }

    insertarHorarioDocente(objeto: any)
    {
        return this.postAsync(this.gatewayCatalogos + 'api/Grupo/AgregarHorarioDocente', objeto);
    }

    eliminarHorarioDocente(idGrupoMateriaPlantillaDocente: number)
    {
        return this.deleteAsync(this.gatewayCatalogos + 'api/Grupo/EliminarHorarioDocente?idGrupoMateriaPlantillaDocente=' + idGrupoMateriaPlantillaDocente);
    }


    EliminarHorarioDocente

    eliminarDocenteGrupoMateria(idGrupoDocente: any)
    {
        return this.deleteAsync(this.gatewayCatalogos + 'api/Grupo/InhabilitarGrupoDocente?idGrupoDocente=' + idGrupoDocente);
    }

}
