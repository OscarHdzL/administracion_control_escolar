export class PreguntaModel{
    id?: number;
    tbl_Formulario_id?: number;
    tbl_Tipo_Respuesta_id?: number;
    tipoRespuesta?: string;
    tbl_Grupo_Opciones_id?: number;
    pregunta?: string;
    preguntaComplemento?: string;
    respuestaObligatoria?: boolean;
    respuestaComplementoObligatoria?: boolean;
    opciones?: Array<OpcionesPreguntaModel>;
    inclusion?: string;
    activo?: boolean;
    orden?: number;
    respuesta?: RespuestaModel;
    respuestas?: Array<RespuestaModel>;
    preguntaContestada?: boolean;
}

export class RespuestaModel{
    id?: number;
    tbl_Pregunta_id?: number;
    tbl_Opciones_Pregunta_id?: number;
    respuestaTexto?: string;
    respuestaComplemento?: string;
    respuestaNumero?: number;
    respuestaSiNo?: boolean;
    inclusion?: string;
    activo?: boolean
}

export class OpcionesPreguntaModel {
    id?: number;
    tbl_Grupo_Opciones_id?: number;
    opcion?: string;
    activo?:boolean;
    checked?: boolean;
    //auxiliar en la validacion de formulario
    respuestaObligatoria?: boolean;
}


export class CuestionarioAspirante {
    aspirante?: string;
    respuestas?: Array<RespuestaModel>;
}

