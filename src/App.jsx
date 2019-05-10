import React, { Component, Fragment } from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Route from './components/Route/Route';
import HomeComponent from './containers/Home/Home';
import { history } from './redux/store';
import LoginComponent from './containers/Auth/Login/Login';
import RegisterComponent from './containers/Auth/Register/Register';
import VerifyComponent from './containers/Auth/Verify/Verify';

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
						<Route exact path="/" name="Home" component={HomeComponent}/>
						<Route exact path="/login" name="Login" component={LoginComponent}/>
						<Route exact path="/register" name="Register" component={RegisterComponent}/>
						<Route exact path="/verify" name="Verify" component={VerifyComponent}/>
					</Switch>
				</ConnectedRouter>
			</Fragment>
		)
	}
}
