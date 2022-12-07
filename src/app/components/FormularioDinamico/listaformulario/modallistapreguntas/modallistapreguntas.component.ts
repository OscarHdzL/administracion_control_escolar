import { Component,Inject,OnInit, ViewChild  } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { ListaFormulariosService } from 'src/app/servicios/lista-formularios.service';
import { formularioOpciones,Preguntas } from 'src/app/modelos/respuesta.model';
import { ModalpreguntaComponent } from '../modalpregunta/modalpregunta.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'vex-modallistapreguntas',
  templateUrl: './modallistapreguntas.component.html',
  styleUrls: ['./modallistapreguntas.component.scss']
})
export class ModallistapreguntasComponent implements OnInit {

  preguntas: Preguntas[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  columns: TableColumn<any>[] = [
    { label: 'Pregunta', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Es Obligatoria?', property: 'obligatorio', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public objeto: any,
              private dialog: MatDialog,
              private listaFormulariosService: ListaFormulariosService,
              public matPaginatorIntl: MatPaginatorIntl) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  async deleteGrupo(row: any, evento){
    console.log('clic eliminar',row);
    row.activo = evento.checked;
    let res = await this.listaFormulariosService.actualizarPregunta(row);
    console.log('se elimino',res);
    this.ngOnInit();
  }
  async ngOnInit() {

    let res = await this.listaFormulariosService.consultarPreguntasFormulario(this.objeto.id);
    console.log('todas los preguntas res',res);
    this.preguntas = res;
    console.log('todas los preguntas',this.preguntas);
    this.dataSource = new MatTableDataSource<Preguntas>(this.preguntas);
    this.dataSource.paginator = this.paginator;
    this.matPaginatorIntl.itemsPerPageLabel = 'Preguntas por página';
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    var obj = {
      id: this.objeto.id,
      objet: 0
    }
    this.dialog.open(ModalpreguntaComponent,{
      height: '60%',
      width: '70%',
      autoFocus: false,
      data: obj,
      disableClose: true
   }).afterClosed().subscribe(( grupo: any) => {
      /**
       * Customer is the updated  grupo (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  openModalUpdate( grupo: any) {

    var obj = {
      id: this.objeto.id,
      objet: grupo
    }
    console.log('editar', grupo);
    this.dialog.open(ModalpreguntaComponent, {
      data:  obj,
      height: '60%',
      width: '70%',
      autoFocus: false,
      disableClose: true
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated  grupo (if the user pressed Save - otherwise it's null)
       */
      this.ngOnInit();
    });
  }

}
