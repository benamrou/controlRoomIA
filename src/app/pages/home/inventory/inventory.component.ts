import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserDataService, QueryService } from 'src/app/services';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClickType, ColumnMode } from '@swimlane/ngx-datatable';
import { Table } from 'primeng/table';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { NgIf } from '@angular/common';

@Component({
  selector: 'inventory-component',
  imports: [NgIf],
  templateUrl: 'inventory.component.html',
  styleUrls: ['inventory.component.scss']
})

export class InventoryComponent implements OnInit {

  @Output() menuSelection = new EventEmitter<string>();
  @ViewChild('resultTable') dataTable: Table;
  @ViewChild('filterList') filterListDiv: ElementRef;
  @ViewChild('sortList') sortListDiv: ElementRef;

  public dbProducts: any = [];
  displayedProducts: any[] = [];
  qtyProducts: any [];
  productSelected;
  searchElement: any;

  cpt: number=0;

  supplierList: any[];
  activeIndex: any;

  csvButtonTooltip = 'tooltip'
  sortByOption: any[] = [];
  sortedBy: any = null;
  sortDisplay: boolean = false;

  filterByOption: any[] = [];
  filterBy: any =[];
  filterDisplay : boolean=false;

  queryInventoryDSD : string = 'ONE0000001';
  subscription: any[] = [];
  loadingComplete: boolean =  false;

  colsTable: any[]=[];
  totalSKU: number = 0;
  totalCS: number = 0;
  totalWeight: number = 0;
  totalInventory: number = 0;

  rowActiveIndex: any;

  optionArea: any[] =  [
    { label: 'BACKROOM', value: 'BACKROOM' },
    { label: 'SALE AREA', value: 'SALE AREA' },
  ];
  selectedArea: string='BACKROOM';

  optionCounting: any[] =  [
    { label: 'BY UNIT', value: 'UNIT' },
    { label: 'WEIGHT', value: 'WEIGHT' },
  ];
  selectedCounting: string='UNIT';

  constructor(public _userService: UserDataService, private _queryService : QueryService,
              private http: HttpClient) {
    this.loadingComplete = false;
    this.filterByOption=[
                          { name: 'FILTER ON: NOT COUNTED', code:'NOT COUNTED'},
                          { name: 'FILTER ON: UNKNOWN', code:'UNKNOWN'},
                          { name: 'FILTER ON: COUNTED', code:'COUNTED'},
                          { name: 'FILTER ON: COUNTED UNIT', code:'UNIT'},
                          { name: 'FILTER ON: COUNTED WEIGHT', code:'WEIGHT'}];
    this.sortByOption=[
                          { name: 'SORT BY: ITEM CODE', code:'ITEM CODE'},
                          { name: 'SORT BY: ITEM DESCRIPTION', code:'ITEM DESC'},
                          { name: 'SORT BY: CASE COST', code:'CASE COST'}];

    this.filterBy=[];
    this.sortedBy= null;
            
    this.colsTable = [
      { field: 'itemCode', header: 'ITEM', align:'left', width: '35%', paddingleft : "1em"},
      { field: 'back', header: 'BACKROOM', align:'center', width: '15%', paddingleft : "unset"},
      { field: 'sale', header: 'SALE AREA', align:'center', width: '15%', paddingleft : "unset"},
      { field: 'total', header: 'TOTAL COUNT', align:'center', width: '15%', paddingleft : "unset"},
      { field: 'inventory', header: 'INVENTORY', align:'center', width: '15%', paddingleft : "unset"}
    ];
  }

  ngOnInit() {

    let storeInventory = [];
    storeInventory.push(this._userService.selectedStore['storeNum']);
    this.displayedProducts = [];
    /** Get item list */
    this.subscription.push(
      //this._queryService.getQueryResult(this.queryInventoryDSD, storeInventory)
      this.http.get('./assets/data/products.json')
            .subscribe( 
                data => {  
                    this.dbProducts = data;
                    this.displayedProducts = this.dbProducts ;
                    this.displayedProducts.map((obj) => {
                      obj.costUsed = 'Store WAC';
                      obj.unitCost = obj.storeWAC;
                      if(obj.storeWAC == 0) {
                        obj.costUsed = 'Unit cost';
                        obj.unitCost = obj.grossUnit
                      }
                      return obj;
                  })

                }, // put the data returned from the server in our variable
                error => {
                      // console.log('Error HTTP GET Service ' + error + JSON.stringify(error)); // in case of failure show this message
                      //this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
                },
                () => {
                  this.loadingComplete = true;
                  console.log('Done prep data', this.loadingComplete, this.displayedProducts);

                  //this._messageService.add({severity:'warn', summary:'Info Message', detail: 'Retrieved ' + 
                  //                   this.searchResult.length + ' reference(s).'});
    }));

  }

