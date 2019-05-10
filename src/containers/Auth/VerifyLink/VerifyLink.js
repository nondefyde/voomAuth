import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../Auth.scss';
import { logout, verifyLink } from '../../../redux/actions';
import Progress from '../../../components/Progress';

const propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.object,
	verifyLink: PropTypes.func.isRequired,
};

const defaultProps = {
	loading: false,
	error: {},
};

class VerifyLinkComponent extends Component {
	componentDidMount() {
		const {match: {params}, logout, verifyLink} = this.props;
		if (!params['hash'] && !params['email']) {
			logout();
		} else {
			const data = {hash: params['hash'], email: params['email']};
			verifyLink(data);
		}
	}

	render() {
		const {loading, error, user} = this.props;
		return (
			<main role="main" className="auth-container">
				<Link to={''}>
					<img src={'/assets/img/auth-logo.png'} className="app-login-logo" alt={'logo'}/>
				</Link>
				<div className="access-area">
					<h2>Verify Email</h2>
					{loading && <Progress/>}
				</div>
			</main>
		)
	}
}

VerifyLinkComponent.propTypes = propTypes;
VerifyLinkComponent.defaultProps = defaultProps;

const stateProps = (state) => ({
	loading: state.ui.loading['verifyLink'],
	error: state.ui.errors['verifyLink'],
});
const dispatchProps = {
	logout,
	verifyLink
};

export default connect(stateProps, dispatchProps)(VerifyLinkComponent);
