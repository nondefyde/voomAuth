import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChangePasswordForm from '../../../components/forms/auth/ChangePasswordForm';

import { Alert } from 'reactstrap';
import { changePassword, logout } from '../../../redux/actions/index';
import '../../User/User.scss';

const propTypes = {
	error: PropTypes.string,
	loading: PropTypes.bool,
	resetPassword: PropTypes.func.isRequired,
};

const defaultProps = {
	loading: false,
	error: null
};

const data = {
	current_password: "password",
	password: "password",
	confirm_password: "password"
};

class ChangePasswordComponent extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
	}

	handleSubmit(values) {
		const {changePassword} = this.props;
		const data = {...values};
		changePassword(data);
	}

	render() {
		const {loading, error} = this.props;
		return (
			<div className="profile-wrap">
				<div className="container">
					<div className="offset-2 col-md-8">
						<h1>Change Password</h1>
						<div className="profile-inwrap">
							{error && <Alert color="danger">
								{error}
							</Alert>}
							<div className="profile-data">
								<ChangePasswordForm initialValues={data} onSubmit={this.handleSubmit}
								                    formLoading={loading}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ChangePasswordComponent.propTypes = propTypes;
ChangePasswordComponent.defaultProps = defaultProps;

const stateProps = (state) => ({
	loading: state.ui.loading['updatePassword'],
	error: state.ui.errors['updatePassword']
});
const dispatchProps = {
	changePassword,
	logout
};
export default connect(stateProps, dispatchProps)(ChangePasswordComponent);
