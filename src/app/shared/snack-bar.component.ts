import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snack-bar-component',
  templateUrl: 'snack-bar.component.html',
  styles: [`
    .snack-bar-text {
      color: white !important;
    }
  `],
})
export class SnackBarComponent {
  public animalName: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.animalName = data ? data.name : '';
  }
}
