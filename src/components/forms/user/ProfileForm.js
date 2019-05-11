import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';
import _ from 'lodash';
import classNames from 'classnames';
import MediaInputField from '../inputs/MediaInputField';
import InputField from '../inputs/TextInput';
import InputDate from '../inputs/DatePicker';
import InputSelect from '../inputs/SelectInput';
import Progress from '../../Progress';

import gender from '../../../utils/data/gender';

const validate = (values) => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = 'Please enter your first name';
    }
    if (!values.last_name) {
        errors.last_name = 'Please enter your last name';
    }
    if (!values.mobile) {
        errors.mobile = 'Please enter your mobile';
    }
    if (!values.gender) {
        errors.gender = 'Please select your gender';
    }
    if (!values.dob) {
        errors.dob = 'Please select date of birth';
    }
    return errors;
};

class ProfileForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            currentImage: null,
        };
        this.buttonClicked = this.buttonClicked.bind(this);
        this.displayFile = this.displayFile.bind(this);
    }

    componentDidMount() {
    }

    buttonClicked() {
        const {editMode} = this.state;
        this.setState({editMode: !editMode});
    }

    displayFile(value) {
        const {onFileReady} = this.props;
        if (value && !_.isEmpty(value.avatar.url)) {
            this.setState({currentImage: value.avatar.url});
            onFileReady(value);
        }
    }

    render() {
        const {handleSubmit, submitting, formLoading, pristine, initialValues, onFileReady} = this.props;
        const {editMode, currentImage} = this.state;
        console.log('currentImage : ', currentImage);
        return (
            <Form onSubmit={handleSubmit}>
                <div className="profile-inwrap">
                    <div className="col-md-12 text-right">
                        {!editMode ?
                            <button className="btn btn-light pull-right" onClick={this.buttonClicked}>Edit
                                Profile</button>
                            : <div className="col-md-12 text-right">
                                <Button color="primary" disabled={formLoading || submitting}
                                        className="btn btn-info pull-right mr-lg-1">{formLoading ?
                                    <Progress/> : 'Save'}</Button>
                                <button className="btn btn-light pull-right mr-lg-2" onClick={this.buttonClicked}>Cancel
                                </button>
                            </div>
                        }
                    </div>
                    <div className="profile-avatar-wrap">
                        <div className="row">
                            <div className="col-md-7">
                                <div className={classNames('avatar-bg', {'avatar': !editMode, 'edit-avatar': editMode})}
                                     style={{
                                         backgroundImage: (!editMode  && !_.isEmpty(initialValues.avatar)) || currentImage
                                             ? `url('${currentImage || initialValues.avatar.url}')` : "url('http://via.placeholder.com/150x150')"
                                     }}>
                                    {editMode && <Field name="avatar"
                                                        type="file"
                                                        accept='.jpg, .png, .jpeg'
                                                        disabled={formLoading}
                                                        onFileReady={this.displayFile}
                                                        component={MediaInputField}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-data mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <Field name="first_name" type="text"
                                           disabled={!editMode || formLoading}
                                           component={InputField} placeholder="First Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <Field name="last_name" type="text"
                                           disabled={!editMode || formLoading}
                                           component={InputField} placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field name="email" type="email"
                                           disabled={true}
                                           component={InputField} placeholder="Email"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>PHONE NUMBER</label>
                                    <Field name="mobile" type="text"
                                           disabled={!editMode || formLoading}
                                           component={InputField} placeholder="Mobile"/>
                                </div>
                                <div className="form-group">
                                    <label>DATE OF BIRTH</label>
                                    <Field name="dob" className="col-md-12"
                                           disabled={!editMode || formLoading}
                                           component={InputDate}/>
                                </div>
                                <div className="form-group">
                                    <label>GENDER</label>
                                    <Field name="gender" type="text"
                                           options={gender}
                                           disabled={formLoading}
                                           component={InputSelect} placeholder="Gender"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}

export default (reduxForm({
    // a unique name for the form
    form: 'profileForm',
    validate
})(ProfileForm));
