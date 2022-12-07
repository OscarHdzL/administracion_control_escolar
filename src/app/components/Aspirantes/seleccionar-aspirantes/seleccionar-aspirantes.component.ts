import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { SeleccionarAspirantes } from 'src/app/modelos/Aspirantes';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { AspiranteServices } from 'src/app/servicios/aspirantes.service';
import { SwalServices } from 'src/app/servicios/sweetalert2.services';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'vex-seleccionar-aspirantes',
  templateUrl: './seleccionar-aspirantes.component.html',
  styleUrls: ['./seleccionar-aspirantes.component.scss']
})
export class SeleccionarAspirantesComponent implements OnInit {

  aspirantes: SeleccionarAspirantes[] = [];
  idAspirantes: any[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [' apertura', 'acciones'];


  columns: TableColumn<any>[] = [
    { label: 'Nombre', property: 'nombre', type: 'text', visible: true, cssClasses: ['font-medium'] },
    // { label: 'Oferta Educativa', property: 'oferta', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Tecnico', property: 'tecnico', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Conocimientos', property: 'conocimiento', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Ceneval', property: 'ceneval', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Promedio', property: 'promedio', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Seleccionar', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private dialog: MatDialog,
              public matPaginatorIntl: MatPaginatorIntl,
              private catalogosServices: CatalogosServices,
              private aspiranteServices: AspiranteServices,
              private swalService: SwalServices,
              private toastService:VariablesService
              ) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  async deleteGrupo(row: any){
    //
    // console.log('clic eliminar',row);
    // row.activo = false;
    // let res = await this.grupoOpcionesServices.actualizarGrupo(row);
    // console.log('se elimino',res);
    this.ngOnInit();
  }
  async seleccionar(){
    for await (const item of this.aspirantes) {
      if (item.seleccionado) {
        this.idAspirantes.push(
          {
            idApirante: item.idAspirante
          }
        )
      }
    }
    console.log("id Aspirantes", this.idAspirantes);
    let res = await this.aspiranteServices.agregarAspirantes(this.idAspirantes);
    console.log("res post id",res);
    if(res.exito == true){
      this.swalService.alertaPersonalizado(res.exito,"Aspirantes Seleccionados");
      this.ngOnInit();
    }
    else{
      this.toastService.toastErr("Error al seleccionar a los aspirantes");
    }


  }
  async ngOnInit() {
    let res = await this.aspiranteServices.obtenerAspirantes(1);
    for (let i = 0; i < res.objeto.length; i++) {
      this.aspirantes.push({
        idEscalafon: res.objeto[i].aspirante.idEscalafon,
        idAspirante: res.objeto[i].aspirante.idAspirante,
        idOfertaEducativa: res.objeto[i].aspirante.idOfertaEducativa,
        tecnicoMet: res.objeto[i].aspirante.tecnicoMet,
        conocimientosBd: res.objeto[i].aspirante.conocimientosBd,
        ceneval: res.objeto[i].aspirante.ceneval,
        promedio: res.objeto[i].promedio,
        seleccionado: false,
        nombre: res.objeto[i].aspirante.paterno + " " + res.objeto[i].aspirante.materno + " " + res.objeto[i].aspirante.nombre
      });
      // let res2 = await this.catalogosServices.consultarOfertaEducativaId(this.aspirantes[i].idOfertaEducativa);
      // this.aspirantes[i].oferta = res2.objeto[0].ofertaEducativa;
    }
    this.dataSource = new MatTableDataSource<SeleccionarAspirantes>(this.aspirantes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.matPaginatorIntl.itemsPerPageLabel = "Aperturas por página";
    this.matPaginatorIntl.previousPageLabel  = 'Anterior página';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente página';

  }
}
