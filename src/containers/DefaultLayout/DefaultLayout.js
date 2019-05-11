import React, { Component, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Route from '../../components/Route/Route';
import Progress from '../../components/Progress/index';
import { Footer, Header } from '../../components/partials'
import routes from '../../routes';
import { connect } from 'react-redux';
// sidebar nav config

const propTypes = {
	isFetchingUser: PropTypes.bool,
	navigateTo: PropTypes.func,
};

const defaultProps = {
	isFetchingUser: false
};


class DefaultLayout extends Component {

	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

	render() {
		const {user, isFetchingUser} = this.props;
		console.log('user >>>>>> : ', user);
		return (
			(isFetchingUser && user) ?
				<Progress message="Please wait" className="alt" style={{margin: '100px auto'}}/> :
				<div>
					<Header user={user}/>
					<Suspense fallback={this.loading()}>
						<Switch>
							{routes.map(({component, path, exact, name, isPrivate}, idx) => {
								return component ? (
									<Route
										key={idx}
										path={`${path}`}
										exact={exact}
										name={name}
										isPrivate={isPrivate || undefined}
										component={component}/>
								) : (null);
							})}
							{/*<Redirect from={'/'} to={`/home`}/>*/}
						</Switch>
					</Suspense>
					<Footer user={user}/>
				</div>
		);
	}
}

DefaultLayout.propTypes = propTypes;
DefaultLayout.defaultProps = defaultProps;

const stateProps = (state) => ({
	isFetchingUser: state.ui.loading['isFetchingUser'],
	error: state.ui.errors['isFetchingUser'],
	user: state.auth.user,
});

const dispatchProps = {};
export default connect(stateProps, dispatchProps)(DefaultLayout);
