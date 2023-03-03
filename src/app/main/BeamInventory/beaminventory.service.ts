import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BeaminventoryService {


  accountmasterform: FormGroup;
  beaminventoryform: FormGroup;
  searchinventoryform: FormGroup;
  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder) {

    // this.accountmasterform = this.accountMasterForm();
    this.beaminventoryform = this.beaminventoryForm();
    this.searchinventoryform = this.filterForm();

  }




  filterForm(): FormGroup {
    return this._formBuilder.group({

      FirstName: ['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],
      LastName: ['', [
        Validators.pattern("^[A-Za-z]*[a-zA-Z]*$"),
      ]],

      BeamCode: '',
      start: [(new Date()).toISOString()],
      end: [(new Date()).toISOString()],

    });
  }


  beaminventoryForm(): FormGroup {
    return this._formBuilder.group({

      Beaminwardid: '',
      Inwardtime: '',
      Inwarddate: '',
      Gpchalno: '',
      Chaldate: '',
      Partyname: '',
      Sizingname: '',
      Partysetno: '',
      BalanceMeters: '',
      Contactno: '',
      Contactdate: '',
      Contmeters: '',
      Currrecmtrs: '',
      Prerecmtrs: '',
      Totalcuts: '',
      Totalbeammtrs: '',
      Totalproduction: '',
      Totalweftcons: '',
      Transporttype: '',
      Vechicleno: '',
      Remark: '',



      BeamNo: '',
      SetBeamNo: '',
      Quality: '',
      Design: '',
      FlagNo: '',
      Ends: '',
      RSpace: '',
      Reed: '',
      DesignPick: '',
      LoomPick: '',
      Lasa: '',
      YM: '',
      Cuts: '',
      BMWt: '',
      BMMeters: '',
      Shrink: '',
      ProdMeters: '',
      ReqL: '',
      ReqFold: '',
      WeftCons: '',
      JobPick: '',
      Rate: '',

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

  public BeamInwardInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceSave", employee);
  }

  public getCityList() {
    return this._httpClient.post("Generic/GetByProc?procName=RetrieveCityMasterForCombo", {})
  }

  public getStateList(CityId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_StateMasterForCombo_Conditional", { "Id": CityId })
  }

  public getCountryList(StateId) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CountryMasterForCombo_Conditional", { "Id": StateId })
  }


  ///Weaver project

  public getBeamInventoryList(employee) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_BeamList", employee)
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