  menuSelectionEvent(menuEntry) {
    this.menuSelection.emit(menuEntry);
  }

  scan() {

  }

  getSeverity(item) {
    return 'success';
  }

  filterChange() {
    console.log('Filter:', this.filterBy);
  }

  sortChange() {
    console.log('Sort:', this.sortedBy);
  }

  onRowSelect(e) {
    this.rowActiveIndex = this.dataTable.value.indexOf(this.dataTable.selection);
    console.log('rowActiveIndex', this.rowActiveIndex);
  }

  trackByFunction = (index, item) => {
    return item.id // O index
}

  onRowUnselect(e) {

  }

  showFilter() {
    this.filterDisplay = true;
  }

  showSort() {
    this.sortDisplay = true;
  }

  searchInTable(e) {
    this.dataTable.filterGlobal(e.target.value,'contains');
    //this.dataTable.scroller.scrollHeight = '70vh';
  }

  getTarget(target: EventTarget | null): HTMLInputElement {
    return target as HTMLInputElement;
  }

  recalculate() {
    this.totalCS = 0;
    this.totalSKU = 0;
    this.totalWeight = 0;
    this.totalInventory = 0;
    for (let i=0; i < this.displayedProducts.length; i ++) {
      //console.log(this.displayedProducts[i]);
      /* Display */
      this.displayedProducts[i].BACKROOM_CASE_DISP = Math.ceil(this.displayedProducts[i].BACKROOM_CASE + this.displayedProducts[i].BACKROOM_SKU/this.displayedProducts[i].pack);
      this.displayedProducts[i].BACKROOM_LBS_DISP = this.displayedProducts[i].BACKROOM_LBS;
      this.displayedProducts[i].SALE_CASE_DISP = Math.ceil(this.displayedProducts[i].SALE_CASE + this.displayedProducts[i].SALE_SKU/this.displayedProducts[i].pack);
      this.displayedProducts[i].SALE_LBS_DISP = this.displayedProducts[i].SALE_LBS;

      this.displayedProducts[i].TOTAL_LBS = this.displayedProducts[i].SALE_LBS + this.displayedProducts[i].BACKROOM_LBS;
      this.displayedProducts[i].TOTAL_CASE = this.displayedProducts[i].SALE_CASE + this.displayedProducts[i].BACKROOM_CASE;
      this.displayedProducts[i].TOTAL_UNIT = this.displayedProducts[i].SALE_SKU + this.displayedProducts[i].BACKROOM_SKU +
          this.displayedProducts[i].SALE_CASE*this.displayedProducts[i].pack + 
          this.displayedProducts[i].BACKROOM_CASE**this.displayedProducts[i].pack;
      this.displayedProducts[i].TOTAL_SKU = this.displayedProducts[i].SALE_SKU + this.displayedProducts[i].BACKROOM_SKU;
      this.displayedProducts[i].TOTAL_COST =  this.displayedProducts[i].grossUnit*this.displayedProducts[i].BACKROOM_SKU + 
                                              this.displayedProducts[i].grossCost*this.displayedProducts[i].BACKROOM_CASE + 
                                              this.displayedProducts[i].lbsCost*this.displayedProducts[i].BACKROOM_LBS + 
                                              this.displayedProducts[i].grossUnit*this.displayedProducts[i].SALE_SKU + 
                                              this.displayedProducts[i].grossCost*this.displayedProducts[i].SALE_CASE + 
                                              this.displayedProducts[i].lbsCost*this.displayedProducts[i].SALE_LBS;

      /** Total */
      this.totalSKU = this.totalSKU + this.displayedProducts[i].BACKROOM_SKU + this.displayedProducts[i].SALE_SKU ;
      this.totalCS =  this.totalCS + 
                      Math.ceil(this.displayedProducts[i].BACKROOM_CASE + this.displayedProducts[i].BACKROOM_SKU/this.displayedProducts[i].pack) +
                      Math.ceil(this.displayedProducts[i].SALE_CASE + this.displayedProducts[i].SALE_SKU/this.displayedProducts[i].pack);

      this.totalWeight = this.totalWeight +
                          (this.displayedProducts[i].BACKROOM_CASE*this.displayedProducts[i].pack*+
                          this.displayedProducts[i].BACKROOM_SKU)*this.displayedProducts[i].skuWeight+
                          (this.displayedProducts[i].SALE_CASE*this.displayedProducts[i].pack*+
                            this.displayedProducts[i].SALE_SKU)*this.displayedProducts[i].skuWeight+
                            this.displayedProducts[i].BACKROOM_LBS+
                            this.displayedProducts[i].SALE_LBS;
      this.totalInventory = this.totalInventory +
                            this.displayedProducts[i].grossUnit*this.displayedProducts[i].BACKROOM_SKU + 
                            this.displayedProducts[i].grossCost*this.displayedProducts[i].BACKROOM_CASE + 
                            this.displayedProducts[i].lbsCost*this.displayedProducts[i].BACKROOM_LBS + 
                            this.displayedProducts[i].grossUnit*this.displayedProducts[i].SALE_SKU + 
                            this.displayedProducts[i].grossCost*this.displayedProducts[i].SALE_CASE + 
                            this.displayedProducts[i].lbsCost*this.displayedProducts[i].SALE_LBS;
      
    }
  }

