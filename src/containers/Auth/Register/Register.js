import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { register, social } from '../../../redux/actions';
import RegisterForm from '../../../components/forms/auth/RegisterForm'
import '../Auth.scss';
import SocialAuth from '../../../components/SocialAuth'

const propTypes = {
	isLoggingIn: PropTypes.bool,
	register: PropTypes.func.isRequired,
	social: PropTypes.func.isRequired,
};

const defaultProps = {
	isLoggingIn: false,
};

const data = {
	email: "nondefyde@gmail.com",
	password: "password",
	confirm_password: "password",
	verify_redirect_url: process.env.REACT_APP_VERIFY_REDIRECT_URL
};

class RegisterComponent extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.socialResponse = this.socialResponse.bind(this);
	}

	componentDidMount() {
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

	handleSubmit(values) {
		const verify_redirect_url = process.env.REACT_APP_VERIFY_REDIRECT_URL;
		const regValues = {...values, verify_redirect_url};
		console.log('regValues : ', regValues);
		const {register} = this.props;
		register(regValues);
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
					<RegisterForm
						initialValues={data}
						onSubmit={this.handleSubmit} formLoading={isLoggingIn}/>
				</div>
				<p className="text">Already have an account? <Link to={'/login'}> Login</Link></p>
				<p className="text">By clicking create account, you agree to our
					<Link to={''}>Terms and Policy</Link></p>
			</main>
		)
	}
}

RegisterComponent.propTypes = propTypes;
RegisterComponent.defaultProps = defaultProps;

const stateProps = (state) => ({
	isLoggingIn: state.ui.loading['register'] || state.ui.loading['social'],
	error: state.ui.errors['register'] || state.ui.errors['social']
});

const dispatchProps = {
	register,
	social,
};

export default connect(stateProps, dispatchProps)(RegisterComponent);
