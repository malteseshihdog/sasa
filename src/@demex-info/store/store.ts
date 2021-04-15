import sagaMiddleware from "@demex-info/saga";
import { applyMiddleware, createStore, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import combinedReducers from "./reducers";

const middlewares: Middleware[] = [thunk, sagaMiddleware];
// eslint-disable-next-line no-undef
if ((!process.env.NODE_ENV || process.env.NODE_ENV === "development") && !process.env.REACT_APP_DISABLE_REDUX_LOGGER) {
	middlewares.push(createLogger({
		predicate: (getState, action) => !["ADD_BACKGROUND_LOADING", "REMOVE_BACKGROUND_LOADING"].includes(action.type),
	}));
}

// redux 4 does not have a easy workaround createStore needing 4 type arguments.
// @ts-ignore
const AppStore = createStore(combinedReducers, composeWithDevTools(
	applyMiddleware(...middlewares),
));

export default AppStore;
