import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ResetPasswordForm from '../../../components/forms/auth/ResetPasswordForm';

import { Alert } from 'reactstrap';
import { resetPassword } from '../../../redux/actions';
import '../Auth.scss';

const propTypes = {
	error: PropTypes.object,
	loading: PropTypes.bool,
	resetPassword: PropTypes.func.isRequired,
};

const defaultProps = {
	loading: false,
	error: null
};

const data = {
	email: "nondefyde@gmail.com"
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
		const {resetPassword} = this.props;
		const data = {...values, redirect_url: process.env.REACT_APP_UPDATE_PASSWORD_URL};
		resetPassword(data);
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
		const {loading, error} = this.props;
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
					<ResetPasswordForm initialValues={data} onSubmit={this.handleSubmit} formLoading={loading}/>
				</div>
				<p className="text">Already have an account?<Link to={'/login'}> Login</Link></p>
			</main>
		)
	}
}

LoginComponent.propTypes = propTypes;
LoginComponent.defaultProps = defaultProps;

const stateProps = (state) => ({
	loading: state.ui.loading['resetPassword'],
	error: state.ui.errors['resetPassword']
});
const dispatchProps = {
	resetPassword,
};
export default connect(stateProps, dispatchProps)(LoginComponent);
