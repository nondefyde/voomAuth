import React from 'react'
import SocialLogin from 'react-social-login'

const AppButton = ({children, triggerLogin, ...props}) => (
	<a onClick={triggerLogin} {...props}>
		{children}
	</a>
);

export default SocialLogin(AppButton);
