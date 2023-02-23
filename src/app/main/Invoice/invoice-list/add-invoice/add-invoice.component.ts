import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { DatePipe } from '@angular/common';
import { EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { InvoiceListService } from '../../invoice-list.service';
import { takeUntil } from 'rxjs/operators';
import { ServiceMaster } from '../../invoice.model';
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewyarnComponent } from './newyarn/newyarn.component';
import { Router } from '@angular/router';
import { AdvanceDataStored } from '../../advance';


// import * as XLSX from 'xlsx';
// import Swal from 'sweetalert2';
// const jsPDF = require('jspdf');
// import 'jspdf'
// import 'jspdf-autotable'
// import { Router } from '@angular/router';
// import { AdvanceDataStored } from '../../advance';


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddInvoiceComponent implements OnInit {
  // invoiceObj = new InvoiceMaster({});


  VisitList: any;
  msg: any;
  sIsLoading: string = '';
  isLoading = true;
  isRateLimitReached = false;
  screenFromString = 'admission-form';
  PatientTypeList: any = [];

  // menuActions:Array<string> = [];
  hasSelectedContacts: boolean;
  doctorNameCmbList: any = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;

  displayedColumns = [

    'yID',
    'yName',
    'yCode',
    'yPly',
    'yType',
    'yBlend',
    'yActualCount',
    'yDenierCount',
    'isActive',
    'createdBy',
   // 'updatedBy',
    'createdOn',
    //'updatedO',
  'action'
  ];
  dataSource = new MatTableDataSource<YarnMaster>();
  menuActions: Array<string> = [];

  public doctorFilterCtrl: FormControl = new FormControl();
  public filtereddoctor: ReplaySubject<any> = new ReplaySubject<any>(1);
  private _onDestroy = new Subject<void>();


  constructor(public _InvoiceListService: InvoiceListService,
    private _ActRoute: Router,
    public _matDialog: MatDialog,
    private advanceDataStored: AdvanceDataStored,
    public datePipe: DatePipe,
    private accountService: AuthenticationService,
    private _fuseSidebarService: FuseSidebarService,
  ) { }
  D_data1: any;
  ngOnInit(): void {
    //  this.getPhoneAppointList();
    var D_data = {
      "yCode": this._InvoiceListService.mySearchform.get("yCode").value + '%' || '%',
      "yName": this._InvoiceListService.mySearchform.get("yName").value + '%' || '%',


    }
    console.log(D_data);
    this.D_data1 = D_data;
    this._InvoiceListService.getYarnlist(D_data).subscribe(Visit => {
      this.dataSource.data = Visit as YarnMaster[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });


  }

  // get f() { return this._InvoiceListService.mysearchform.controls; }



  getYarnList() {
    //  debugger;
    this.sIsLoading = 'loading-data';
    var D_data = {
      "yCode": this._InvoiceListService.mySearchform.get("yCode").value + '%' || '%',
      "yName": this._InvoiceListService.mySearchform.get("yName").value + '%' || '%',

    }
    // console.log(D_data);
    this._InvoiceListService.getYarnlist(D_data).subscribe(Visit => {
      this.dataSource.data = Visit as YarnMaster[];
      // console.log(this.dataSource.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });
  }

  onSearch() {
    this.getYarnList();

  }

  //  onClear() {

  //   this._InvoiceListService.mysearchform.get('FirstNameSearch').reset();
  //   this._InvoiceListService.mysearchform.get('LastNameSearch').reset();
  //   this._InvoiceListService.mysearchform.get('DoctorId').reset();

  // }  


  NewYarnmaster() {
    const dialogRef = this._matDialog.open(NewyarnComponent,
      {
        maxWidth: "45vw",
        height: '400px',
        width: '100%',
        // height: "100%"
      });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed - Insert Action', result);
      // this.getAdmittedPatientList();
    });
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



  getRecord(contact, m): void {
    // debugger;
    console.log(contact, m);
    console.log(m);

    if (m == "Bill") {
      console.log(m);
      const dialogRef = this._matDialog.open(NewyarnComponent,
        {
          maxWidth: "90vw",
          maxHeight: "90vh", width: '100%', height: "100%"
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed - Insert Action', result);
        //  this.getRadiologytemplateMasterList();
      });
    }
    else if (m == "Refund of Bill") {
      console.log(" This is for refund of Bill pop : " + m);
    }
    else if (m == "Case Paper") {
      console.log("Case Paper : " + m);
    }
    //   const act?ionType: string = response[0];
    //   this.selectedID =  contact.VisitId
    //   this._ActRoute.navigate(['opd/appointment/op_bill'])
    //   this._ActRoute.navigate(['opd/appointment/op_bill'], {queryParams:{id:this.selectedID}})

  }



  onClear() {

    this._InvoiceListService.mySearchform.get('yCode').reset();
    this._InvoiceListService.mySearchform.get('yName').reset();
   
  }



  // onExport(exprtType){
  //   debugger;
  //   let columnList=[];
  //   if(this.dataSource.data.length == 0){
  //     // this.toastr.error("No Data Found");
  //     Swal.fire('Error !', 'No Data Found', 'error');
  //   }
  //   else{
  //     var excelData = [];
  //     var a=1;
  //     for(var i=0;i<this.dataSource.data.length;i++){
  //       let singleEntry = {
  //         // "Sr No":a+i,
  //         "PhoneAppId" :this.dataSource.data[i]["PhoneAppId"],
  //         "AppointmentDate" :this.dataSource.data[i]["AppDate"] ? this.dataSource.data[i]["AppDate"]:"N/A",
  //         "Patient Name" :this.dataSource.data[i]["PatientName"] ? this.dataSource.data[i]["PatientName"]:"N/A",
  //         "Address" :this.dataSource.data[i]["Address"] ? this.dataSource.data[i]["Address"] :"N/A",
  //         "MobileNo" :this.dataSource.data[i]["MobileNo"] ? this.dataSource.data[i]["MobileNo"] :"N/A",
  //         "DepartmentName" :this.dataSource.data[i]["DepartmentName"] ? this.dataSource.data[i]["DepartmentName"] : "N/A",
  //         "Doctorname" :this.dataSource.data[i]["DoctorName"] ? this.dataSource.data[i]["DoctorName"]:"N/A",
  //         "PhAppDate" :this.dataSource.data[i]["PhAppDate"] ? this.dataSource.data[i]["PhAppDate"]:"N/A",


  //       };
  //       excelData.push(singleEntry);
  //     }
  //     var fileName = "Phone-Appointment-List " + new Date() +".xlsx";
  //     if(exprtType =="Excel"){
  //       const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(excelData);
  //       var wscols = [];
  //       if(excelData.length > 0){ 
  //         var columnsIn = excelData[0]; 
  //         for(var key in columnsIn){
  //           let headerLength = {wch:(key.length+1)};
  //           let columnLength = headerLength;
  //           try{
  //             columnLength = {wch: Math.max(...excelData.map(o => o[key].length), 0)+1}; 
  //           }
  //           catch{
  //             columnLength = headerLength;
  //           }
  //           if(headerLength["wch"] <= columnLength["wch"]){
  //             wscols.push(columnLength)
  //           }
  //           else{
  //             wscols.push(headerLength)
  //           }
  //         } 
  //       }
  //       ws['!cols'] = wscols;
  //       const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //       XLSX.writeFile(wb, fileName);
  //     }else{
  //       let doc = new jsPDF('p','pt', 'a4');
  //       doc.page = 0;
  //       var col=[];
  //       for (var k in excelData[0]) col.push(k);
  //         console.log(col.length)
  //       var rows = [];
  //       excelData.forEach(obj => {
  //         console.log(obj)
  //         let arr = [];
  //         col.forEach(col => {
  //           arr.push(obj[col]);
  //         });
  //         rows.push(arr);
  //       });

  //       doc.autoTable(col, rows,{
  //         margin:{left:5,right:5,top:5},
  //         theme:"grid",
  //         styles: {
  //           fontSize: 3
  //         }});
  //       doc.setFontSize(3);
  //       // doc.save("Indoor-Patient-List.pdf");
  //       window.open(URL.createObjectURL(doc.output("blob")))
  //     }
  //   }
  // }
}


export class YarnMaster {
  yID: number;
  yName: string;
  yCode: any;
  yPly: string;
  yType: any;
  yBlend: string;
  yActualCount: any;
  yDenierCount: any;
  isActive: boolean;
  createdBy: any;
  updatedBy: any;
  createdOn: any;
  /**
   * Constructor
   *
   * @param contact
   */
  constructor(YarnMaster) {
    {
      this.yID = YarnMaster.yID || '';
      this.yName = YarnMaster.yName || '';
      this.yCode = YarnMaster.yCode || '';
      this.yPly = YarnMaster.yPly || '';
      this.yType = YarnMaster.yType || '';
      this.yBlend = YarnMaster.yBlend || '';
      this.yActualCount = YarnMaster.yActualCount || '';
      this.yDenierCount = YarnMaster.yDenierCount || '';
      this.isActive = YarnMaster.isActive || '';
      this.createdBy = YarnMaster.createdBy || '';
      this.updatedBy = YarnMaster.updatedBy || '';
      this.createdOn = YarnMaster.createdOn || '';

    }
  }
}