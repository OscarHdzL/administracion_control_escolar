import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'vex-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss']
})
export class VisorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public url: any,
  private dialogRef: MatDialogRef<VisorComponent>,) { }

  ngOnInit(): void {
    console.log('url ->',this.url);
  }

  cerrar(){
    this.dialogRef.close()
  }

}
