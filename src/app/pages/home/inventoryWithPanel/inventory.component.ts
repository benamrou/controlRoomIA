import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserDataService, QueryService } from 'src/app/services';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'inventory-component',
  templateUrl: 'inventory.component.html',
  styleUrls: ['inventory.component.scss']
})

export class InventoryComponent implements OnInit {

  @Output() menuSelection = new EventEmitter<string>();
  @ViewChild('resultTable') dataTable: Table;

  
  products : any = [];
  public dbProducts: any = [];
  displayedProducts: any[];
  qtyProducts: any [];
  productSelected;
  searchElement: any;

  supplierList: any[];
  activeIndex: any;

  csvButtonTooltip = 'tooltip'
  sortByOption: any[] = [];
  sortedBy: any;

  filterByOption: any[] = [];
  filterBy: any =[];

  queryInventoryDSD : string = 'ONE0000001';
  subscription: any[] = [];
  loadingComplete: boolean =  false;

  colsTable: any[]=[];
  totalSKU: number = 0;
  totalCS: number = 0;
  totalWeight: number = 0;
  totalInventory: number = 0;

  optionArea: any[] =  [
    { label: 'BACKROOM', value: 'BACKROOM' },
    { label: 'SALE AREA', value: 'SALE AREA' },
  ];
  selectedArea: string='BACKROOM';

  optionCounting: any[] =  [
    { label: 'BY UNIT', value: 'unit' },
    { label: 'WEIGHT', value: 'weight' },
  ];
  selectedCounting: string='unit';

  constructor(public _userService: UserDataService, private _queryService : QueryService,
              private http: HttpClient) {
    this.loadingComplete = false;
    this.products = [];

    this.sortByOption=['SORT BY: ITEM CODE','SORT BY: ITEM DESCRIPTION', 'SORT BY: CASE COST DESC'];
    
    this.sortedBy=this.sortByOption[0];

    this.filterByOption=[
                          { name: 'FILTER ON: NOT COUNTED', code:'NOT COUNTED'},
                          { name: 'FILTER ON: UNKNOWN', code:'UNKNOWN'},
                          { name: 'FILTER ON: COUNTED', code:'COUNTED'},
                          { name: 'FILTER ON: COUNTED UNIT', code:'UNIT'},
                          { name: 'FILTER ON: COUNTED WEIGHT', code:'WEIGHT'}];

    this.filterBy=[];
            
    this.colsTable = [
      { field: 'itemCode', header: 'ITEM', align:'left', width: '35%', paddingleft : "1em"},
      { field: 'back', header: 'BACKROOM', align:'center', width: '15%', paddingleft : "unset"},
      { field: 'sale', header: 'SALE AREA', align:'center', width: '15%', paddingleft : "unset"},
      { field: 'total', header: 'TOTAL COUNT', align:'center', width: '15%', paddingleft : "unset"},
      { field: 'inventory', header: 'INVENTORY', align:'center', width: '15%', paddingleft : "unset"}
    ];
  }

  ngOnInit() {

    /** Get item list */
    this.subscription.push(
      //this._queryService.getQueryResult(this.queryInventoryDSD, [])
      this.http.get('./assets/data/products.json')
            .subscribe( 
                data => {  
                  console.log('Data:', data);
                    this.products = [];
                    this.products.push(data); 
                    let all = [{ name: 'ALL',
                                code: '-1',
                                desc: 'ALL',
                                addressChain: '-1',
                                contract: '-1'
                            }];
                    this.supplierList = this.products[0].map(obj => 
                                              ({ name: obj.supplierCode + '/' + obj.contract + ' | ' + obj.supplierDesc,
                                                 supplierCode: obj.supplierCode,
                                                 desc: obj.supplierDesc,
                                                 addressChain: obj.addressChain,
                                                 contract: obj.contract
                                              })
                                      );
                    this.qtyProducts = this.products[0].map(obj => 
                              ({ itemCode:  obj.itemCode,
                              })
                      );
                    /* Remove duplicate in supplierList */
                    this.supplierList = this.supplierList.filter((obj1, i, arr) => 
                        this.supplierList.findIndex(obj2 => 
                          JSON.stringify(obj2) === JSON.stringify(obj1)
                        ) === i
                      );
                      this.supplierList.sort((a,b)=>a.name > b.name ? 1 : -1);
                      //this.supplierList=[...all,... this.supplierList];
                      this.supplierList=all;

                      for (let i=0; i < this.supplierList.length ; i++) {
                        if (i != 0) /* ALL */ {
                          this.products.push(this.products[0].filter(el => 
                                  el.supplierCode == this.supplierList[i].supplierCode &&
                                  el.addressChain == this.supplierList[i].addressChain &&
                                  el.contract == this.supplierList[i].contract
                          ));
                        }
                      }

                      console.log('Done prep data', this.products);
                      this.displayedProducts=this.products[0];
                }, // put the data returned from the server in our variable
                error => {
                      // console.log('Error HTTP GET Service ' + error + JSON.stringify(error)); // in case of failure show this message
                      //this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
                },
                () => {
                  this.loadingComplete = true;
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
    console.log('Filter:');
  }

  onRowSelect(e) {

  }

  onRowUnselect(e) {

  }
  selectVendor(e) {
    this.displayedProducts=this.products[this.activeIndex];
    console.log('Activeindex: ' , this.activeIndex, this.displayedProducts);
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
    for (let i=0; i <= this.displayedProducts.length; i ++) {
      this.totalSKU = this.totalSKU + this.displayedProducts[i].BACKROOM_SKU + this.displayedProducts[i].SALE_SKU ;
      this.totalCS = this.totalCS + this.displayedProducts[i].BACKROOM_CASE + this.displayedProducts[i].SALE_CASE ;
      this.totalWeight = this.totalWeight+this.displayedProducts[i].BACKROOM_LBS + this.displayedProducts[i].SALE_LBS;
      this.totalInventory = this.totalInventory+
                            this.displayedProducts[i].GROSS_UNIT*this.displayedProducts[i].BACKROOM_SKU + 
                            this.displayedProducts[i].SALE_WEIGHT*this.displayedProducts[i].SALE_SKU;
    }
  }

  loadProductsLazy(event: TableLazyLoadEvent) {
    //simulate remote connection with a timeout
    setTimeout(() => {
        //load data of required page
        this.displayedProducts = this.dbProducts.slice(event.first, event.first + event.rows);

        //trigger change detection
        event.forceUpdate();
    }, Math.random() * 1000 + 250);

  }

  pressNum(a) {

  }
}
