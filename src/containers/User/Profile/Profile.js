import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../User.scss';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { ProfileForm } from '../../../components/forms/user';
import { updateProfile } from '../../../redux/actions';

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    user: PropTypes.object,
};

const defaultProps = {
    loading: false,
    error: null,
    user: null,
};

class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: props.user.logo
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileReady = this.onFileReady.bind(this);
    }

    componentDidMount() {
    }

    handleSubmit(values) {
        let {avatar} = this.state;
        const data = {...values, gender: values.gender.value, ...avatar};
        console.log('data : ', data);
        const {updateProfile} = this.props;
        updateProfile(data);
    }

    onFileReady(value) {
        this.setState({
            avatar: value
        });
    }

    render() {
        const {user, loading, error} = this.props;
        return (
            (!loading && <div className="profile-wrap">
                    <div className="container">
                        {error && <Alert color="danger">
                            {error}
                        </Alert>}
                        <h1>Profile</h1>
                        <ProfileForm initialValues={{
                            ...user,
                            dob: new Date(user.dob),
                            gender: {value: user.gender, label: user.gender},
                        }}
                                     onFileReady={this.onFileReady}
                                     onSubmit={this.handleSubmit}
                                     formLoading={loading}/>
                    </div>
                </div>
            )
        )
    }
}

ProfileComponent.propTypes = propTypes;
ProfileComponent.defaultProps = defaultProps;

const stateProps = (state) => ({
    loading: state.ui.loading['updateProfile'],
    error: state.ui.errors['updateProfile'],
    user: state.auth.user
});
const dispatchProps = {
    updateProfile
};

export default connect(stateProps, dispatchProps)(ProfileComponent);
