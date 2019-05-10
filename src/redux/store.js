import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from "connected-react-router";

import createRootReducer from './reducers';
import applicationMiddleware from './middleware';

export const history = createBrowserHistory();


export const getPersistedStore = () => {
	let cache = {};
	if (localStorage.hasOwnProperty('v:persist')) {
		const localStorageItem = localStorage.getItem('v:persist');
		cache = JSON.parse(localStorageItem);
	}
	return cache;
};

export const persistStore = (object) => {
	if (!(object instanceof Object)) {
		throw new Error('persistStore requires an Object as param');
	}
	const currentCache = getPersistedStore();
	const objectToString = JSON.stringify(Object.assign({}, currentCache, object));
	localStorage.setItem('v:persist', objectToString);
};

const parseMiddleware = () => {
	const middleware = [
		thunk,
		routerMiddleware(history),
		...applicationMiddleware
	];
	if (process.env.NODE_ENV === 'production') {
		return applyMiddleware(...middleware);
	} else {
		// Enable additional logging in non-production environments.
		middleware.push(createLogger());
		return applyMiddleware(...middleware);
	}
};

const store = createStore(
	createRootReducer(history),
	getPersistedStore(),
	composeWithDevTools(parseMiddleware())
);

// Do on state change
store.subscribe(() => {
	const {auth} = store.getState();
	console.log('auth : ', auth);
	const cache = {auth};
	// STORE BASIC DATA NEEDED
	persistStore(cache);
});

export default store;
