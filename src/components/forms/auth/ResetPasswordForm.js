import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';
import InputField from '../inputs/TextInput';
import Progress from '../../Progress';

const validate = (values) => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Please enter your email';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	return errors;
};
const ResetPasswordForm = (props) => {
	const {handleSubmit, submitting, formLoading, pristine} = props;
	return (
		<Form onSubmit={handleSubmit}>
			<div className="form-group">
				<Field name="email" type="email"
				       disabled={formLoading}
				       component={InputField} placeholder="johndoe@example.com"/>
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
})(ResetPasswordForm));
