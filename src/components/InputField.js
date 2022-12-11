import React from 'react';
import clsx from 'clsx';

const InputField = (props) => {
	const { 
		name,
		label,
		islongitude,
		islatitude,
		register,
		errors,
	} = props;

	const isLat = num => isFinite(num) && Math.abs(num) <= 90;

	const isLong = num => isFinite(num) && Math.abs(num) <= 180;

	const validateField = (value) => {
		if(islatitude) {
			if(isLat(value)) return true;
			else return false;
		} else if(islongitude) {
			if(isLong(value)) return true;
			else return false;
		}
		return false;
	};

	return (
		<div className='input-root'>
			<div className='input-field'>
				<input required={true} type='number' step="any" className={clsx('bbox-input', {'input-error': errors?.[name]})} name={name} {...register?.(name, {required: true, validate: validateField, valueAsNumber: true })} />
				<span>{label}</span>
			</div>
		</div>
	);
};

export default InputField;