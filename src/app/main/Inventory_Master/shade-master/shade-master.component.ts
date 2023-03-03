import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { AdvanceDataStored } from 'app/main/Invoice/advance';
import { ReplaySubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { InventoryMasterService } from '../inventory-master.service';
import { EditShademasterComponent } from './edit-shademaster/edit-shademaster.component';
import { NewShademasterComponent } from './new-shademaster/new-shademaster.component';

@Component({
  selector: 'app-shade-master',
  templateUrl: './shade-master.component.html',
  styleUrls: ['./shade-master.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ShadeMasterComponent implements OnInit {

 

  VisitList: any;
  msg: any;
  sIsLoading: string = '';
  isLoading = true;
  isRateLimitReached = false;
  screenFromString = 'admission-form';
  PatientTypeList: any = [];

  // menuActions:Array<string> = [];
  hasSelectedContacts: boolean;
  LocationCode: any;
  LocationName: any;
  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() dataArray: any;

  displayedColumns = [
   'shadeID',  
    'shadeCode',
    'shadeNumber',
    'shadeColour',
    // 'createdBy',
    'updatedBy',
    // 'createdOn',
    // 'isActive',
    'updatedOn',
    'action'
  ];
  dataSource = new MatTableDataSource<Locationmaster>();
  menuActions: Array<string> = [];

  public doctorFilterCtrl: FormControl = new FormControl();
  public filtereddoctor: ReplaySubject<any> = new ReplaySubject<any>(1);
  private _onDestroy = new Subject<void>();


  constructor(public _InvoiceListService: InventoryMasterService,
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
      "Keyword": '',// this._InvoiceListService.mySearchform.get("Keyword").value + '%' || '%',
      "From_Dt" :'',// this.datePipe.transform(this._InvoiceListService.mySearchform.get("start").value,"MM-dd-yyyy") || "01/01/1900",
      "To_Dt" : ''//this.datePipe.transform(this._InvoiceListService.mySearchform.get("end").value,"MM-dd-yyyy") || "01/01/1900", 
    
    }
    console.log(D_data);
    this.D_data1 = D_data;
    this._InvoiceListService.getShadelist(D_data).subscribe(Visit => {
      this.dataSource.data = Visit as Locationmaster[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });


  }



  getShadeMasterList() {
     debugger;
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Keyword": this._InvoiceListService.mySearchform.get("Keyword").value + '%' || '',
      "From_Dt" : this.datePipe.transform(this._InvoiceListService.mySearchform.get("start").value,"MM-dd-yyyy") || '',
      "To_Dt" : this.datePipe.transform(this._InvoiceListService.mySearchform.get("end").value,"MM-dd-yyyy") || '', 
    
    }

    this._InvoiceListService.getShadelist(D_data).subscribe(Visit => {
      this.dataSource.data = Visit as Locationmaster[];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });
    // this._InvoiceListService.mySearchform.get('Keyword').reset();
  }


  
  onSearch() {
    this.getShadeMasterList();

  }




  NewShademaster() {
    const dialogRef = this._matDialog.open(NewShademasterComponent,
      {
        maxWidth: "45vw",
        height: '450px',
        width: '100%',

      });
    dialogRef.afterClosed().subscribe(result => {
      this.getShadeMasterList();
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



  onEdit(row) {
    console.log(row);


    var m_data = {
      "shadeID": row.shadeID,
      "shadeNumber": row.shadeNumber,
      "shadeCode": row.shadeCode,
      "shadeColour": row.shadeColour,
    
    }

    console.log(m_data);
    this._InvoiceListService.populateForm5(m_data);

    const dialogRef = this._matDialog.open(EditShademasterComponent,
      {
        maxWidth: "45vw",
        height: '590px',
        width: '100%',
        data: {
          registerObj: m_data,
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - Insert Action', result);
      this.getShadeMasterList();
    });
  }


  onClear() {


    this._InvoiceListService.mySearchform.get('Keyword').reset();
   

  }
  // Delete row in datatable level
  ondelete(element) {

    debugger;
    //  let Query = "Select DischargeId from Discharge where  AdmissionID=" + this.selectedAdvanceObj.AdmissionID + " ";

    let Query = "update YarnMaster set isActive=0 where yID=" + element.yID + "";
    console.log(Query);
    this._InvoiceListService.getDeleteYarnmaster(Query).subscribe(data => {
      if (data)
        Swal.fire('Success !', 'ChargeList Row Deleted Successfully', 'success');

      //  console.log(this.DischargeId);
    });
  }



  onExport(exprtType) {
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
  }
}





export class Locationmaster {
  shadeID: number;
  shadeCode: string;
  shadeNumber: any;
  shadeColour:any;
  isActive: any;
  createdBy: any;
  updatedBy: any;
  createdOn: any;
  /**
   * Constructor
   *
   * @param contact
   */
  constructor(Locationmaster) {
    {
      this.shadeID = Locationmaster.shadeID || 0;
      this.shadeCode = Locationmaster.shadeCode || '';
      this.shadeNumber = Locationmaster.shadeNumber || '';
      this.shadeColour = Locationmaster.shadeColour || '';
      this.isActive = Locationmaster.isActive || '';
      this.createdBy = Locationmaster.createdBy || '';
      this.updatedBy = Locationmaster.updatedBy || '';
      this.createdOn = Locationmaster.createdOn || '';

    }
  }
}