import React from 'react';

export default ({input, meta, ...rest}) => {

	let value = '';
	const codeArray = [];

	const setInputFocus = (n) => {
		const field = 'code' + n;
		document.getElementById(field).focus();
	};

	const setValue = () => {
		if (codeArray.length >= 4) {
			let codes = Array.from(document.querySelectorAll("input"));
			codes = codes.map(c => c.value);
			value = Object.values(codes).join('');
			input.onChange(value);
		}
	};

	// const resetCode = () => {
	// 	codeArray.length = 0;
	// 	setInputFocus(0);
	// };

	const checkCode = (e) => {
		const key = e.keyCode ? e.keyCode : e.which;
		if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
			(key === 65 && (e.ctrlKey || e.metaKey)) ||
			(key >= 35 && key <= 40) ||
			(key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
			(key >= 96 && key <= 105))
		) {
			e.preventDefault();
		} else if (key === 8) {
			codeArray.pop();
			const focusIndex = (codeArray.length) || 0;
			setInputFocus(focusIndex);
			setValue(codeArray.length - 1);
		} else {
			const value = e.target.value;
			if (codeArray.length <= 3) {
				codeArray.push(value);
				setValue(codeArray.length - 1);
				const focusIndex = (codeArray.length) || 0;
				if (codeArray.length <= 3) {
					setInputFocus(focusIndex);
				}
			}
		}
	};


	return (
		<div className="row">
			<div className="col">
				<input type="text" onKeyUp={checkCode}
				       maxLength="1" minLength="1" className="form-control" id="code0"/>
			</div>
			<div className="col">
				<input type="text" onKeyUp={checkCode}
				       maxLength="1" minLength="1" className="form-control" id="code1"/>
			</div>
			<div className="col">
				<input type="text" onKeyUp={checkCode}
				       maxLength="1" minLength="1" className="form-control" id="code2"/>
			</div>
			<div className="col">
				<input type="text" onKeyUp={checkCode}
				       maxLength="1" minLength="1" className="form-control" id="code3"/>
			</div>
			{meta.touched && meta.error && <div className="d-block invalid-feedback">{meta.error}</div>}
		</div>
	);
};
