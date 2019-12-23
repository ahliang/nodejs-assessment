import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchGroceryRequest } from 'src/app/models/search-grocery-request';
import { GlobalService } from 'src/app/services/global/global.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Grocery } from 'src/app/models/grocery';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-grocery-view',
  templateUrl: './grocery-view.component.html',
  styleUrls: ['./grocery-view.component.scss']
})
export class GroceryViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private translateService: TranslateService,
    private productService: ProductService
  ) { }

  productId: number;
  productToView: Grocery;
  formBuilder: FormBuilder = new FormBuilder();
  clickedSubmit = false;
  updateForm = this.formBuilder.group({
    brand: new FormControl('', {
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    upc12Barcode: new FormControl('', {
      validators: [Validators.pattern(/^[0-9]*$/)]
    })
  });

  validationMessage = {};

  async ngOnInit() {
    try {
      this.productId = Number(this.route.snapshot.paramMap.get('id'));
      if (isNaN(this.productId)) {
        window.alert(this.translateService.instant('app.grocery.messages.invalidProduct'));
        this.back();
      }

      const searchResponse = await this.productService.getById(this.productId);

      if (searchResponse.product) {
        this.productToView = searchResponse.product;
        this.updateForm.patchValue(this.productToView);
      }
      else {
        window.alert(this.translateService.instant('app.grocery.messages.invalidProduct'));
        this.back();
      }

      this.validationMessage = {
        brand: [
          {
            type: 'required',
            message: this.translateService.instant('app.grocery.errorMessages.required')
          }
        ],
        name: [
          {
            type: 'required',
            message: this.translateService.instant('app.grocery.errorMessages.required')
          }
        ],
        upc12Barcode: [
          {
            type: 'pattern',
            message: this.translateService.instant('app.grocery.errorMessages.numberOnly')
          }
        ]
      };
    }
    catch (ex) {
      this.globalService.errorAlert(ex);
    }
  }

  back() {
    this.router.navigate(['/grocery-list']);
  }

  async update() {
    try {
      if (this.updateForm.valid) {
        const formValues = this.updateForm.value;
        const updateResponse = await this.productService.update(
          formValues.brand,
          formValues.name,
          formValues.upc12Barcode,
          this.productId
        );

        if (updateResponse.errorCode) {
          this.globalService.errorAlert(updateResponse);
        }
        else {
          window.alert(this.translateService.instant('app.grocery.messages.successfulUpdate'));
          this.back();
        }
      }
    }
    catch (ex) {
      this.globalService.errorAlert(ex);
    }
  }
}
