import { ShopActionTypes } from "./shop.type.js";

export const setFilterValue = (value) => ({
  type: ShopActionTypes.SET_FILTER_VALUE,
  payload: value,
});

export const setMedicineList = (value) => ({
  type: ShopActionTypes.SET_MEDICINE_LIST,
  payload: value,
});

export const setDiseaseList = (value) => ({
  type: ShopActionTypes.SET_DISEASE_LIST,
  payload: value,
});

export const setDiseaseFilter = (value) => ({
  type: ShopActionTypes.SET_DISEASE_FILTER_LIST,
  payload: value,
});
export const setShopInitalValue = () => ({
  type: ShopActionTypes.SET_INITIAL_LIST,
});
