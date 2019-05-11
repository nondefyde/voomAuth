import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

const Home = React.lazy(() => import('./containers/Home/Home'));
const ChangePassword = React.lazy(() => import('./containers/Auth/ChangePassword/ChangePassword'));
const Profile = React.lazy(() => import('./containers/User/Profile/Profile'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
	{path: '/', exact: true, name: 'App', component: DefaultLayout},
	{path: '/home', name: 'Home', component: Home},
	{path: '/profile', isPrivate: true, name: 'Profile', component: Profile},
	{path: '/change-password', isPrivate: true, name: 'Change Password', component: ChangePassword},
];

export default routes;
