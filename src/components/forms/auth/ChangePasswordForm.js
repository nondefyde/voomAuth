import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';
import InputField from '../inputs/TextInput/index';
import Progress from '../../Progress/index';

const validate = (values) => {
	const errors = {};
	if (!values.current_password) {
		errors.password = 'Please enter your current password';
	}
	if (!values.password) {
		errors.password = 'Please enter your password';
	} else if (values.password.length < 6) {
		errors.password = 'Password should be 6+ characters';
	}
	if (!values.confirm_password) {
		errors.confirm_password = 'Please confirm your password';
	} else if (values.password !== values.confirm_password) {
		errors.confirm_password = 'Password mismatch';
	}
	return errors;
};
const ChangePasswordForm = (props) => {
	const {handleSubmit, submitting, formLoading, pristine} = props;
	return (
		<Form onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<label>Old Password</label>
						<div className="form-group">
							<Field name="current_password" type="password"
							       disabled={formLoading}
							       component={InputField} placeholder="Current Password"/>
						</div>
						<div className="form-group">
							<label>New Password</label>
							<Field name="password" type="password"
							       disabled={formLoading}
							       component={InputField} placeholder="New Password"/>
						</div>
						<div className="form-group">
							<label>Confirm Password</label>
							<Field name="confirm_password" type="password"
							       disabled={formLoading}
							       component={InputField} placeholder="Confirm Password"/>
						</div>
						<div className="form-group">
							<Button color="primary" disabled={formLoading || submitting}
							        className="btn-block px-4">{formLoading ? <Progress/> : 'Reset Password'}</Button>
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
};

export default (reduxForm({
	// a unique name for the form
	form: 'changePasswordForm',
	validate
})(ChangePasswordForm));
