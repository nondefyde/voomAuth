import api from './api';
import auth from './auth';
import user from './user';
import ui from './ui';

export default [
	...api,
	...auth,
	...user,
	...ui
];
