import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import '../Auth.scss';
import VerifyForm from '../../../components/forms/auth/VerifyForm';
import { verify, resendVerify } from '../../../redux/actions';

const propTypes = {
	loading: PropTypes.bool,
	verify: PropTypes.func.isRequired,
};

const defaultProps = {
	loading: false,
};

class VerifyComponent extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resendVerification = this.resendVerification.bind(this);
	}

	componentDidMount() {
	}

	handleSubmit(values) {
		console.log('values : ', values);
		const {verify} = this.props;
		verify({...values})
	}


	resendVerification(event) {
		event.preventDefault();
		const {resendVerify} = this.props;
		const data = {verify_redirect_url: process.env.REACT_APP_VERIFY_REDIRECT_URL};
		resendVerify({...data});
	}

	render() {
		const {loading, error, user} = this.props;
		return (
			<main role="main" className="auth-container">
				<Link to={''}>
					<img src={'/assets/img/auth-logo.png'} className="app-login-logo" alt={'logo'}/>
				</Link>
				<div className="confirm-phone access-area">
					<h2>Verify your Email</h2>
					{error && <Alert color="danger">
						{error}
					</Alert>}
					{user && <p className="notice">Enter the 4-digit code sent to <strong>{user.email}</strong></p>}
					<VerifyForm onSubmit={this.handleSubmit} formLoading={loading}/>
				</div>
				<p className="send-text">
					<a href="" onClick={(e) => this.resendVerification(e)} >Resend code</a>
				</p>
			</main>
		)
	}
}

VerifyComponent.propTypes = propTypes;
VerifyComponent.defaultProps = defaultProps;


const stateProps = (state) => ({
	loading: state.ui.loading['verify'] || state.ui.loading['resendVerify'],
	error: state.ui.errors['verify'] || state.ui.errors['resendVerify'],
	user: state.auth.user
});
const dispatchProps = {
	verify,
	resendVerify
};

export default connect(stateProps, dispatchProps)(VerifyComponent);
