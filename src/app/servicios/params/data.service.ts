import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [];

  constructor() { }

  public setData(id: string, data: any) {
    this.data[id] = data;
  }

  public getData(id) {
    return this.data[id];
  }
}
