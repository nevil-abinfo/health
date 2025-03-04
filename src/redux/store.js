import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [];
if (process.env.NODE_ENV !== "production" && !process.env.STORE_LOG_DISABLE) {
   // middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
