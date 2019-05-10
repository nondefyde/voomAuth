import jwtDecode from 'jwt-decode';
import get from 'lodash/get';
import { push } from 'connected-react-router';
import { LOGOUT } from '../redux/actions';
import APP from '../constants/app';

class AuthService {
	constructor() {
		this.getUserSession = this.getUserSession.bind(this);
		this.isLoggedIn = this.isLoggedIn.bind(this);
		this.clearUserData = this.clearUserData.bind(this);
	}

	getUserSession() {
		const item = localStorage.getItem('v:persist');
		const data = JSON.parse(item);
		return get(data, 'auth.session');
	}

	getAuthenticatedUser() {
		const item = localStorage.getItem('v:persist');
		const data = JSON.parse(item);
		const {email, username} = get(data, 'auth.user');
		return {email, username};
	}

	isLoggedIn() {
		const token = this.getUserSession();
		let isLoggedIn = false;
		if (token) {
			const decoded = jwtDecode(token);
			isLoggedIn = decoded.exp && (decoded.exp > (Date.now() / 1000));
		}
		return isLoggedIn;
	}

	clearUserData() {
		localStorage.removeItem('v:persist');
	}

	logoutUser(navigateTo) {
		this.clearUserData();
		navigateTo(APP.LOGIN);
	}
}

export default new AuthService();
