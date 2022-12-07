import { Component, OnInit, TemplateRef } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';




const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';

@Component({
  selector: 'vex-error404',
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.scss']
})
export class Error404Component implements OnInit {


  public loading = true;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;






  constructor() { }

  ngOnInit() {
  }

}
