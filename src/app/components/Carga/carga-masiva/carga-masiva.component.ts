import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CargaMasiva } from 'src/app/modelos/Carga';
import { DatePipe } from '@angular/common';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CargaMasivaServices } from 'src/app/servicios/carga-masiva.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'vex-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.scss']
})
export class CargaMasivaComponent implements OnInit {

  //FormularioDocumentos: FormGroup;
  archivos: any[] = [];
  archivo: CargaMasiva = {};
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [' espacio', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'CURP', property: 'curp', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Problema', property: 'problema', type: 'text', visible: true, cssClasses: ['font-medium'] }
  ];

  constructor(
    public matPaginatorIntl: MatPaginatorIntl,
    private cargaMasiva: CargaMasivaServices,
    private swalService: SwalServices,
    private toastService:VariablesService
  ) {
      // this.archivos.push({
      //   curp: "curpTest",
      //   problema: "problemaTest"
      // })
   }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CargaMasiva>(this.archivos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "CURP por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }

  public async onFileChange(pFileList: FileList){
    console.log('change archivo select',pFileList.item(0));
    if(pFileList.item(0).type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      this.archivo.id = null;
      //this.archivo.fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
      this.archivo.name = pFileList.item(0).name;
      this.archivo.tamanio = pFileList.item(0).size.toString();
      this.archivo.tipo = pFileList.item(0).type;
      this.archivo.file = pFileList.item(0);
      let res = await this.guardarArchivo(this.archivo);
      console.log("Archivo ->",res);
      if(res.exito == true){
        this.swalService.alertaPersonalizado(res.exito,"Archivo guardado con exito!");
        this.archivo = {};
        for (let i = 0; i < res.objeto.length; i++) {
          var array = res.objeto[i].split('/');
          this.archivos.push({
            curp: array[0],
            problema: array[1]
          });
        }
        this.ngOnInit();
        this.archivos = [];
      }
      else{
        this.toastService.toastErr("Error al guardar el archivo!");
        this.archivo = {};
      }
    }
    else{
      this.toastService.toastErr("El archivo tiene que estar en formato .xlsx");
    }
  }
  public async onFileChangeDrop(pFileList: File[]){
    console.log('change archivo drop',pFileList[0]);
    if(pFileList[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      this.archivo.id = null;
      //this.archivo.fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
      this.archivo.name = pFileList[0].name;
      this.archivo.tamanio = pFileList[0].size.toString();
      this.archivo.tipo = pFileList[0].type;
      this.archivo.file = pFileList[0];
      let res = await this.guardarArchivo(this.archivo);
      console.log("Archivo ->",res);
      if(res.exito == true){
        this.swalService.alertaPersonalizado(res.exito,"Archivo guardado con exito!");
        this.archivo = {};
        for (let i = 0; i < res.objeto.length; i++) {
          var array = res.objeto[i].split('/');
          this.archivos.push({
            curp: array[0],
            problema: array[1]
          });
        }
        this.ngOnInit();
        this.archivos = [];
      }
      else{
        this.toastService.toastErr("Error al guardar el archivo!");
        this.archivo = {};
      }
    }
    else{
      this.toastService.toastErr("El archivo tiene que estar en formato .xlsx");
    }
    // this.files = Object.keys(pFileList).map(key => pFileList[key]);
    // this._snackBar.open("Successfully upload!", 'Close', {
    //   duration: 2000,
    // });
  }
  // public async saveFile(){
  //   console.log('clic',this.archivo);
  //   let res = await this.guardarArchivo(this.archivo);
  //   console.log(res);
  //   if(res.exito == true){
  //     this.archivo.token = res.respuesta;
  //     this.archivos.push(this.archivo);
  //     this.swalService.alertaPersonalizado(res.exito,"Archivo guardado con exito!");
  //     this.archivo = {};
  //     this.ngOnInit();
  //   }
  //   else{
  //     this.toastService.toastErr("Error al guardar el archivo!");
  //     this.archivo = {};
  //   }
  //   // this.files = Object.keys(pFileList).map(key => pFileList[key]);
  //   // this._snackBar.open("Successfully upload!", 'Close', {
  //   //   duration: 2000,
  //   // });
  // }
  public async guardarArchivo(archivo:CargaMasiva)
  {
    const formData: any = new FormData();
    formData.append('file', archivo.file);
    const respuesta = await this.cargaMasiva.agregarMasiva(formData);
    return respuesta;
  }

}
