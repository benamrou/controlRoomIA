import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'toolbar-component',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
})

export class ToolbarOneWayComponent implements OnInit {

  @Output() menuSelection = new EventEmitter<string>();

  isSupported = false;
  storesListDisplay: any[] = [];
  selectedStore: any;

  zoneDisplayed: number =0;
  DASHBOARD_AREA : number=0;
  INVENTORY_AREA : number=1;
  HISTORY_AREA : number=2;
  QUIT : number=0;

  enableDashboard: boolean = false;

  constructor(public _userService: UserDataService, public router: Router) {
    this.storesListDisplay =  this._userService.storeAccess.map(item => item.storeDisplay);
    this.selectedStore=this._userService.selectedStore['storeDisplay'];
  }

  ngOnInit() {

  }

  menuSelectionEvent(menuEntry) {
    console.log('toolbar emit', menuEntry);
    this.menuSelection.emit(menuEntry);
  }

  quit() {
    console.log('Quit');
    this.router.navigate(['/login']);
  }
}