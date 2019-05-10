import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default ({input, meta, ...rest}) => {
	const recaptchaRef = React.createRef();
	const onExpired = () => {
		recaptchaRef.reset();
	};

	return (
		<div>
			<ReCAPTCHA
				ref={recaptchaRef}
				sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
				onChange={input.onChange}
				onExpired={onExpired}
			/>
			{meta.touched && meta.error && <div className="d-block invalid-feedback">{meta.error}</div>}
		</div>
	);
};
