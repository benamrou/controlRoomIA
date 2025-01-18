import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services';
import { Output, EventEmitter } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { QueryService } from 'src/app/services/query/query.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  @Output() menuSelection = new EventEmitter<string>();
  dateNow: Date;
  datePicked: Date[];
  eventsCnt = [];


  // Request subscription
  subscription: any[] = [];

  queryID='INV0000002'; /* Query to collect data from hei_asn_dsd_vendor */
  queryCriteria = [1] ;  /* Nb years inventory bring in */

  resultInventory: any;

  constructor(public _userService: UserDataService, private _datePipe: DatePipe, private _queryService: QueryService) {
    this._datePipe     = new DatePipe('en-US');
    this.dateNow = new Date();
    this.eventsCnt.push('11/12/2024');

    console.log(this.eventsCnt, this.datePicked);

    this.subscription.push(this._queryService.getQueryResult(this.queryID, this.queryCriteria)
            .subscribe( 
                data => {  
                    this.resultInventory = data; 
                    console.log(this.resultInventory);
                }, // put the data returned from the server in our variable
                error => {
                      // console.log('Error HTTP GET Service ' + error + JSON.stringify(error)); // in case of failure show this message
                      //this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
                },
                () => { //this._messageService.add({severity:'warn', summary:'Info Message', detail: 'Retrieved ' + 
                        //             this.searchResult.length + ' reference(s).'});
                }));
  }

  ngOnInit() {

  }

  menuSelectionEvent(menuEntry) {
    this.menuSelection.emit(menuEntry);
  }

  isInventoryDate(date) {
    //console.log(this.eventsCnt, date, this.eventsCnt.indexOf((date.month+1) + '/' + date.day + '/' + date.year));
    return this.eventsCnt.indexOf((date.month+1) + '/' + date.day + '/' + date.year) >= 0 ;
  }

  getStatus(status: string) {
    switch (status) {
        case 'CLOSED':
            return 'success';
        case 'OPEN':
            return 'danger';
        case 'IN PROGRESS':
            return 'warning';
    }
  }
}