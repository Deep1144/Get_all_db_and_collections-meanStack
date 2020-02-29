import { Component, OnInit } from '@angular/core';
import { CollectionservicesService } from '../shared/collectionservices.service';
import { Key } from 'protractor';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(public collectionService:CollectionservicesService) { }

  ngOnInit(): void {
    this.getListOfDb();
  }

  getListOfDb(){
    console.log("in component");
    this.collectionService.getdbList().subscribe(res=>{
      this.collectionService.dataBaseNames = res;
    })
  };

  getCollection(dbName){
    console.log("here collcetion" + dbName.name);
    this.collectionService.getCollectionData(dbName).subscribe(res=>{
      console.log("Got response");
      // console.log(res);
      this.collectionService.collectionFlag =1;
      this.collectionService.collectionNames = res;
      console.log(this.collectionService.collectionNames);
    });;
  }


  getData(collectionName){
    this.collectionService.getData(collectionName).subscribe(res =>{
      console.log("res is here "+JSON.stringify(res));
      // console.log("Key : "+ JSON.stringify(res[Key[0]]));
      this.collectionService.dataListFlag=1;
      this.collectionService.dataList = res;


    });
    // console.log("here.............")
  }

}
