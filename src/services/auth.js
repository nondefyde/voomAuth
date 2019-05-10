import jwtDecode from 'jwt-decode';
import get from 'lodash/get';

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
		const item = localStorage.getItem('v:persist');
		console.log('item : ', item);
	}

	logoutUser() {
		this.clearUserData();
	}
}

export default new AuthService();
