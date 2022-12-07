export interface RespuestaModel {
  estado:boolean;
  EXITO: boolean;
  Object:any;
  MENSAJE: string;
  RESPUESTA: any;
  respuesta:any;
  exito: boolean;
}

/*
export interface RespuestaModel {
  EXITO: boolean;
  estado:boolean;
  respuesta:any;
  Object:any;
  mensaje:string;
  MENSAJE: string;
  RESPUESTA: any;
  exito: boolean;
  objeto:any;
}
*/
export interface IRespuestaConsulta {
  response: Array<any>;
  success: boolean;
  status: number;
  currentException: any;
}

export class formularioOpciones{
  id?: number;
  grupo?: string;
  activo?: boolean;
  tblOpcionesPregunta?: [
    {
      id?: number;
      activo?: boolean;
      opcion?: string;
      tblGrupoOpciones?: any;
      tblGrupoOpcionesId?: number
    }
  ]
}
export class listaOpciones{
  id?: number;
  activo?: boolean;
  opcion?: string;
  tblGrupoOpciones?: any;
  tblGrupoOpcionesId?: number
}

export class Formulario{
    id?: number;
    formulario?: string;
    inclusion?:string;
    activo?:boolean;
    catOfertaeducativaId?: number;
    descripcion?:string;
}

export class Preguntas{
    id?: number;
    tblFormularioId?: number;
    tblTipoRespuestaId?:number;
    tblGrupoOpcionesId?: number;
    pregunta?: string;
    respuestaObligatoria?: boolean;
    preguntaComplemento?: string;
    inclusion?: Date;
    activo?: boolean;
    orden?: number;
    respuestaComplementoObligatoria?: boolean;

}


export class TipoRespuesta{
  id?: number;
  TipoRespuesta?: string;
  activo?:boolean;
  tieneComplemento?:boolean;
}

export class ArchivoAspirante{
  id?: number;
  fecha?: any;
  nombre?: string;
  name?: string;
  tamanio?: string;
  tipo?: string;
  activo?: boolean;
  file?: any;
  token?: string;
}