  /****************************** */
  /** LAZY LOAD - NOT OPERATIONAL */
  /****************************** */
  loadProductsLazy(event: TableLazyLoadEvent) {
    console.log('Lazy load')
    //simulate remote connection with a timeout
    setTimeout(() => {
       console.log('Lazy load', event.first, event.rows);
        //load data of required page
        let nextLoad = this.dbProducts.slice(event.first, event.first + event.rows);
        console.log('Lazy load', nextLoad);

        //populate page of virtual cars
        this.displayedProducts = [this.displayedProducts.length, ...nextLoad];

        //trigger change detection
        this.displayedProducts = [...this.displayedProducts];
    }, Math.random() * 1 + 25);

  }

  onKeyDown(event) {
    console.log('key pressed :', event)
    if(event.code == 'Digit1' || event.code == 'Digit2' || event.code == 'Digit3' || event.code == 'Digit4' || event.code == 'Digit5' ||
       event.code == 'Digit6' || event.code == 'Digit7' || event.code == 'Digit8' || event.code == 'Digit9' || event.code == 'Digit0' ||
       event.code == 'Period' || event.code == 'Backspace') {
        this.pressNum(event.key);
    }
  }
  
  /************************************ */
  /** Screen keyboard management */
  /************************************ */
  pressNum(numPressed) {
    switch(numPressed) {
      case 'up':
        let evUp = new KeyboardEvent('keydown', { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38 });
        //element.dispatchEvent(evUp);

        this.dataTable.selection = this.navigateItem(-1);
        this.dataTable.onRowSelect.emit({originalEvent: evUp, data: this.dataTable.selection, type: 'row'});
        this.productSelected = this.dataTable.selection;
        this.dataTable.scrollTo(this.dataTable.value.indexOf(this.productSelected));
        evUp.preventDefault();
        break;
      case 'down':
        let evDown = new KeyboardEvent('keydown', {  key: 'ArrowDown', code: 'ArrowDown', keyCode: 40 });
        this.dataTable.selection = this.navigateItem(1);
        this.dataTable.onRowSelect.emit({originalEvent: evDown, data: this.dataTable.selection, type: 'row'});
        this.productSelected = this.dataTable.selection;
        this.dataTable.scrollTo(this.dataTable.value.indexOf(this.productSelected));
        evDown.preventDefault();

        break;
      case 'Period':
        if (this.selectedArea == 'BACKROOM' && this.selectedCounting == 'WEIGHT') {
            if (this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS.toString().includes('.')) {
              return;
            }
            this.displayedProducts[this.rowActiveIndex].BACKROOM_DECIMAL =1;
            this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS= 
              parseFloat(this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS + numPressed + '00');
          }
        else {
          if (this.selectedArea == 'SALE AREA' && this.selectedCounting == 'WEIGHT') {
            if (this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS.toString().includes('.')) {
              return;
            }
              this.displayedProducts[this.rowActiveIndex].SALE_DECIMAL =1;
              this.displayedProducts[this.rowActiveIndex].SALE_LBS= 
              parseFloat(this.displayedProducts[this.rowActiveIndex].SALE_LBS + numPressed + '00');
              parseFloat(this.displayedProducts[this.rowActiveIndex].SALE_LBS + numPressed);
            }
          }
        break;
      case 'Backspace':
          /* BACKROOM */
          if (this.selectedArea == 'BACKROOM') {
            if(this.selectedCounting == 'UNIT') {
              if (this.displayedProducts[this.rowActiveIndex].BACKROOM_SKU <10) {
                this.displayedProducts[this.rowActiveIndex].BACKROOM_SKU = 0;
              }
              else {
                this.displayedProducts[this.rowActiveIndex].BACKROOM_SKU= 
                  parseInt(this.displayedProducts[this.rowActiveIndex].BACKROOM_SKU.toString().slice(0,-1));
              }
            }
            else { /* WEIGHT */
              if (this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS <10 && this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS.toString().indexOf(".") == -1) {
                this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS = 0;
              }
              else {
                let character = this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS.toString().slice(0,-1);
                this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS= 
                  parseInt(this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS.toString().slice(0,-1));
                if(character == '.') {
                  this.displayedProducts[this.rowActiveIndex].BACKROOM_DECIMAL=0;
                }
              }
            }
          }
          /** SALE AREA */
          else {
            if (this.selectedArea == 'SALE AREA') {
              if(this.selectedCounting == 'UNIT') {
                if (this.displayedProducts[this.rowActiveIndex].SALE_SKU <10) {
                  this.displayedProducts[this.rowActiveIndex].SALE_SKU = 0;
                }
                else {
                  this.displayedProducts[this.rowActiveIndex].SALE_SKU= 
                    parseInt(this.displayedProducts[this.rowActiveIndex].SALE_SKU.toString().slice(0,-1));
                }
              }
              else { /* WEIGHT */
                if (this.displayedProducts[this.rowActiveIndex].SALE_LBS <10 && this.displayedProducts[this.rowActiveIndex].SALE_LBS.toString().indexOf(".") == -1) {
                  this.displayedProducts[this.rowActiveIndex].SALE_LBS = 0;
                }
                else {
                  let character = this.displayedProducts[this.rowActiveIndex].SALE_LBS.toString().slice(0,-1);
                  this.displayedProducts[this.rowActiveIndex].SALE_LBS= 
                    parseInt(this.displayedProducts[this.rowActiveIndex].SALE_LBS.toString().slice(0,-1));
                  if(character == '.') {
                    this.displayedProducts[this.rowActiveIndex].BACKROOM_DECIMAL=0;
                  }
                }
              }
            }
          }
          break;
      default:
            if (this.selectedArea == 'BACKROOM') {
              if(this.selectedCounting == 'UNIT') {
                this.displayedProducts[this.rowActiveIndex].BACKROOM_SKU= 
                  parseInt(this.displayedProducts[this.rowActiveIndex].BACKROOM_SKU + numPressed);
              }
              else { /* WEIGHT */
                if (this.displayedProducts[this.rowActiveIndex].BACKROOM_DECIMAL == 1) {
                  this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS= parseFloat(this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS + '.' + numPressed);
                  this.displayedProducts[this.rowActiveIndex].BACKROOM_DECIMAL = 0;
                } 
                else {
                  this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS= 
                  parseFloat(this.displayedProducts[this.rowActiveIndex].BACKROOM_LBS + numPressed);
                }
              }
            }
            else {
              if (this.selectedArea == 'SALE AREA') {
                if(this.selectedCounting == 'UNIT') {
                  this.displayedProducts[this.rowActiveIndex].SALE_SKU= 
                    parseInt(this.displayedProducts[this.rowActiveIndex].SALE_SKU + numPressed);

                  console.log('Updating sale area unit', this.displayedProducts[this.rowActiveIndex].SALE_SKU);
                }
                else { /* WEIGHT */
                  if (this.displayedProducts[this.rowActiveIndex].SALE_DECIMAL == 1) {
                    this.displayedProducts[this.rowActiveIndex].SALE_LBS= parseFloat(this.displayedProducts[this.rowActiveIndex].SALE_LBS + '.' + numPressed);
                    this.displayedProducts[this.rowActiveIndex].SALE_DECIMAL = 0;
                  }
                  else {
                    this.displayedProducts[this.rowActiveIndex].SALE_LBS= 
                    parseFloat(this.displayedProducts[this.rowActiveIndex].SALE_LBS + numPressed);
                  }
                }
              }
            }
        break;
    }
    console.log('data', this.displayedProducts[this.rowActiveIndex]);
    this.recalculate();
  }


