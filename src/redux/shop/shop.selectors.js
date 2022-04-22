import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);
export const selectDisease = createSelector(
  [selectShop],
  (shop) => shop.disease
);
