import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Alert } from 'reactstrap';
import { login, social } from '../../../redux/actions';
import authService from '../../../services/auth';
import LoginForm from '../../../components/forms/auth/LoginForm'
import SocialAuth from '../../../components/SocialAuth'
import '../Auth.scss';

const propTypes = {
	isLoggingIn: PropTypes.bool,
	login: PropTypes.func.isRequired,
	social: PropTypes.func.isRequired,
};

const defaultProps = {
	isLoggingIn: false,
};

const data = {
	email: "nondefyde@gmail.com",
	password: "password"
};

class LoginComponent extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.socialResponse = this.socialResponse.bind(this);
	}

	componentDidMount() {
	}

	handleSubmit(values) {
		const {login} = this.props;
		login(values);
	}

	socialResponse({provider, social_id, email, access_token, error}) {
		if (error) {
			console.log('error : ', error);
		} else {
			const data = {email, social_id, provider, access_token};
			console.log('data : ', data);
			const {social} = this.props;
			social(data);
		}
	}

	render() {
		const {isLoggingIn, error} = this.props;
		return (
			<main role="main" className="auth-container">
				<Link to={''}>
					<img src={'/assets/img/auth-logo.png'} className="app-login-logo" alt={'logo'}/>
				</Link>
				<div className="access-area">
					<h2>Log In</h2>
					{error && <Alert color="danger">
						{error}
					</Alert>}
					<div className="short-access">
						<SocialAuth
							socialResponse={this.socialResponse}
						/>
					</div>
					<LoginForm initialValues={data} onSubmit={this.handleSubmit} formLoading={isLoggingIn}/>
				</div>
				<p className="text">New to voomsway? <Link to={'/register'}> Create Account</Link></p>
				<p className="text"><Link to={'/reset-password'}>Forgot password?</Link></p>
			</main>
		)
	}
}

LoginComponent.propTypes = propTypes;
LoginComponent.defaultProps = defaultProps;

const stateProps = (state) => ({
	isLoggingIn: state.ui.loading['login'] || state.ui.loading['social'],
	error: state.ui.errors['login'] || state.ui.errors['social']
});
const dispatchProps = {
	login,
	social,
};
export default connect(stateProps, dispatchProps)(LoginComponent);
