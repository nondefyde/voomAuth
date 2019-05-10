import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Form, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
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
const ResetForm = (props) => {
	const {handleSubmit, submitting, formLoading, pristine} = props;
	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup className="mb-3">
				<InputGroupAddon addonType="prepend">
					<InputGroupText>
						<i className="fa fa-envelope"/>
					</InputGroupText>
				</InputGroupAddon>
				<Field name="email" type="email"
				       disabled={formLoading}
				       component={InputField} placeholder="name@example.com"/>
			</InputGroup>
			<Row>
				<Col xs="6">
					<Button color="primary" disabled={formLoading || submitting || pristine}
					        className="px-4">{formLoading ? <Progress/> : 'Reset'}</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default (reduxForm({
	// a unique name for the form
	form: 'registerForm',
	validate
})(ResetForm));
