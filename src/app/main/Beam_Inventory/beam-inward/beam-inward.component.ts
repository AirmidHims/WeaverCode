import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { AdvanceDataStored } from 'app/main/Invoice/advance';
import { BeamInventoryService } from '../beam-inventory.service';
import { EditBeamInwardComponent } from '../edit-beam-inward/edit-beam-inward.component';
import { NewBramInventoryComponent } from './new-bram-inventory/new-bram-inventory.component';

@Component({
  selector: 'app-beam-inward',
  templateUrl: './beam-inward.component.html',
  styleUrls: ['./beam-inward.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class BeamInwardComponent implements OnInit {

  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  sIsLoading: string = '';
  isLoading = true;
  registerObj:any;
  Totalbeamt:any;
  TotalBag:any;
  TotalWeight:any;
  Totalamount:any;
  totalCuts: any = 0;
  totalprodmeters: any = 0;
  totalweftcon: any = 0;
  BalanceMeters:any;
  Totalbeammtrs:any;
  Totalweftcons:any;
  Totalproduction:any;
  Totalcuts:any;
  Prerecmtrs:any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;

  displayedColumns = [
  
    'BeamInwardID',
    'BeamInwardCode',
    'BeamInwardDate',
    'ChallanNo',

    'ChallanDate',
    'PartyName',
    'BrokerName',
    'PartySetNo',

    
    'ContractBookingId',
    'ContractDate',
    'ContractMeters',
    'CurrentMeters',

    'PreviousMeters',
    'BalanceMeters',
    'TotalCuts',
    'TotalBeamMeters',

    'TotalProductionMeters',
    'TotalWeftCons',
    'VehicleNo',
    'Remark',

    // 'UpdatedBy',
    // 'UpdatedOn',
    // 'IsActive',
  'action'
  ];
  dataSource = new MatTableDataSource<BeamInward>();
  menuActions: Array<string> = [];

  
  constructor(public _BeaminventoryService: BeamInventoryService,
    private _ActRoute: Router,
    public _matDialog: MatDialog,
    private advanceDataStored: AdvanceDataStored,
    public datePipe: DatePipe,
    private accountService: AuthenticationService,
    private _fuseSidebarService: FuseSidebarService,
  ) { }
  D_data1: any;
  ngOnInit(): void {
   
    var D_data = {
      "Keyword": '',//this._OtherinfoMasterService.Searchform.get("Keyword").value + '%' || '%',
      "From_Dt" :'',// this.datePipe.transform(this._OtherinfoMasterService.Searchform.get("start").value,"MM-dd-yyyy") || "01/01/1900",
      "To_Dt" :'',// this.datePipe.transform(this._OtherinfoMasterService.Searchform.get("end").value,"MM-dd-yyyy") || "01/01/1900", 
    
    }
    console.log(D_data);
    this.D_data1 = D_data;
    this._BeaminventoryService.getBeamInventoryList(D_data).subscribe(Visit => {
      this.dataSource.data = Visit as BeamInward[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
      this.getCutsSum(this.dataSource.data);
      this.getTotalMeterSum(this.dataSource.data);
      this.getProductionSum(this.dataSource.data);
      this.geWeftconSum(this.dataSource.data);
      console.log(this.dataSource.data);
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });


  }

  


  getBeammasterList() {
    //  debugger;
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Keyword": '',//this._OtherinfoMasterService.Searchform.get("Keyword").value + '%' || '%',
      "From_Dt" :'',// this.datePipe.transform(this._OtherinfoMasterService.Searchform.get("start").value,"MM-dd-yyyy") || "01/01/1900",
      "To_Dt" :'',// this.datePipe.transform(this._OtherinfoMasterService.Searchform.get("end").value,"MM-dd-yyyy") || "01/01/1900", 
    
 
    }
    
    this._BeaminventoryService.getBeamInventoryList(D_data).subscribe(Visit => {
      this.dataSource.data = Visit as BeamInward[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });
  }


  

  onSearch() {
    this.getBeammasterList();

  }



  NewBeammaster() {
    const dialogRef = this._matDialog.open(NewBramInventoryComponent,
      {
        maxWidth: "98%",
        height: '98%',
        width: '100%',
        // height: "100%"
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);
      this.getBeammasterList();
    });
  }


 
  getCutsSum(element) {
    debugger;
    console.log(element);
    let netAmt;
    
    netAmt = element.reduce((sum, { TotalCuts }) => sum += +(TotalCuts || 0), 0);

    this.Totalcuts = netAmt;
    console.log(this.totalCuts);

  }

  getTotalMeterSum(element) {
    debugger;
    let netAmt;
    netAmt = element.reduce((sum, { TotalBeamMeters }) => sum += +(TotalBeamMeters || 0), 0);
    this.Totalbeammtrs = netAmt;


  }

  getProductionSum(element) {
    debugger;
    let netAmt;
    netAmt = element.reduce((sum, { TotalProductionMeters }) => sum += +(TotalProductionMeters || 0), 0);

    this.Totalproduction = netAmt;


  }

  geWeftconSum(element) {
    debugger;
    let netAmt;
    netAmt = element.reduce((sum, { TotalWeftCons }) => sum += +(TotalWeftCons || 0), 0);

    this.Totalweftcons = netAmt;


  }
  getMeterSum() {
    let netAmt;
    netAmt = this.BalanceMeters - this.Prerecmtrs

    this.BalanceMeters = netAmt;

  }


  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  onClose() {
    // this.dialogRef.close();
  }

  onSubmit() { }

  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    this.dateTimeObj = dateTimeObj;
  }



  onEdit(row){
    console.log(row);
      var m_data = {
     

        "Beaminwardid":row.BeamInwardID,
        "Inwardtime":row.BeamInwardTime,
        "Inwarddate":row.BeamInwardDate,
        "Gpchalno":row.ChallanNo,
        "Chaldate":row.ChallanDate,
        "Partyname":row.BeamId,
        "PartyID":row.PartyId,
        "Sizingname":row.BeamId,
        "SizingID":row.SizingId,
        "Partysetno":row.PartySetNo,
        "BalanceMeters":row.BalanceMeters,
        "Contractno":row.BeamId,
        "Contactdate":row.ContractDate,
        "Contmeters":row.ContractMeters,
        "ContractBookingId":row.ContractBookingId,
        "Currrecmtrs":row.CurrentMeters,
        "PreviousMeters":row.PreviousMeters,
        "Totalcuts":row.TotalCuts,
        "Totalbeammtrs":row.TotalBeamMeters,
        "Totalproduction":row.TotalProductionMeters,
        "Totalweftcons":row.TotalWeftCons,
        "TransportID":row.TransportID,
        "Vechicleno":row.VehicleNo,
        "Remark":row.Remark,
        
      }
    
      console.log(m_data);
      // this._BeaminventoryService.populateFormBeam(m_data);
      
      const dialogRef = this._matDialog.open(EditBeamInwardComponent, 
        {  
          maxWidth: "98%",
          height: '98%',
          width: '100%',
             data : {
            registerObj : m_data,
          }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        this.getBeammasterList();
      });
    }


  onClear() {

    this._BeaminventoryService.searchinventoryform.get('BeamCode').reset();
 

  }
// Delete row in datatable level
  ondelete(element){
 
// debugger;
// //  let Query = "Select DischargeId from Discharge where  AdmissionID=" + this.selectedAdvanceObj.AdmissionID + " ";

//  let "Query ="update Beammaster set isActive=0 where yID=" +element.yID + "";
// console.log(Query);
//  this._BeaminventoryService.getDeleteBeammaster(Query).subscribe(data => {
//   if(data)
//   Swal.fire('Success !', 'ChargeList Row Deleted Successfully', 'success');
  
//   //  console.log(this.DischargeId);
//  });
  }


  onExport(exprtType){
    // debugger;
    // let columnList=[];
    // if(this.dataSource.data.length == 0){
    //   // this.toastr.error("No Data Found");
    //   Swal.fire('Error !', 'No Data Found', 'error');
    // }
    // else{
    //   var excelData = [];
    //   var a=1;
    //   for(var i=0;i<this.dataSource.data.length;i++){
    //     let singleEntry = {
    //       // "Sr No":a+i,

      
    //       "yID" :this.dataSource.data[i]["yID"],
    //       "yName" :this.dataSource.data[i]["yName"] ? this.dataSource.data[i]["yName"]:"N/A",
    //       "yCode" :this.dataSource.data[i]["yCode"] ? this.dataSource.data[i]["yCode"]:"N/A",
    //       "yPly" :this.dataSource.data[i]["yPly"] ? this.dataSource.data[i]["yPly"] :"N/A",
    //       "yType" :this.dataSource.data[i]["yType"] ? this.dataSource.data[i]["yType"] :"N/A",
    //       "yBlend" :this.dataSource.data[i]["yBlend"] ? this.dataSource.data[i]["yBlend"] : "N/A",
    //       "yActualCount" :this.dataSource.data[i]["yActualCount"] ? this.dataSource.data[i]["yActualCount"]:"N/A",
    //       "yDenierCount" :this.dataSource.data[i]["yDenierCount"] ? this.dataSource.data[i]["yDenierCount"]:"N/A",
    //       "createdBy" :this.dataSource.data[i]["createdBy"] ? this.dataSource.data[i]["createdBy"]:"N/A",
    //       "createdOn" :this.dataSource.data[i]["createdOn"] ? this.dataSource.data[i]["createdOn"]:"N/A",


    //     };
    //     excelData.push(singleEntry);
    //   }
    //   var fileName = "Yarn-Master-List " + new Date() +".xlsx";
    //   if(exprtType =="Excel"){
    //     const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(excelData);
    //     var wscols = [];
    //     if(excelData.length > 0){ 
    //       var columnsIn = excelData[0]; 
    //       for(var key in columnsIn){
    //         let headerLength = {wch:(key.length+1)};
    //         let columnLength = headerLength;
    //         try{
    //           columnLength = {wch: Math.max(...excelData.map(o => o[key].length), 0)+1}; 
    //         }
    //         catch{
    //           columnLength = headerLength;
    //         }
    //         if(headerLength["wch"] <= columnLength["wch"]){
    //           wscols.push(columnLength)
    //         }
    //         else{
    //           wscols.push(headerLength)
    //         }
    //       } 
    //     }
    //     ws['!cols'] = wscols;
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     XLSX.writeFile(wb, fileName);
    //   }else{
    //     let doc = new jsPDF('p','pt', 'a4');
    //     doc.page = 0;
    //     var col=[];
    //     for (var k in excelData[0]) col.push(k);
    //       console.log(col.length)
    //     var rows = [];
    //     excelData.forEach(obj => {
    //       console.log(obj)
    //       let arr = [];
    //       col.forEach(col => {
    //         arr.push(obj[col]);
    //       });
    //       rows.push(arr);
    //     });

    //     doc.autoTable(col, rows,{
    //       margin:{left:5,right:5,top:5},
    //       theme:"grid",
    //       styles: {
    //         fontSize: 3
    //       }});
    //     doc.setFontSize(3);
    //     // doc.save("Indoor-Patient-List.pdf");
    //     window.open(URL.createObjectURL(doc.output("blob")))
    //   }
    // }
  }
}


export class BeamInward {

  BeamInwardID:any;
  BeamInwardCode:any;
  BeamInwardDate:any;
  ChallanNo:any;

  ChallanDate:any;
  PartyName:any;
  BrokerName:any;
  PartySetNo:any;

  
  ContractBookingId:any;
  ContractDate:any;
  ContractMeters:any;
  CurrentMeters:any;
  PreviousMeters:any;
  BalanceMeters:any;
  TotalCuts:any;
  TotalBeamMeters:any;

  TotalProductionMeters:any;
  TotalWeftCons:any;
  VehicleNo:any;
  Remark:any;
  Created: any;
  /**
   * Constructor
   *
   * @param contact
   */
  constructor(BeamInward) {
    {
      this.BeamInwardID = BeamInward.BeamInwardID || 0;
      this.BeamInwardCode = BeamInward.BeamInwardCode || '';
      this.BeamInwardDate = BeamInward.BeamInwardDate || 0;
      this.ChallanNo = BeamInward.ChallanNo || 0;
    
      this.ChallanDate = BeamInward.ChallanDate || 0;
      this.PartyName = BeamInward.PartyName || '';
      this.BrokerName = BeamInward.BrokerName || 0;
      this.PartySetNo = BeamInward.PartySetNo || 0;
    
      this.ContractBookingId = BeamInward.ContractBookingId || 0;
      this.ContractDate = BeamInward.ContractDate || '';
      this.ContractMeters = BeamInward.ContractMeters || 0;
      this. CurrentMeters = BeamInward. CurrentMeters || 0;
    
      this.TotalProductionMeters = BeamInward.TotalProductionMeters || 0;
      this.TotalWeftCons = BeamInward.TotalWeftCons || '';
      this.VehicleNo = BeamInward.VehicleNo || 0;
      this.Remark = BeamInward.Remark || 0;
    
     



    }
  }
}