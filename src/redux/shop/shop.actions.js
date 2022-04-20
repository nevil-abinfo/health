import { ShopActionTypes } from "./shop.type.js";

export const setFilterValue = (value) => ({
  type: ShopActionTypes.SET_FILTER_VALUE,
  payload: value,
});

export const setMedicineList = (value) => ({
  type: ShopActionTypes.SET_MEDICINE_LIST,
  payload: value,
});
