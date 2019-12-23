import { Injectable } from '@angular/core';
import { ApiHelperService } from '../api-helper/api-helper.service';
import { SearchGroceryRequest } from '../../models/search-grocery-request';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apiHelperService: ApiHelperService,
    private globalService: GlobalService
  ) { }

  groceryUrl = environment.api.hostName + environment.api.grocery.url;

  public search(brand: string, name: string) {
    try {
      const payload: SearchGroceryRequest = {
        brand,
        name
      };

      const requestQuery = this.apiHelperService.toQuery(payload);
      const searchResponse = this.apiHelperService.get(`${this.groceryUrl}?${requestQuery}`);

      return searchResponse;
    }
    catch (ex) {
      throw ex;
    }
  }

  public getById(id: number) {
    try {
      const searchResponse = this.apiHelperService.get(`${this.groceryUrl}/${id}`);
      return searchResponse;
    }
    catch (ex) {
      throw ex;
    }
  }

  public update(brand: string, name: string, upc12Barcode: number, id: number) {
    try {
      const payload = {
        brand,
        name,
        upc12Barcode
      };

      const searchResponse = this.apiHelperService.put(`${this.groceryUrl}/${id}`, payload);
      return searchResponse;
    }
    catch (ex) {
      throw ex;
    }
  }
}
