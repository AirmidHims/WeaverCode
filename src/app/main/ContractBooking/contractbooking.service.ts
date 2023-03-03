import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContractbookingService {

  contractbookingform: FormGroup;
  Searchform: FormGroup;
  

  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder) {
   
    this.contractbookingform = this.contractbookingForm();
    this.Searchform = this.filterForm();

  }




  filteryarninvForm(): FormGroup {
    return this._formBuilder.group({

      YarnName: '',
      count: '',
      ply: '',
      type: '',
      blend: '',
      Actualcnt: '',
      deniercnt: '',


      // start: [new Date().toISOString()],
      // end: [new Date().toISOString()],
    });
  }




  filterForm(): FormGroup {
    return this._formBuilder.group({
      Keyword:'',
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],

    });
  }


  contractbookingForm(): FormGroup {
    return this._formBuilder.group({

      Bookingno:'',
      Bookdate:'',
      Partyname:'',
      Brokername:'',
      Sizingname:'',
      Brokerage:'',
      Quality:'',
      Design:'',
      Noofbeam:'',
      Pick:'',
      Jobrate:'',
      Totalm:'',
      Completedate:'',
     PaymentTerm:'',
     Remark:''
    });
  }


  populateForm3(employee) {

  }
  populateForm2(employee) {
    // this.myInvoiceFormGroup.patchValue(employee);
  }
  public InvoiceInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceSave", employee);
  }


  public getBookingList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCityMasterForCombo",employee)
  }

  public getStateList(CityId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_StateMasterForCombo_Conditional", { "Id": CityId })
  }

  public getCountryList(StateId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CountryMasterForCombo_Conditional", { "Id": StateId })
  }


  ///Weaver project

  public ContractBookingInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceUpdate", employee);
  }
  public ContractBookingUpdate(employee) {
    return this._httpClient.post("Invoice/InvoiceUpdate", employee);
  }

  public accountInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceUpdate", employee);
  }
  public accountUpdate(employee) {
    return this._httpClient.post("Invoice/InvoiceUpdate", employee);
  }



  public InvoicesUpdate(employee) {
    return this._httpClient.post("Invoice/InvoiceUpdate", employee);
  }

}
