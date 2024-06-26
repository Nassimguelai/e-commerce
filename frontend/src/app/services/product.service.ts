import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/api/product/all`);
  }
  public addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/api/product/add`, formData);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/product/delete/${productId}`);
  }

  public editProduct(productId: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiServerUrl}/api/product/update/${productId}`, formData);
  }
}
