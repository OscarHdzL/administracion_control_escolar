import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {PrimeIcons} from 'primeng/api';
import { DocumentoAspiranteModel, tblDocumentosAspirtanteObservaciones } from 'src/app/modelos/PreregistroModel';

import { ArchivoServices } from 'src/app/servicios/archivos.service';
import { PreregistroAspiranteService } from 'src/app/servicios/preregistro-aspirante.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';


@Component({
  selector: 'vex-historial-validacion',
  templateUrl: './historial-validacion.component.html',
  styleUrls: ['./historial-validacion.component.scss']
})
export class HistorialValidacionComponent implements OnInit {


  listaObservacionesDocumento: tblDocumentosAspirtanteObservaciones[];

  events1 = [
    {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
    {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
    {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
    {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'},
    {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
    {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
    {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
    {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
  ];

   constructor(
     @Inject(MAT_DIALOG_DATA) public dataInput: DocumentoAspiranteModel,
     private dialog: MatDialog,
     private swalService: SwalServices,
     private toastService: VariablesService,
     public matPaginatorIntl: MatPaginatorIntl,
     private preregistroService: PreregistroAspiranteService,
     private cargaArchivosService: ArchivoServices,
   ) {

    console.log('this.dataInput');
    console.log(this.dataInput);
   }

   public async ngOnInit() {
    await this.obtenerObservacionesDocumento();
   }



   public async obtenerObservacionesDocumento() {

    const respuesta =
      await this.preregistroService.obtenerObservacionesDocumento(
        this.dataInput.id
      );
    respuesta.exito
      ? (this.listaObservacionesDocumento = respuesta.objeto)
      : (this.listaObservacionesDocumento = []);

      console.log(this.listaObservacionesDocumento);

      let ultimo = this.listaObservacionesDocumento[(this.listaObservacionesDocumento.length - 1)];


      this.listaObservacionesDocumento.forEach((x)=>{




        if(ultimo.id === x.id){

          if(x.estatusDocApirante.toString().toLowerCase() === 'aceptado' ||
          x.estatusDocApirante.toString().toLowerCase() === 'en validación'
          ){
            x.esUltimoEstatus = false;
            x.mostrarBotonOtroArchivo = false;
          }else{
            x.esUltimoEstatus = true;
            x.mostrarBotonOtroArchivo = true;
          }

        }else{
          x.esUltimoEstatus = false;
          x.mostrarBotonOtroArchivo = false;
        }

        switch(x.estatusDocApirante.toString().toLowerCase()){
          case 'aceptado':
            x.icon = PrimeIcons.CHECK;
            x.color = '#607D8B';
            break;

          case 'rechazado':
            x.icon = PrimeIcons.TIMES;
            x.color = '#FF0000';
            break;

          default:
            x.icon = PrimeIcons.CIRCLE_FILL;
            x.color = '#067DAD';
            break;
        }


      })
  }


  public async clickBoton(nombreinput){

    const inputFile = document.getElementById(nombreinput) as HTMLInputElement;
    inputFile.click();

  }
/*
  async my_handler_docs(archivos: any){

    if(archivos){
      if (archivos.files[0].type == "application/pdf") {

        const formData: any = new FormData();
        formData.append("file", archivos.files[0]);

        const respuesta = await this.cargaArchivosService.agregar(formData);
        if(respuesta.exito){
          let token = respuesta.respuesta;


          let tblDocumentosAspirantes = new TblDocAspiranteComplex();
          //el id es el importante
          tblDocumentosAspirantes.id = this.dataInput.documentoAspiranteId;
          tblDocumentosAspirantes.tblDatosGeneralesAspiranteId = 0;
          tblDocumentosAspirantes.tblDocumentosId = 0;
          tblDocumentosAspirantes.activo = true;
          tblDocumentosAspirantes.archivo = token;

        const respDoc = await this.preregistroService.ActualizarDocumentoAspirante(tblDocumentosAspirantes);

          if(respDoc.exito){
            this.toastService.toastSuccess("Se envió el documento");
            await this.obtenerObservacionesDocumento();

          }
          else {
            this.toastService.toatsWarning("ocurrio un error");
          }

        }
        else {
          this.toastService.toatsWarning(respuesta.mensaje);
        }
      } else {
        this.toastService.toatsWarning("Solo se admiten archivos PDF.");

      }
    }
}



  public async enviarDocumentos(){


          let tblDocumentosAspirantes = new TblDocAspiranteComplex();
          //el id es el importante
          tblDocumentosAspirantes.id = this.dataInput.documentoAspiranteId;
          tblDocumentosAspirantes.tblDatosGeneralesAspiranteId = 0;
          tblDocumentosAspirantes.tblDocumentosId = 0;
          tblDocumentosAspirantes.activo = true;
          tblDocumentosAspirantes.archivo = ''//respuesta.respuesta;

        const respDoc = await this.preregistroService.altaListaDocumentosAspirante(tblDocumentosAspirantes);

          if(respDoc.exito){
            this.toastService.toastSuccess("Se cargaron documentos");
          }
          else {
            this.toastService.toatsWarning("ocurrio un error");
          }
} */

public abrirDocumento(token){

  if(token){
    const url = this.cargaArchivosService.obtenerUrlCompleta(token);
    window.open(url,"_blank");
  }
 }


}

