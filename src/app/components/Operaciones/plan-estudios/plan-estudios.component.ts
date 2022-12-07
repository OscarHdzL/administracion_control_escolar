import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AltaPlanComponent } from './alta-plan/alta-plan.component';

@Component({
  selector: 'vex-plan-estudios',
  templateUrl: './plan-estudios.component.html',
  styleUrls: ['./plan-estudios.component.scss']
})
export class PlanEstudiosComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModalPlanEstudios(alta: boolean = true) {
    this.dialog.open(AltaPlanComponent, {
      width: '70%',
      autoFocus: false,
      data: { alta: alta, plan: null },
      disableClose: true
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
