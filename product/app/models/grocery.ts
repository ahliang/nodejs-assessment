export interface Grocery {
  id: number;
  upc12Barcode: number;
  brand: string;
  name: string;
}

export interface GrocerySearchResponse {
  payload: Array<Grocery>;
  totalCount: number;
  errorCode: string;
}

export interface GroceryGetByIdResponse {
  product?: Grocery;
  errorCode: string;
}

export interface GroceryUpdateResponse {
  product?: Grocery;
  errorCode: string;
}