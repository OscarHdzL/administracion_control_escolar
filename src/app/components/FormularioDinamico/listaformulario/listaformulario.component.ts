import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { ListaFormulariosService } from 'src/app/servicios/lista-formularios.service';
import { ModallistaformularioComponent } from './modallistaformulario/modallistaformulario.component';
import { ModallistapreguntasComponent } from './modallistapreguntas/modallistapreguntas.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ModalpreguntaComponent } from './modalpregunta/modalpregunta.component';
import { LoaderService } from 'src/app/servicios/loader.service';
@Component({
  selector: 'vex-listaformulario',
  templateUrl: './listaformulario.component.html',
  styleUrls: ['./listaformulario.component.scss']
})
export class ListaformularioComponent implements OnInit {

  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  formularios: any[] = [];
  columns: TableColumn<any>[] = [
    { label: 'Formulario', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  displayedColumns: string[] = ['formulario', 'acciones'];


  constructor(private dialog: MatDialog,
              private listaFormulariosService: ListaFormulariosService,
              public matPaginatorIntl: MatPaginatorIntl,
              private loaderService: LoaderService
              ) {


    //this.test()
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async deleteGrupo(row: any, evento){
    console.log('clic eliminar',row);
    row.activo = evento.checked;
    let res = await this.listaFormulariosService.actualizarFormulario(row);
    console.log('se elimino',res);
    this.ngOnInit();
  }

  async ngOnInit() {
    let res = await this.listaFormulariosService.obtenerFormularios();
    console.log('todos los formularios',res);
    this.formularios = res;
    this.dataSource = new MatTableDataSource<any>(this.formularios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.matPaginatorIntl.itemsPerPageLabel = "Formularios por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';
  }

  openModalCreate() {
    this.dialog.open(ModallistaformularioComponent,{
      height: '50%',
      width: '50%',
      autoFocus: false,
      data: 0,
      disableClose: true
   }).afterClosed().subscribe(( formulario: any) => {
      this.ngOnInit();
    });
  }

  openModalUpdate( formulario: any) {
    console.log('editar', formulario);
    this.dialog.open(ModallistaformularioComponent, {
      data:  formulario,
      height: '50%',
      width: '50%',
      autoFocus: false,
      disableClose: true
    }).afterClosed().subscribe(updatedCustomer => {
      this.ngOnInit();
    });
  }

  openModalQuestions( formulario: any) {
    console.log('questions', formulario);
    this.dialog.open(ModallistapreguntasComponent, {
      data:  formulario,
      height: '60%',
      width: '100%',
      autoFocus: false,
      disableClose: true
    }).afterClosed().subscribe(updatedCustomer => {
      this.ngOnInit();
    });
  }



/*   test() {


    let objeto = JSON.parse('{"id":38,"tblFormularioId":36,"tblTipoRespuestaId":2,"tblGrupoOpcionesId":21,"pregunta":"¿QUE DEPORTES PREFIERES?","respuestaObligatoria":true,"preguntaComplemento":null,"inclusion":"2022-05-20T18:26:19.453","activo":true,"orden":11,"respuestaComplementoObligatoria":false,"tblFormulario":null,"tblGrupoOpciones":{"id":21,"grupo":"F1.DeportesFavoritos","activo":true,"tblOpcionesPregunta":[{"id":70,"tblGrupoOpcionesId":21,"opcion":"FUTBOL","activo":true,"tblGrupoOpciones":null,"tblRespuesta":[]},{"id":71,"tblGrupoOpcionesId":21,"opcion":" BASKETBALL","activo":true,"tblGrupoOpciones":null,"tblRespuesta":[]},{"id":72,"tblGrupoOpcionesId":21,"opcion":" BOX","activo":true,"tblGrupoOpciones":null,"tblRespuesta":[]},{"id":73,"tblGrupoOpcionesId":21,"opcion":"TIRO CON ARCO","activo":true,"tblGrupoOpciones":null,"tblRespuesta":[]},{"id":74,"tblGrupoOpcionesId":21,"opcion":" NATACIÓN","activo":true,"tblGrupoOpciones":null,"tblRespuesta":[]},{"id":75,"tblGrupoOpcionesId":21,"opcion":" PATINAJE SOBRE HIELO","activo":true,"tblGrupoOpciones":null,"tblRespuesta":[]},{"id":76,"tblGrupoOpcionesId":21,"opcion":" VOLEIBOL","activo":true,"tblGrupoOpciones":null,"tblRespuesta":[]},{"id":77,"tblGrupoOpcionesId":21,"opcion":"FUTBOL AMERICANO","activo":false,"tblGrupoOpciones":null,"tblRespuesta":[]},{"id":89,"tblGrupoOpcionesId":21,"opcion":"ATLETISMO","activo":true,"tblGrupoOpciones":null,"tblRespuesta":[]}],"tblPregunta":[null]},"tblTipoRespuesta":{"id":2,"tipoRespuesta":"checkbox","activo":true,"tieneComplemento":false,"tblPregunta":[null]},"tblRespuesta":[]}');
    var obj = {
      id: objeto.id,
      objet: objeto
    }

    this.dialog.open(ModalpreguntaComponent, {
      data:  obj,
      height: '60%',
      width: '70%',
      autoFocus: false,
      disableClose: true
    }).afterClosed().subscribe(updatedCustomer => {
      this.ngOnInit();
    });
  } */
}
