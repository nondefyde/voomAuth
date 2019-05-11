import { createActionString, createActionType } from '../../utils';

export const UI_LOADING = createActionType('UI_LOADING', 'UI');
export const UI_ERROR = createActionString('UI_ERROR', 'UI');
export const UI_NAVIGATE = createActionString('UI_NAVIGATE', 'UI');
export const OPEN_ASSIGN_MANAGER = createActionType('OPEN_ASSIGN_MANAGER', 'Terminal_UI');
export const UI_CROP_OPEN = createActionType('UI_CROP_OPEN', 'UI');
export const UI_CROP_UPDATE = createActionType('UI_CROP_UPDATE', 'UI');
export const UI_CROP_CLEAR = createActionType('UI_CROP_CLEAR', 'UI');
export const UI_CROP_CLEAR_CURRENT = createActionType('UI_CROP_CLEAR_CURRENT', 'UI');
export const UI_CROP_SAVE = createActionType('UI_CROP_SAVE', 'UI');
export const UI_CROP_SAVE_SUCCESS = createActionType('UI_CROP_SAVE_SUCCESS', 'UI');
export const UI_SET_PAGINATION = createActionType('UI_SET_PAGINATION', 'UI');
export const UI_FILTER_OPEN = createActionType('UI_FILTER_OPEN', 'UI');

export const startUILoading = (key) => ({
	type: UI_LOADING.START,
	key
});

export const stopUILoading = (key) => ({
	type: UI_LOADING.END,
	key
});

export const updateUIError = (key, value) => ({
	type: UI_ERROR,
	key,
	value
});

export const navigateTo = (path) => ({
	type: UI_NAVIGATE,
	payload: path
});

export const openAssignManager = () => ({
	type: OPEN_ASSIGN_MANAGER.START,
});

export const closeAssignManager = () => ({
	type: OPEN_ASSIGN_MANAGER.END,
});

export const uiCropOpen = (image, key = 'default', type = 'main') => ({
	type: UI_CROP_OPEN.START,
	meta: {
		image,
		key,
		type,
	},
});
export const uiCropClose = () => ({
	type: UI_CROP_OPEN.END,
});
export const uiCropClear = () => ({
	type: UI_CROP_CLEAR.START,
});

export const uiCropClearCurrent = () => ({
	type: UI_CROP_CLEAR_CURRENT.START,
});

export const uiCropUpdate = (image, key) => ({
	type: UI_CROP_UPDATE.START,
	meta: {
		image,
		key,
	},
});

export const uiCropSave = (croppedImage, type) => ({
	type: UI_CROP_SAVE.START,
	meta: {
		image: croppedImage,
		type,
	},
});

export const uiSetPagination = (key, payload) => ({
	type: UI_SET_PAGINATION.START,
	meta: {
		key,
		payload
	}
});

export const uiOpenFilter = (key) => ({
	type: UI_FILTER_OPEN.START,
	key
});

export const uiCloseFilter = (key) => ({
	type: UI_FILTER_OPEN.END,
	key
});
