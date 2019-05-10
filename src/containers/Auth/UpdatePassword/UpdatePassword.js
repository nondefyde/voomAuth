import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdatePasswordForm from '../../../components/forms/auth/UpdatePasswordForm';

import { Alert } from 'reactstrap';
import { logout, updatePassword } from '../../../redux/actions';
import '../Auth.scss';

const propTypes = {
	error: PropTypes.object,
	loading: PropTypes.bool,
	logout: PropTypes.func.isRequired,
	resetPassword: PropTypes.func.isRequired,
};

const defaultProps = {
	loading: false,
	error: null
};

class LoginComponent extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.socialResponse = this.socialResponse.bind(this);
	}

	componentDidMount() {
		const {match: {params}, logout} = this.props;
		if (!params['hash'] && !params['email']) {
			logout();
		}
	}

	handleSubmit(values) {
		const {match: {params}, updatePassword} = this.props;
		const data = {...values, hash: params['hash'], email: params['email']};
		updatePassword(data);
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
		const {loading, error, match: {params}} = this.props;
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
					<UpdatePasswordForm initialValues={{email:params['email']}} onSubmit={this.handleSubmit} formLoading={loading}/>
				</div>
				<p className="text">Already have an account?<Link to={'/login'}> Login</Link></p>
			</main>
		)
	}
}

LoginComponent.propTypes = propTypes;
LoginComponent.defaultProps = defaultProps;

const stateProps = (state) => ({
	loading: state.ui.loading['updatePassword'],
	error: state.ui.errors['updatePassword']
});
const dispatchProps = {
	updatePassword,
	logout
};
export default connect(stateProps, dispatchProps)(LoginComponent);
