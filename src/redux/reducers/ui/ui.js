import {
	UI_CROP_CLEAR,
	UI_CROP_CLEAR_CURRENT,
	UI_CROP_OPEN,
	UI_CROP_SAVE_SUCCESS,
	UI_CROP_UPDATE,
	UI_ERROR,
	UI_FILTER_OPEN,
	UI_LOADING,
	UI_SET_PAGINATION,
} from '../../actions';
import get from 'lodash/get';
import omit from 'lodash/omit';


const defaultState = {
	route: get(window.location, 'pathname'),
	errors: {},
	loading: {},
	assignManager: {
		open: false
	},
	crop: {
		open: false,
		current: 'upload'
	},
	filter: {
		trips: {
			open: true,
		},
		terminals: {
			open: true,
		},
		vehicles: {
			open: true,
		}
	},
	pagination: {},
};

const uiReducer = (state = defaultState, action) => {
	switch (action.type) {
	case UI_LOADING.START:
		return getNewLoadingState(state, action, true);
	case UI_LOADING.END:
		return getNewLoadingState(state, action, false);
	case UI_ERROR:
		return Object.assign({}, state, {
			errors: {...state.errors, [action.key]: action.value}
		});
	case UI_CROP_OPEN.START:
		return {
			...state,
			crop: {
				...state.crop,
				open: true,
				current: action.meta.key,
				[action.meta.key]: {
					...state.crop[action.meta.key],
					image: action.meta.image,
					type: action.meta.type,
				},
			},
		};
	case UI_CROP_UPDATE.START:
		return {
			...state,
			crop: {
				...state.crop,
				[action.meta.key]: {
					...state.crop[action.meta.key],
					image: action.meta.image,
				},
			},
		};
	case UI_CROP_OPEN.END:
		return {
			...state,
			crop: {
				...state.crop,
				open: false,
			},
		};
	case UI_CROP_CLEAR_CURRENT.START:
		return {
			...state,
			crop: {
				...omit(state.crop, ['current', state.crop.current]),
				open: false,
			},
		};
	case UI_CROP_CLEAR.START:
		return {
			...state,
			crop: {
				open: false,
			},
		};
	case UI_CROP_SAVE_SUCCESS.START:
		return {
			...state,
			crop: {
				...state.crop,
				[state.crop.current]: {
					...state.crop[state.crop.current],
					uploaded: get(action.payload, 'file')
				},
				open: false,
			},
		};
	case UI_SET_PAGINATION.START:
		const {key, payload} = action.meta;
		return {
			...state,
			pagination: {
				...state.pagination,
				[key]: payload
			},
		};
	case UI_FILTER_OPEN.START:
		return getFilterState(state, action, {open: true});
	case UI_FILTER_OPEN.END:
		return getFilterState(state, action, {open: false});
	default:
		return state;
	}
};

export default uiReducer;

function getNewLoadingState(currentState = {}, action, value) {
	const {key} = action;
	return Object.assign({}, currentState, {
		loading: {...currentState.loading, [key]: value}
	});
}

function getFilterState(currentState = {}, action, value) {
	const {key} = action;
	return Object.assign({}, currentState, {
		filter: {...currentState.filter, [key]: value}
	});
}