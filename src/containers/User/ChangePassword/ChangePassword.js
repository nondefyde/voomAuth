import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChangePasswordForm from '../../../components/forms/user/ChangePasswordForm';

import { Alert } from 'reactstrap';
import { logout, updatePassword } from '../../../redux/actions';
import '../User.scss';

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
			<div className="profile-wrap">
				<div className="container">
					<div className="offset-2 col-md-8">
						<h1>Change Password</h1>
						<div className="profile-inwrap">
							<div className="col-sm-12 col-md-10 offset-md-1 mb-1">
								{error && <Alert color="danger">
									{error}
								</Alert>}
							</div>
						</div>
						<div class="profile-inwrap">
							<ChangePasswordForm onSubmit={this.handleSubmit} formLoading={loading}/>
						</div>
					</div>
				</div>
			</div>
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
