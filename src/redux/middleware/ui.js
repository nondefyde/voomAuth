import { push } from 'connected-react-router';
import { UI_NAVIGATE } from '../actions/ui';
import { apiRequest, UI_CROP_SAVE } from '../actions';

export const navigateTo = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === UI_NAVIGATE) {
		dispatch(push(action.payload));
	}
};

const saveCroppedImage = ({dispatch}) => (next) => (action) => {
	if (action.type === UI_CROP_SAVE.START && action.meta.type) {
		const {image, type, ...rest} = action.meta;
		const payload = new FormData();
		payload.append('type', type);
		payload.append('file', image);
		dispatch(apiRequest({
			method: 'POST',
			url: `/media`,
			payload,
			key: 'saveCroppedImage',
			noSuccessToast: true,
			onSuccess: UI_CROP_SAVE.SUCCESS,
			onError: UI_CROP_SAVE.ERROR,
			...rest
		}));
	}
	next(action);
};

export default [navigateTo, saveCroppedImage];
