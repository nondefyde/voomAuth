import React from 'react';

const Progress = ({className, style, message, ...rest}) => (
	<div className={`Progress progress-spinner ${className || ''}`} style={style} {...rest}>
		<div className="bounce1"/>
		<div className="bounce2"/>
		<div className="bounce3"/>
		{message && <h6 className="progress-info">{message}</h6>}
	</div>
);

export default Progress;
