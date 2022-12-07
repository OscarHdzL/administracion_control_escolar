import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-validacion-documentos-preinscripcion',
  templateUrl: './validacion-documentos-preinscripcion.component.html',
  styleUrls: ['./validacion-documentos-preinscripcion.component.scss']
})
export class ValidacionDocumentosPreinscripcionComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /* openModalPlanEstudios(alta: boolean = true) {
    this.dialog.open(AltaPlanComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: alta, plan: null },
      disableClose: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  } */
}
