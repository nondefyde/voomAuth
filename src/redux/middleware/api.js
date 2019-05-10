import _ from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { push } from 'connected-react-router';
import { API_REQUEST } from '../actions';
import { startUILoading, stopUILoading, uiSetPagination, updateUIError } from '../actions/ui'
import { createAPIRequest } from '../../services/axios';

export const processApiError = (error) => {
	let response = '';
	if (!error) {
		response = 'An error occurred, please try again!';
	} else if (error.message) {
		response = error.message;
	} else if (error.messages) {
		Object.values(error.messages).forEach((message) => {
			response += `${message}\n`;
		});
	}
	return response || 'An error occurred';
};
// @ts-ignore
const apiRequest = ({dispatch}) => (next) => (action) => {
	if (action.type === API_REQUEST.START) {
		const {
			method, url, key, payload, onError, successMessage,
			params, onSuccess, nextRoute, errorMessage, noSuccessToast, noErrorToast,
		} = action.meta;
		const config = {method, url};
		if (payload && (!_.isEmpty(payload) || payload instanceof FormData)) {
			config.data = payload;
		}
		if (params && !_.isEmpty(params)) {
			config.params = params;
		}
		dispatch(updateUIError(key, null));
		dispatch(startUILoading(key));
		createAPIRequest(config)
			.then((apiResponse) => {
				const {data, _meta} = apiResponse.data;
				if (onSuccess) {
					const payload = {
						user: data
					};
					if (_meta && _meta.token) {
						payload.session = _meta.token;
					}
					dispatch({type: onSuccess, payload});
				}
				if (_meta && _meta.pagination) {
					dispatch(uiSetPagination(key, _meta.pagination));
				}
				dispatch(stopUILoading(key));
				if (nextRoute) {
					dispatch(push(nextRoute));
				}
				if (!noSuccessToast && (successMessage || _meta.message)) {
					toast.info(successMessage || _meta.message);
				}
			})
			.catch((apiError) => {
				dispatch(stopUILoading(key));
				const error = _.get(apiError, 'data._meta.error');
				const displayedError = processApiError(error) || errorMessage;
				dispatch(updateUIError(key, displayedError));
				if (!noErrorToast && displayedError) {
					toast.error(displayedError);
				}
				if (onError) {
					dispatch({type: onError});
				}
			});
	}
	return next(action);
};

export default [apiRequest];
