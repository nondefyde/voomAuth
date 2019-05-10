import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Form, Row } from 'reactstrap';
import CodeInput from '../../../components/forms/inputs/CodeInput';
import Progress from '../../../components/Progress';

const validate = (values) => {
	const errors = {};
	if (!values.a) {
		errors.a = true;
	}
	if (!values.b) {
		errors.b = true;
	}
	if (!values.c) {
		errors.c = true;
	}
	if (!values.d) {
		errors.d = true;
	}
	return errors;
};
const VerifyForm = (props) => {
	const {handleSubmit, formLoading, submitting} = props;
	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Col>
					<Field name="verification_code" type="text"
					       disabled={formLoading}
					       component={CodeInput}/>
				</Col>
			</Row>
			<Button color="primary" disabled={formLoading || submitting}
			        className="btn btn-block mt-3">{formLoading ? <Progress/> : 'Login'}</Button>
		</Form>
	);
};

export default reduxForm({
	// a unique name for the form
	form: 'confirmEmailForm',
	validate,
	enableReinitialize: true,
})(VerifyForm);
