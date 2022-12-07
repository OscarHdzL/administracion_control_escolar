
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';


import { FormWizardRoutingModule } from '../pages/ui/forms/form-wizard/form-wizard-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';

import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginasSinSesionRoutingModule } from './paginas-sin-sesion-routing.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { FormularioComponent } from './formulario/formulario.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { VisorComponent } from '../visor/visor.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    FormularioComponent,
    VisorComponent
  ],
  imports: [
    CommonModule,
    PaginasSinSesionRoutingModule,
    FormsModule,
    PageLayoutModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    CurrencyMaskModule,
    FormWizardRoutingModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatPaginatorModule,
    PdfViewerModule,
  ],
   providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LcnKd4eAAAAAOeXsp7jNn5f_Z7V2K2pSHbvDebC',
    } as RecaptchaSettings,
  }],
})
export class PaginasSinSesionModule { }
