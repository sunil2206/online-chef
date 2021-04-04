import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Position } from 'src/app/model/postiion';
import { ChefService } from 'src/app/services/chef.service';
import { UserLocationService } from 'src/app/services/user-location.service';

@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.css']
})

export class MainformComponent implements OnInit {
  errMsg: string;
  displayData = 'bangalore';
  cityList;
  userPosition = new Position();
  chefList;
  chefListErr;
  constructor(
    private locationSer: UserLocationService,
    private chefSer: ChefService,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {

  }

  viewData(inputEle: HTMLInputElement): void{
    this.errMsg = '';
    this.locationSer.getCity(inputEle.value).subscribe((data) => {
      this.cityList = data;
    });
  }

  getCurrentLocation(): void{
      this.errMsg = '';
      navigator.geolocation.getCurrentPosition(data => {
        this.userPosition.latitude = data.coords.latitude;
        this.userPosition.lognitude = data.coords.longitude;
        this.chefSer.getChefList(this.userPosition).subscribe((res) => {

          if (res.data.response.length === 0){
            this.chefListErr = 'no chefs found';
            console.log('no chefs found');
          }else{
            this.chefListErr = '';
            this.chefList = res.data.response;
          }

        }, (err) => {
          this.errMsg = 'Something went wrong!!';
        });
      }, error => {
        console.error(error.message);
      });
  }

  getData(inpData: string): void{
    this.errMsg = '';
    let arr = inpData.split(',');
    this.displayData = arr[0];
    console.log(arr[0]);
    this.locationSer.getCityPosition(arr[0]).subscribe( data => {

      this.userPosition.latitude = data.results[0].geometry.lat;
      this.userPosition.lognitude = data.results[0].geometry.lng;

      this.chefSer.getChefList(this.userPosition).subscribe((res) => {
        this.chefList = res.data.response;
        console.log(res.data.response);
      }, (err) => {
        this.errMsg = 'Something went wrong!!';
      });

    });
  }
}
