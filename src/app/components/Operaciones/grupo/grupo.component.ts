import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AltaGrupoComponent } from './alta-grupo/alta-grupo.component';

@Component({
  selector: 'vex-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModalGrupo(alta: boolean = true) {
    this.dialog.open(AltaGrupoComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: alta, grupo: null },
      disableClose: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
