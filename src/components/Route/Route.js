import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authService from'../../services/auth';

const CustomRoute = ({
	                     component: Component,
	                     isPrivate,
	                     ...rest
                     }) => {
	const isLoggedIn = authService.isLoggedIn();
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isPrivate && !isLoggedIn) {
					return <Redirect to={{pathname: '/login', state: {from: props.location.pathname}}}/>;
				}
				return <Component {...props} />;
			}}/>);
};

export default CustomRoute;
