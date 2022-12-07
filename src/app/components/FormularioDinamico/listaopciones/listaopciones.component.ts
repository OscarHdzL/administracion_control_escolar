import { AfterViewInit, Component,OnInit, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { GrupoOpcionesServices } from 'src/app/servicios/grupo-opciones.service';
import { formularioOpciones } from 'src/app/modelos/respuesta.model';
import { ModallistaopcionesComponent } from './modallistaopciones/modallistaopciones.component';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@UntilDestroy()
@Component({
  selector: 'vex-listaopciones',
  templateUrl: './listaopciones.component.html',
  styleUrls: ['./listaopciones.component.scss']
})




export class ListaopcionesComponent implements OnInit{

  grupos: formularioOpciones[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['grupo', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Grupo de Opciones', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              private grupoOpcionesServices: GrupoOpcionesServices,
              public matPaginatorIntl: MatPaginatorIntl) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  async deleteGrupo(row: any, evento){

    console.log('clic eliminar',row);
    row.activo = evento.checked;
    let res = await this.grupoOpcionesServices.actualizarGrupo(row);
    console.log('se elimino',res);
    this.ngOnInit();
  }
  async ngOnInit() {
    let res = await this.grupoOpcionesServices.obtenerGrupos();

    console.log('todos los grupos',res);
    this.grupos = res;
    this.dataSource = new MatTableDataSource<formularioOpciones>(this.grupos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Grupos por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }

  openModalCreate() {
    this.dialog.open(ModallistaopcionesComponent,{
      height: '50%',
      width: '50%',
      autoFocus: false,
      data: 0
   }).afterClosed().subscribe(( grupo: any) => {
      /**
       * Customer is the updated  grupo (if the user pressed Save - otherwise it's null)
       */
      console.log('se guardo bien');

      this.ngOnInit();
    });
  }

  openModalUpdate( grupo: any) {
    console.log('editar', grupo);
    this.dialog.open(ModallistaopcionesComponent, {
      data:  grupo,
      height: '50%',
      width: '50%',
      autoFocus: false
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated  grupo (if the user pressed Save - otherwise it's null)
       */
      this.ngOnInit();
    });
  }


}
