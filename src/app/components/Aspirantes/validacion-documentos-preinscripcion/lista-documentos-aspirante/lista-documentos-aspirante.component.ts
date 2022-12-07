import { HistorialValidacionComponent } from './../historial-validacion/historial-validacion.component';
import { ValidacionDocumentoComponent } from './../validacion-documento/validacion-documento.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { PlanEstudiosModel } from 'src/app/modelos/PlanEstudios.model';
import { DocumentoAspiranteModel, PreRegistroSelect } from 'src/app/modelos/PreregistroModel';
import { PreregistroAspiranteService } from 'src/app/servicios/preregistro-aspirante.service';
import { ArchivoServices } from 'src/app/servicios/archivos.service';

@Component({
  selector: 'vex-lista-documentos-aspirante',
  templateUrl: './lista-documentos-aspirante.component.html',
  styleUrls: ['./lista-documentos-aspirante.component.scss']
})
export class ListaDocumentosAspiranteComponent implements OnInit {

  ID_ASPIRANTE: number;

  listaDocumentos: Array<DocumentoAspiranteModel> = [];
  planes: PlanEstudiosModel[] = [];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns: TableColumn<any>[] = [
    { label: 'Documento', property: 'documento', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Estatus documento', property: 'estatus', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Actualización', property: 'inclusion', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'acciones', type: 'button', visible: true }
  ];



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PreRegistroSelect,
    private dialogRef: MatDialogRef<ListaDocumentosAspiranteComponent>,
    public matPaginatorIntl: MatPaginatorIntl,
    private preregistroService: PreregistroAspiranteService,
    private cargaArchivosService: ArchivoServices,
    private dialog: MatDialog) {

      console.log('Data recibida');
console.log(this.data);
  this.ID_ASPIRANTE = data.id
/*  */
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {

   this.listaDocumentos = await  this.obtenerDocumentosAspirante();

    this.dataSource = new MatTableDataSource<DocumentoAspiranteModel>(this.listaDocumentos);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = 'Planes por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }


  openModalPlanEstudios(model: PlanEstudiosModel) {
 /*    this.dialog.open(AltaPlanComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: false, plan: model },
      disableClose: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    }); */
  }


  openModalValidacion(model: DocumentoAspiranteModel) {
       this.dialog.open(ValidacionDocumentoComponent, {
         width: '60%',
         autoFocus: false,
         data: model,
         disableClose: true
       }).afterClosed().subscribe(async result => {

         console.log(result);
         await this.ngOnInit();
       });
     }

     openModalHistorial(model: DocumentoAspiranteModel) {

      this.dialog.open(HistorialValidacionComponent, {
        height: '70%',
        width: '65%',
        autoFocus: false,
        data: model,
        disableClose: true
      }).afterClosed().subscribe(result => {
        console.log(result);
      });
    }


  close(result: boolean) {
    this.dialogRef.close(result);
  }

  public async obtenerDocumentosAspirante(){

    const respuesta = await this.preregistroService.obtenerDocumentosAspirante(this.ID_ASPIRANTE);

    console.log(respuesta.objeto);
    return (respuesta.objeto) ? respuesta.objeto : [];
  }

  public abrirDocumento(token){

    if(token){
      const url = this.cargaArchivosService.obtenerUrlCompleta(token);
      window.open(url,"_blank");
    }
   }

}
