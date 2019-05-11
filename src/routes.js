import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

const Home = React.lazy(() => import('./containers/Home/Home'));
const ChangePassword = React.lazy(() => import('./containers/Auth/ChangePassword/ChangePassword'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
	{path: '/', exact: true, name: 'App', component: DefaultLayout},
	{path: '/home', name: 'Home', component: Home},
	{path: '/change-password', name: 'Change Password', component: ChangePassword},
];

export default routes;
