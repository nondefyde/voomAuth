import React, { Fragment } from 'react';
import Select from 'react-select';
import { FormFeedback } from 'reactstrap';

export default ({options, name, placeholder, disabled, isSearchable, input, meta: {touched, error, warning}, children, ...rest}) => {
	const customStyles = {
		container: (base, state) => ({
			...base,
			opacity: state.isDisabled ? '.5' : '1',
			backgroundColor: 'transparent',
		}),
		control: (base) => ({
			...base,
			fontSize: 'inherit',
			boxShadow: 'none',
		}),
		input: (base) => ({
			...base,
		}),
		option: (base, {isSelected}) => ({
			...base,
			backgroundColor: isSelected ? '#495057' : '#ffffff',
			color: isSelected ? '#ffffff' : '#495057',
			':hover': {
				backgroundColor: isSelected ? '#495057' : '#F3F3F3'
			},
		}),
	};
	return <Fragment>
		<Select
			openMenuOnClick={true}
			openMenuOnFocus={true}
			hideSelectedOptions={true}
			placeholder={placeholder}
			name={name}
			isSearchable={isSearchable || false}
			styles={customStyles}
			options={options}
			value={input.value}
			onChange={(selected) => input.onChange(selected)}
			onBlur={() => input.onBlur(input.value)}
			{...rest}/>
		{touched && error && <FormFeedback className="d-block">{error}</FormFeedback>}
	</Fragment>;
};
