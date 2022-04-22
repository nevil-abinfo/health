import { ShopActionTypes } from "./shop.type";

const INITIAL_STATE = {
  collections: [],
  cloneCollections: [],
  disease: [],
  cloneDisease: [],
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
    case ShopActionTypes.SET_DISEASE_LIST:
      return {
        ...state,
        disease: action.payload || [],
        cloneDisease: action.payload || [],
      };
    case ShopActionTypes.SET_DISEASE_FILTER_LIST:
      return {
        ...state,
        collections: action.payload || [],
      };
    case ShopActionTypes.SET_INITIAL_LIST:
      return {
        ...state,
        collections: state.cloneCollections || [],
      };
    default:
      return state;
  }
};

export default shopReducer;
