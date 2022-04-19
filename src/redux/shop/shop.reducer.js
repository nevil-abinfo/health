import SHOP_DATA from "./shop.data";
import { ShopActionTypes } from "./shop.type";

const INITIAL_STATE = {
  collections: SHOP_DATA,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.SET_FILTER_VALUE:
      let result = action.payload
        ? SHOP_DATA.filter((data) => {
            return (
              (data &&
                data.name &&
                data.name.toLowerCase().search(action.payload.toLowerCase()) !==
                  -1) ||
              (data &&
                data.name &&
                data.name.toLowerCase().search(action.payload.toLowerCase()) !==
                  -1)
            );
          })
        : SHOP_DATA;
      return {
        ...state,
        collections: result || [],
      };
    default:
      return state;
  }
};

export default shopReducer;
