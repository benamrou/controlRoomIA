import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'history-component',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss'],
})

export class HistoryComponent implements OnInit {

  @Output() menuSelection = new EventEmitter<string>();

  constructor(public _userService: UserDataService) {
  }

  ngOnInit() {

  }

  menuSelectionEvent(menuEntry) {
    this.menuSelection.emit(menuEntry);
  }
}