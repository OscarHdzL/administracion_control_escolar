import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  constructor(

    private serviceToast: ToastrService
    ) {}

//   async agregarFile(archivo: FileList) {
//     let archivoItem = archivo.item(0);
//     let imageAdjunto = new AdjuntoModel();
//     if(archivoItem.type=='image/jpeg' || archivoItem.type == 'image/png' || archivoItem.type == 'image/svg+xml'){
//       imageAdjunto.id = new Date().getTime();
//       imageAdjunto.nombre=archivoItem.name;
//       imageAdjunto.tamanio= archivoItem.size.toString();
//       imageAdjunto.tipo=archivoItem.type;
//       imageAdjunto.file=archivoItem;
//     }else{
//       imageAdjunto = null;
//     }
//     return imageAdjunto;
//   }

  async agregarFiles(archivo: FileList){
    let listaRetorno = [];
    for (let x = 0; x <= archivo.length - 1; x++) {
      const archivoItem = archivo.item(x);
      if(archivoItem.type=='image/jpeg' || archivoItem.type == 'image/png' || archivoItem.type == 'image/svg+xml'){
        listaRetorno.push({
          id: new Date().getTime(),
          nombre: archivoItem.name,
          tamanio: archivoItem.size.toString(),
          tipo: archivoItem.type,
          file: archivoItem,
          token: null
        });
      }
      else{
        this.toastErr("El archivo: " + archivoItem.name + " no se puede adjuntar ya que no es del tipo de archivo permitido") ;
      }
    }
    return listaRetorno;
  }

//   async guardarAdjunto(archivo:AdjuntoModel)
//   {
//     const formData: any = new FormData();
//       formData.append('file', archivo.file);
//       const respuesta = await this.cargaArchivosService.agregar(formData);
//       return respuesta;
//   }

//   getUri(cadenaArchivo:string) {
//     let token=cadenaArchivo;
//     const urlCompleta = this.cargaArchivosService.obtenerArchivo(token);
//     return urlCompleta;
//   }

  getElementoToken(cadenaArchivo,posicionElemento:number){
    if(cadenaArchivo){
      let splitted = cadenaArchivo.split("|", 2);
      return splitted[posicionElemento];
    }
  }

//   encryptMD5(value: any){
//     return Md5.init(value);
//   }

  toastSuccess(value: any){
    this.serviceToast.success(value);
  }
  toastSuccessGuardado(){
    this.serviceToast.success("Exito al guardar los datos!");
  }
  toastInfo(value: any){
    this.serviceToast.info(value);
  }
  toatsWarning(value: any){
    this.serviceToast.warning(value);
  }
  //Err
  toastErr(value: any){
    this.serviceToast.error(value);
  }
  toastErrCatalogo(value: any){
    this.serviceToast.error("Error al cargar el catalogo "+value+".");
  }
  toastErrGuardado(){
    this.serviceToast.error("Error al guardar los datos!");
  }

  fn(numero: number) {
    return numero >= 10
          ? `${numero}`
          : `0${numero}`;
  }
}
