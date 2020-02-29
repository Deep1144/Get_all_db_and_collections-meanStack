import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CollectionservicesService {

  baseUrl = "http://localhost:3000/";
  constructor(public http : HttpClient) { }

  dataBaseNames;


  collectionNames;
  collectionFlag = 0;

  dataList;
  dataListFlag = 0;

  getdbList(){
    return this.http.get(this.baseUrl);
  }

  getCollectionData(dbName){
    console.log("here in service");
    return this.http.post(this.baseUrl , dbName);
  }


  getData(collectionName){
    // console.log("......."+collectionName+".........");
    var urldata =this.baseUrl+"getdata";
    console.log("In process fetching data : " + urldata);
    return this.http.post(urldata , collectionName);
  }
}
