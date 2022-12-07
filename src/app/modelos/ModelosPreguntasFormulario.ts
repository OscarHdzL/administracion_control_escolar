  export class TblRespuesta {
    id: number;
    tblPreguntaId: number;
    tblOpcionesPreguntaId?: any;
    respuestaTexto?: any;
    respuestaComplemento?: any;
    respuestaNumero?: any;
    respuestaSiNo?: any;
    tblDatosGeneralesAspiranteId: number;
    inclusion: string;
    activo?: any;
  }


  export class TblOpcionesPregunta {
      id: number;
      tblGrupoOpcionesId: number;
      opcion: string;
      activo: boolean;
      tblGrupoOpciones?: any;
            //AUXILIAR
            checked: boolean
            respuestaObligatoria: boolean
  }

  export class TblGrupoOpciones {
      id: number;
      grupo: string;
      activo: boolean;
      tblOpcionesPregunta: TblOpcionesPregunta[];


  }

  export class TblTipoRespuesta {
      id: number;
      tipoRespuesta: string;
      activo: boolean;
  }


  export class TblPregunta {
      id: number;
      tblFormularioId: number;
      tblTipoRespuestaId: number;
      tblGrupoOpcionesId?: number;
      pregunta: string;
      respuestaObligatoria: boolean;
      preguntaComplemento: string;
      inclusion: string;
      activo: boolean;
      orden: number;
      respuestaComplementoObligatoria: boolean;
      tblFormulario?: any;
      tblGrupoOpciones: TblGrupoOpciones;
      tblTipoRespuesta: TblTipoRespuesta = new TblTipoRespuesta;
      tblRespuesta: TblRespuesta[] = [];
      respuestasAuxiliar: TblRespuesta = new TblRespuesta;
  }




  //RESPUESTAS_FORMULARIO_ASPIRANTE

  export class RespuestasFormularioAspirante{
    respuestas: TblRespuesta[];
    tblDatosGeneralesAspirante: TblDatosGeneralesAspirante;
  }



  export class TblDatosGeneralesAspirante {
    id: number;
    clave: string;
    curp: string;
    rfc: string;
    nombre: string;
    paterno: string;
    materno: string;
    fechaNacimiento: Date;
    tipoSanguineo: string;
    numSeguridadSocial: string;
    ingresoAprox: number;
    catDocumentoNacionalidadId?: any;
    docNacionalidad?: any;
    docSeguridadSocial?: any;
    discapacidad: boolean;
    catDeporteId: number;
    bovedaCatEstadoCivilId: number;
    bovedaCatPaisesIso: string;
    bovedaCatGeneroId: number;
    bovedaCatSeguridadSocialId: number;
    enedsep?: any;
    enedsepdoc?: any;
    catOfertaeducativaId: number;
    numeroPasaporte?: any;
    inclusion: Date;
    catDeporte?: any;
    catDocumentoNacionalidad?: any;
    catOfertaeducativa?: any;
    relPeriodoRegistroAspirantesOferta: any[];
    tblContactos: any[];
    tblDatosAcademicos: any[];
    tblDiscapacidads: any[];
    tblDocumentosAspirantes: any[];
    tblDomicilios: any[];
    tblRespuesta: any[];
}
