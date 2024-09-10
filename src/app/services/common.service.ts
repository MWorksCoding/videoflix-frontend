import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  component: string = "home";
  
  constructor() { }
}
