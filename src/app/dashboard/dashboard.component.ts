import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { DashboardService } from '../services/dashboard.service';

export interface TaskFilterColumn {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  public dropDownValues: TaskFilterColumn[] = [
    {value: 'name', viewValue: 'Name'},
    {value: 'breed', viewValue: 'Breed'},
    {value: 'gender', viewValue: 'Gender'},
    {value: 'age', viewValue: 'Age'}
  ];
  public columnFilter: string;
  public filterValue = '';
  public filterItems = [];
  public getError = '';
  public animalData = [];
  public activePageDataChunk = [];
  public pageSize = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public length = 0;
  public eventPageChange:any;
  public genders: string[] = ['All', 'Male', 'Female'];
  public genderSelected: string;
  public animalTypes: string[] = ['All', 'Dog', 'Cat'];
  public animalTypeSelected: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private spinnerService: Ng4LoadingSpinnerService,
    public dialog: MatDialog
  ) {}
   
  /**
  * Component life cycle hooks
  * @description In this life cycle hook the data is coming from rest api call and displayed.
  */
  ngOnInit() {
    this.spinnerService.show();
    this.genderSelected = this.genders[0];
    this.animalTypeSelected = this.animalTypes[0];
    this.subscriptions.push(this.dashboardService.getData().subscribe((res) => {
      this.animalData = res.data;
      this.activePageDataChunk = this.animalData.slice(0, this.pageSize);
      this.length = this.animalData.length;
    },
    error => {
      this.getError = error;
      this.spinnerService.hide();
    },
    () => {
      this.spinnerService.hide();
    }));
  }
  
  onPageChanged(e) {
    this.eventPageChange = e;
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    let filterData = '';
    this.length = this.animalData.length;
    this.activePageDataChunk = this.animalData.slice(firstCut, secondCut);
    this.filterItems = this.animalData;
    if (this.animalTypeSelected && this.animalTypeSelected !== 'All') {
      filterData = this.animalTypeSelected.trim().toLowerCase();
      this.filterItems = this.filterItems.filter(item => item['type'] === filterData);
      this.length = this.filterItems.length;
      this.activePageDataChunk = this.filterItems.slice(firstCut, secondCut);
    }
    if (this.genderSelected && this.genderSelected !== 'All') {
      filterData = this.genderSelected.trim().toLowerCase();
      this.filterItems = this.filterItems.filter(item => item['gender'] === filterData);
      this.length = this.filterItems.length;
      this.activePageDataChunk = this.filterItems.slice(firstCut, secondCut);
    }
    if (this.filterValue) {
      filterData = this.filterValue.trim().toLowerCase();
      if(this.columnFilter){
        this.filterItems = this.filterItems.filter(item => item[this.columnFilter]
          .toLowerCase().indexOf(filterData) > -1);
      } else {
        const columns = ['name', 'breed', 'gender', 'age'];
        this.filterItems = this.filterItems.filter(item => {
          return columns.some(item1 => {
             if(item[item1].toLowerCase().indexOf(filterData) > -1){
               return item;
             }
            });
        });
      }
      this.length = this.filterItems.length;
      this.activePageDataChunk = this.filterItems.slice(firstCut, secondCut);
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  /**
  * @method applyFilter
  * @description This method is used to filter the animals.
  */
  applyFilter() {
    this.filterItems = [];
    let filterData = '';
    if(this.eventPageChange) {
      this.onPageChanged(this.eventPageChange);
    } else {
        this.length = this.animalData.length;
        this.activePageDataChunk = this.animalData.slice(0, this.pageSize);
        this.filterItems = this.animalData;
        if (this.animalTypeSelected && this.animalTypeSelected !== 'All') {
          filterData = this.animalTypeSelected.trim().toLowerCase();
          this.filterItems = this.filterItems.filter(item => item['type'] === filterData);
          this.length = this.filterItems.length;
          this.activePageDataChunk = this.filterItems.slice(0, this.pageSize);
        }
        if (this.genderSelected && this.genderSelected !== 'All') {
          filterData = this.genderSelected.trim().toLowerCase();
          this.filterItems = this.filterItems.filter(item => item['gender'] === filterData);
          this.length = this.filterItems.length;
          this.activePageDataChunk = this.filterItems.slice(0, this.pageSize);
        }
        if (this.filterValue) {
          filterData = this.filterValue.trim().toLowerCase();
          if(this.columnFilter){
            this.filterItems = this.filterItems.filter(item => item[this.columnFilter]
              .toLowerCase().indexOf(filterData) > -1);
          } else {
            const columns = ['name', 'breed', 'gender', 'age'];
            this.filterItems = this.filterItems.filter(item => {
              return columns.some(item1 => {
                 if(item[item1].toLowerCase().indexOf(filterData) > -1){
                   return item;
                 }
                });
            });
          }
          this.length = this.filterItems.length;
          this.activePageDataChunk = this.filterItems.slice(0, this.pageSize);
        }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
