import { createActionType } from '../../utils/index';

export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const DELETE = 'delete';

export const API_REQUEST = createActionType('API_REQUEST', 'API');

export const apiRequest = (meta) => ({
	type: API_REQUEST.START,
	meta,
});
