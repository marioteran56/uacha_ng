import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {

  isMenuCollapsed: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }

  find(collection: String) {
    return this.http.get<any>(environment.serverBaseURL + collection + "/");
  }

  findByParams(collection: String, params: String) {
    return this.http.get<any>(environment.serverBaseURL   + collection + "?" + params);
  }
  
  findByFilter(collection: String, params: any) {
    return this.http.post<any>(environment.serverBaseURL   + collection + "?", params);
  }

  findOverduePayments(params: any) {
    return this.http.post<any>(environment.serverBaseURL + "/users/findOverduePayments?", params);
  }

  getFilteredUserCount(params: any) {
    return this.http.post<any>(environment.serverBaseURL  + "/users/getFilteredUserCount?", params);
  }

  findMultipleLastPayments(params: any) {
    return this.http.post<any>(environment.serverBaseURL   + "/payments/findMultipleLastPayments?",params);
  }

  getPaymentByInvoice(query: Number) {
    return this.http.get<any>(environment.serverBaseURL   + "/payments/getPaymentByInvoice?invoice="+query);
  }

  getPaymentsFiltered(params: any) {
    return this.http.post<any>(environment.serverBaseURL   + "/payments/getPaymentsFiltered?",params);
  }

  findPayments(params:any) {
    return this.http.post<any>(environment.serverBaseURL   + "/payments/findPayments?",params);
  }

  findBy(collection: String, query: URLSearchParams) {
    return this.http.get<any>(environment.serverBaseURL   + collection + "?" + query);
  }

  findById(collection: String, id: String) {
    return this.http.get<any>(environment.serverBaseURL   + collection + "/" + id);
  }

  insertOne(collection: String, obj: any) {
    return this.http.post(environment.serverBaseURL   + collection + "/", obj);
  }

  insertMany(collection: String, list: Array<any>) {
    return this.http.post(environment.serverBaseURL + collection + "/", list);
  }

  updateOne(collection: String, obj: any) {
    return this.http.put(environment.serverBaseURL + collection + "/", obj);
  }

  updateMany(collection: String, obj: String) {
    return this.http.put(environment.serverBaseURL + collection + "/", obj);
  }

  deleteOne(collection: String, id: String) {
    return this.http.delete(environment.serverBaseURL + collection + "/" + id);
  }

  deleteMany(collection: String, obj: String) {
    return this.http.delete(environment.serverBaseURL + collection + "/" + obj);
  }
  
  insertOneFile(collection: any, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(environment.serverBaseURL + collection + "/", formData);
  }

  count(collection: String) {
    return this.http.get<any>(environment.serverBaseURL + collection + "/");
  }

  countWithParams(collection: String, params: String) {
    return this.http.get<any>(environment.serverBaseURL  + collection + "?" + params);
  }


}
