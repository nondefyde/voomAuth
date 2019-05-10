import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';
import InputField from '../inputs/TextInput';
import Progress from '../../Progress';

const validate = (values) => {
	const errors = {};
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
const ResetForm = (props) => {
	const {handleSubmit, submitting, formLoading, pristine} = props;
	return (
		<Form onSubmit={handleSubmit}>
			<div className="form-group">
				<Field name="email" type="email"
				       disabled={true}
				       component={InputField} placeholder="johndoe@example.com"/>
			</div>
			<div className="form-group">
				<Field name="password" type="password"
				       disabled={formLoading}
				       component={InputField} placeholder="Password"/>
			</div>
			<div className="form-group">
				<Field name="confirm_password" type="password"
				       disabled={formLoading}
				       component={InputField} placeholder="Confirm Password"/>
			</div>
			<Button color="primary" disabled={formLoading || submitting}
			        className="btn-block px-4">{formLoading ? <Progress/> : 'Reset Password'}</Button>
		</Form>
	);
};

export default (reduxForm({
	// a unique name for the form
	form: 'registerForm',
	validate
})(ResetForm));
