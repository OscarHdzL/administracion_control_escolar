import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.scss']
})
export class DocentesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  irAltaDocente() {
    /* this.router.navigate(['/components/registro-docentes']); */
    this.router.navigateByUrl('/components/registro-docentes');
  }
}
