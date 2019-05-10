import React, { Component, Fragment } from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Route from './components/Route/Route';
import { history } from './redux/store';
import LoginComponent from './containers/Auth/Login/Login';
import RegisterComponent from './containers/Auth/Register/Register';
import ResetPasswordComponent from './containers/Auth/ResetPassword/ResetPassword';
import VerifyComponent from './containers/Auth/Verify/Verify';
import VerifyLinkComponent from './containers/Auth/VerifyLink/VerifyLink';
import UpdatePasswordComponent from './containers/Auth/UpdatePassword/UpdatePassword';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

export default class App extends Component {
	render() {
		return (
			<Fragment>
				<ToastContainer
					autoClose={5000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick={true}
					rtl={false}
					draggable={false}
					pauseOnHover={true}
					position="bottom-right"
				/>
				<ConnectedRouter history={history}>
					<Switch>
						<Route path="/" name="Voomsway" component={DefaultLayout}/>
						<Route exact path="/login" name="Login" component={LoginComponent}/>
						<Route exact path="/register" name="Register" component={RegisterComponent}/>
						<Route exact path="/reset-password" name="Reset Password" component={ResetPasswordComponent}/>
						<Route exact path="/verify-link/:email/:hash" name="Verify" component={VerifyLinkComponent}/>
						<Route exact path="/update-password/:email/:hash" name="Update Password" component={UpdatePasswordComponent}/>
						<Route isPrivate={true} exact path="/verify" name="Verify" component={VerifyComponent}/>
					</Switch>
				</ConnectedRouter>
			</Fragment>
		)
	}
}
