import { ShopActionTypes } from "./shop.type";

const INITIAL_STATE = {
  collections: [],
  cloneCollections: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.SET_FILTER_VALUE:
      let result = action.payload
        ? state.cloneCollections.filter((data) => {
            return (
              (data &&
                data.ItemName &&
                data.ItemName.toLowerCase().search(
                  action.payload.toLowerCase()
                ) !== -1) ||
              (data &&
                data.ItemName &&
                data.ItemName.toLowerCase().search(
                  action.payload.toLowerCase()
                ) !== -1)
            );
          })
        : state.cloneCollections;
      return {
        ...state,
        collections: result || [],
      };
    case ShopActionTypes.SET_MEDICINE_LIST:
      return {
        ...state,
        collections: action.payload || [],
        cloneCollections: action.payload || [],
      };
    default:
      return state;
  }
};

export default shopReducer;
