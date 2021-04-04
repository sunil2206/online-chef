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
  cityList = [];
  chefList;
  tempList;
  formErr: string;
  chefListErr: string;
  userPosition = new Position();
  constructor(
    private locationSer: UserLocationService,
    private chefSer: ChefService,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {

  }

  viewData(inputEle: HTMLInputElement): void{
    if(inputEle.value.length < 3){
      this.formErr = 'miminum 3 charcters required.';
    }else{
      this.formErr = '';
      this.errMsg = '';
      this.cityList = [];
      this.locationSer.getCity(inputEle.value).subscribe((data) => {
        console.log(data);
        this.tempList = data;
        this.tempList.map(val => {
          this.cityList.push(val);
        });
      });
    }
  }

  getCurrentLocation(): void{
      this.formErr = '';
      this.errMsg = '';
      let tempObj;
      navigator.geolocation.getCurrentPosition(data => {
        this.userPosition.latitude = data.coords.latitude;
        this.userPosition.lognitude = data.coords.longitude;
        this.httpClient.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.userPosition.latitude},${this.userPosition.lognitude}&key=7f43792cfe0e41cba73988504451e191`).subscribe(data => {
          tempObj = data;
          let str = tempObj.results[0].formatted.split(',');
          this.displayData = str[0] + str[1];
        });

        this.chefSer.getChefList(this.userPosition).subscribe((res) => {

          if (res.data.response.length === 0){
            this.chefListErr = 'No chefs found for this location!!!';
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
    this.formErr = '';
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
