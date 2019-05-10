import React, { Component } from 'react';
import { Header } from '../../components/partials'
import PropTypes from 'prop-types';
import './Home.scss';
import { login, social } from '../../redux/actions';
import { connect } from 'react-redux';

const propTypes = {
	user: PropTypes.object,
};

const defaultProps = {
	user: null,
};

class HomeComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
	}

	render() {
		const {user} = this.props;
		console.log("user : ", user);
		return (
			<div>
				<Header
					user={user}
				/>
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
const dispatchProps = {
	login,
	social,
};
export default connect(stateProps, dispatchProps)(HomeComponent);
