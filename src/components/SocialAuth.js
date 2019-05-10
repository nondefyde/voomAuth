import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';

const SocialAuth = ({socialResponse}) => {
	const responseGoogle = (response) => {
		if (response.error) {
			socialResponse({error: response.error})
		} else {
			socialResponse({
				provider: 'google',
				social_id: response.googleId,
				email: response.profileObj.email,
				access_token: response.tokenId,
			})
		}
	};

	const responseFacebook = (response) => {
		if (response.error) {
			socialResponse({error: response.error})
		} else {
			socialResponse({
				provider: 'facebook',
				social_id: response.id,
				email: response.email,
				access_token: response.accessToken,
			})
		}
	};

	return (
		<ul>
			<li>
				<FacebookLogin
					appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
					autoLoad={false}
					fields="name,email"
					callback={responseFacebook}
					render={renderProps => (
						<a className="fb" onClick={renderProps.onClick}>Facebook</a>
					)}
				/>
			</li>
			<li><label>Email</label></li>
			<li>
				<GoogleLogin
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_KEY}
					render={renderProps => (
						<a className="gl" onClick={renderProps.onClick}>Google</a>
					)}
				/>
			</li>
		</ul>
	);
};

export default SocialAuth
