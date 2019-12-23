import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Grocery } from 'src/app/models/grocery';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  formBuilder: FormBuilder = new FormBuilder();
  brandToSearch: string;
  nameToSearch: string;

  productList;
  totalCount: number;
  clickedSubmit = false;

  displayedColumns: string[] = ['upc12Barcode', 'brand', 'name', 'action'];
  groceryForm: FormGroup;

  constructor(
    private translateService: TranslateService,
    private productService: ProductService,
    private globalService: GlobalService
  ) {
    this.groceryForm = this.formBuilder.group({
      brand: new FormControl('', {}),
      name: new FormControl('', {})
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  async ngOnInit() {
    try {
      const searchResponse = await this.productService.search(this.groceryForm.get('brand').value, this.groceryForm.get('name').value);
      this.productList = new MatTableDataSource<Grocery>(searchResponse.payload);
      this.totalCount = searchResponse.totalCount;

      this.productList.paginator = this.paginator;
      this.productList.sort = this.sort;
    }
    catch (ex) {
      this.globalService.errorAlert(ex);
    }
  }

  async search() {
    try {
      this.clickedSubmit = true;
      if (this.groceryForm.valid) {
        const searchResponse = await this.productService.search(this.groceryForm.get('brand').value, this.groceryForm.get('name').value);
        this.productList = new MatTableDataSource<Grocery>(searchResponse.payload);
        this.productList.paginator = this.paginator;

        this.productList.sort = this.sort;
        this.totalCount = searchResponse.totalCount;
      }
      else {
        // do nothing
      }
    }
    catch (ex) {
      console.log('error has occurred');
      this.globalService.errorAlert(ex);
    }
  }
}
