export class PreRegistroSelect {
        accion?: any;
        tblDomicilio?: any;
        tblContactos?: any;
        tblDatosAcademicos?: any;
        tblDiscapacidad?: any;
        tblDocsAspirante?: any;
        tblDocsAspirante_?: any;
        id: number;
        clave?: any;
        curp: string;
        rfc?: any;
        nombre: string;
        paterno: string;
        materno: string;
        fechaNacimiento: Date;
        tipoSanguineo: number;
        numSeguridadSocial: string;
        ingresoAprox: number;
        catDocumentoNacionalidadId?: any;
        docNacionalidad?: any;
        docSeguridadSocial: string;
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
        relDatosGeneralesAspirantePasswords: any[];
        relPeriodoRegistroAspirantesOferta: any[];
        tblDiscapacidads: any[];
        tblDocumentosAspirantes: any[];
        tblDomicilios: any[];
        tblEscalafonAspirantes: any[];
        tblRespuesta: any[];
        nombreCompleto: string
    }


    export class DocumentoAspiranteModel {
      id: number;
      tblDatosGeneralesAspiranteId: number;
      tblDocumentosId: number;
      documento: string;
      catEstatusDocApiranteId: number;
      estatus: string;
      archivo: string;
      observacion: string;
      activo: boolean;
      inclusion: string;
  }


  export class DocumentoAspiranteObservacionModel {
    id: number;
    tblDocumentosAspiranteId: number;
    catestatusdocapirante: number;
    observacion: string;
    archivoHistorico: string;
    inclusion: string;
}

  export class CatalogoEstatusDocumentoAspiranteModel {
    id: number;
    estatus: string;
}


export class tblDocumentosAspirtanteObservaciones{
  id: number;
  tblDocumentosAspiranteId: number;
  documento: string;
  catEstatusDocApirante: number;
  estatusDocApirante: number;
  observacion: string;
  inclusion: string;
  icon: string;
  color: string;
  esUltimoEstatus: boolean;
  mostrarBotonOtroArchivo: boolean;
  archivoHistorico: string;
}

export class tblEscalafonAspirantes {
  id: number;
  tblDatosGeneralesAspiranteId: number;
  tecnicoMet: number;
  conocimientosBd: number;
  ceneval: number;
  examenMedico: boolean;
  examenMedicoDescripcion: string;
  cursoInduccion: boolean;
}

export class Escalafon{
  idEscalafon: number;
  idAspirante: number;
  tecnicoMet: number;
  conocimientosBd: number;
  ceneval: number;
  examenMedico: boolean;
  examenMedicoDescripcion: string;
  cursoInduccion: boolean;
  clave?: any;
  curp: string;
  rfc?: any;
  nombre: string;
  paterno: string;
  materno: string;
  fechaNacimiento: Date;

}
