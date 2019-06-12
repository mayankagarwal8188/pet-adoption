import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalDetailsService } from '../services/animal-details.service';
import { SnackBarComponent } from '../shared/snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

export interface animalInfo {
  feature: string;
  value: number;
}

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent {
  private subscriptions: Array<Subscription> = [];
  public animalName: string;
  public animalData: any;
  public mainImage: string;
  public displayedColumns: string[] = ['feature', 'value'];
  public animalTableData = [];
  public disableAdoptButton = false;
  public thumbnailImage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private animalDetailsService: AnimalDetailsService,
    public snackBar: MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.spinnerService.show();
      this.subscriptions.push(this.animalDetailsService.getDetails(id).subscribe(res => {
        console.log(res);
        this.animalData = res;
        Object.keys(this.animalData).forEach((item) => {
          if(item !== 'picture' && item !== 'thumbnail'){
            this.animalTableData.push({
              feature: item,
              value: this.animalData[item]
            })
          }
        })
        this.mainImage = '../../assets/' + this.animalData.picture;
        this.thumbnailImage = this.animalData.thumbnail;
      },
      error => {
        this.spinnerService.hide();
      },
      ()=> {
        this.spinnerService.hide();
      }))
    });
  }

  mainImageChange(event){
    this.mainImage = event.target.src;
  }

  /**
  * @method openSnackBar
  * @description This method is used to show snackbar.
  */
  openSnackBar() {
    this.disableAdoptButton = true;
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1500,
      data: {name: this.animalData.name}
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
