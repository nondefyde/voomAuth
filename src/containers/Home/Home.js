import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import { connect } from 'react-redux';

const propTypes = {
	user: PropTypes.object,
};

const defaultProps = {
	user: null,
};

class HomeComponent extends Component {

	componentDidMount() {
	}

	render() {
		const {user} = this.props;
		return (
			<div>
				Hello
			</div>
		)
	}
}


HomeComponent.propTypes = propTypes;
HomeComponent.defaultProps = defaultProps;

const stateProps = (state) => ({
	user: state.auth.user
});
const dispatchProps = {};
export default connect(stateProps, dispatchProps)(HomeComponent);