  pressNumByCase(coefficient) {
    switch(coefficient) {
      case 0:
            if (this.selectedArea == 'BACKROOM') {
              this.displayedProducts[this.rowActiveIndex].BACKROOM_CASE= 0;
            }
            else {
              if (this.selectedArea == 'SALE AREA') {
                  this.displayedProducts[this.rowActiveIndex].SALE_CASE= 0;
                }
              }
      break;
      default:
            if (this.selectedArea == 'BACKROOM') {
                this.displayedProducts[this.rowActiveIndex].BACKROOM_CASE= 
                  this.displayedProducts[this.rowActiveIndex].BACKROOM_CASE+coefficient;
            }
            else {
              if (this.selectedArea == 'SALE AREA') {
                  this.displayedProducts[this.rowActiveIndex].SALE_CASE= 
                    this.displayedProducts[this.rowActiveIndex].SALE_CASE+coefficient;
                }
              }
        break;
    }
    this.recalculate();
  }

  /************************************ */
  /** Up/Down management */
  /************************************ */
  @HostListener('keydown.ArrowUp', ['$event']) ArrowUp($event: KeyboardEvent) {
    console.log('event:', event);
    this.dataTable.selection = this.navigateItem(-1);
    this.dataTable.onRowSelect.emit({originalEvent: $event, data: this.dataTable.selection, type: 'row'});
    this.productSelected = this.dataTable.selection;
    console.log('row selected',this.productSelected, $event);

    event.preventDefault();
    //this.doScroll();
  }

