import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'reactstrap';
import MediaField from '../inputs/MediaInputField';

const validate = (values) => {
	const errors = {};
	if (!values.logo) {
		errors.logo = 'Logo must be selected';
	}
	return errors;
};

const AvatarUploadForm = (props) => {
	const {onSubmit, formLoading, pristine} = props;

	const onFileReady = (value) => {
		onSubmit(value)
	};

	return (
		<Form>
			<Field name="logo"
			       accept='.jpg, .png, .jpeg'
			       onFileReady={onFileReady}
			       disabled={formLoading}
			       component={MediaField}/>
		</Form>
	);
};

export default (reduxForm({
	// a unique name for the form
	form: 'avatarForm',
	validate
})(AvatarUploadForm));
