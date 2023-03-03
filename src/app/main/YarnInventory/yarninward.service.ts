import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class YarninwardService {

  yarninventoryform: FormGroup;
  yarnsearchform:FormGroup;
  constructor(public _httpClient: HttpClient,
    private _formBuilder: FormBuilder) {
  
    this.yarninventoryform = this.yarnInventoryForm();
    this.yarnsearchform=this.YARNSearchForm();

  }


   
  YARNSearchForm() {
    return this._formBuilder.group({
    
      yCode:'',
      yName:'',
      itemCode:'',
         
      // millCode:'',
           
      // shadeCode:'',
     
      // LocationCode:'',
      // QualityCode:'',
      
      start: [new Date().toISOString()],
      end: [new Date().toISOString()],
    });
  }

 yarnInventoryForm(): FormGroup {
    return this._formBuilder.group({
      Entrydate:'',
      ChallanNo:'',
      ChallanDate:'',
      LotNo:'',
      PartyName:'',
      YarnCount:'',
      MillName:'',
      Shade:'',
      Wtbag:'',
      Conebag:'',
      Totalbags:'',
      Totalgrwt:'',
      Totalntwt:'',
      Category:'',
      Scale:'',
      Rate:'',
      Amount:'',
      TotalBag:'',
      Totalweight:'',
      Totalamount:'',
      Authorisedby:'',
      Checkedby:'',
      Tanspoerttype:'',
      Vechicleno:'',
      Remark:'',

     
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

  public YarnInwardInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceSave", employee);
  }
  public YarnInwardUpdate(employee) {
    return this._httpClient.post("Invoice/InvoiceSave", employee);
  }


  public YarnOutwardInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceSave", employee);
  }
  public YarnOutwardUpdate(employee) {
    return this._httpClient.post("Invoice/InvoiceSave", employee);
  }

  
  public YarnIssueInsert(employee) {
    return this._httpClient.post("Invoice/InvoiceSave", employee);
  }
  public YarnIssueUpdate(employee) {
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

  getYarnInventorylist(employee){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_Yarnlist", employee)
  }
  ///Weaver project

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
