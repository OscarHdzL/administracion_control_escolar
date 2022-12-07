import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FormularioComponent } from './formulario/formulario.component';


const rutas: Routes = [
  {
    path: 'formulario',
    component: FormularioComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule]
})
export class PaginasSinSesionRoutingModule { }

