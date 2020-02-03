import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './city';

@Component({
  selector: 'ngx-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  settings = {
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Delete',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      country: {
        title: 'country',
      },
      name: {
        title: 'name',
      },
      lat: {
        title: 'lat',
      },
      lng: {
        title: 'lng',
      },
    },
  };
  data = [

  ];
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get<City[]>("https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json").subscribe((myData: City[]) => {
      this.data = myData;
      console.log(this.data);
    });
  }
  onDeleteConfirm(event) {

    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event: any) {
    console.log("Create Event In Console")
    console.log(event);
    this.data.push(event['newData']);
  }

  onSaveConfirm(event: any) {
    let oldData = event['data'];
    let newData = event['newData'];
    console.log("Edit EventIn Console", event);
    for (let index in this.data) {
      if ( this.data[index]['country'] == oldData['country'] && this.data[index]['name'] == oldData['name']) {
        this.data[index] = newData;
      }
    }
  }
}