  @HostListener('keydown.ArrowDown', ['$event']) ArrowDown($event: KeyboardEvent) {
      this.dataTable.selection = this.navigateItem(1);
      this.dataTable.onRowSelect.emit({originalEvent: $event, data: this.dataTable.selection, type: 'row'});
      this.productSelected = this.dataTable.selection;
      console.log('row selected',this.productSelected);
      event.preventDefault();
      //this.doScroll();
  }

  navigateItem(num) {
      if (!this.dataTable.selection) { return; }
      const i = this.dataTable.value.indexOf(this.dataTable.selection);
      const len = this.dataTable.value.length;
      console.log('i+num)',i, num, i+num, len, (i + num) % len, this.dataTable.value[(i + num) % len]);
      if (num > 0) {
          return this.dataTable.value[(i + num) % len];
      }
      if (i+num < 0) {
        return this.dataTable.value[i];
      }
      return this.dataTable.value[(i + num)];
  }

  private doScroll(num) {
      let index = this.dataTable.selection ? this.dataTable.value.findIndex(item => item.id == this.dataTable.selection.id) : 0;
      let scrollBodyEl = this.dataTable.el.nativeElement.getElementsByClassName('p-scroller-viewport')[0];
      console.log('scrollBodyEl :', scrollBodyEl)
      let tbodyEl = scrollBodyEl.getElementsByClassName('ui-table-tbody')[0];
      console.log('tbodyEl :', tbodyEl);

      /*if (!tbodyEl.children.length)
          return;
      let rowEl = tbodyEl.children[index];
      if (rowEl.offsetTop < scrollBodyEl.scrollTop)
          scrollBodyEl.scrollTop = rowEl.offsetTop;
      else if ((rowEl.offsetTop + rowEl.offsetHeight) > (scrollBodyEl.scrollTop + scrollBodyEl.offsetHeight - 17)) {
          scrollBodyEl.scrollTop += rowEl.offsetTop + rowEl.offsetHeight - scrollBodyEl.scrollTop - scrollBodyEl.offsetHeight + 17;
      }*/
  }

  /************************************ */
  /** DONE - Up/Down management */
  /************************************ */


  /************************************ */
  /** Click management */
  /************************************ */
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
     if (this.filterDisplay) {
      console.log('event mouse', event.toElement, this.filterListDiv)
      if (!event.toElement.outerHTML.includes('FILTER')) {
         // clicked outside => close dropdown list
       this.filterDisplay = false;
      }
    }
     if (this.sortDisplay) {
      console.log('event mouse', event.toElement, this.sortListDiv)
      if (!event.toElement.outerHTML.includes('SORT')) {
         // clicked outside => close dropdown list
       this.sortDisplay = false;
      }
     }
  }

  customSort(event: SortEvent) {
    // Do no sorting if sort field not specified
    if (!event.field) {
      return;
    }

    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
    // Force deselect rows to recalculate the rowindex
    this.productSelected = null;
  }

  wacOverride() {
    console.log('wacOverride');
  }
}
