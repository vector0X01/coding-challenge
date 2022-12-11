import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';

const InputForm = (props) => {
	const { onSubmit, error } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
	});

	return (
		<form className='input-form' onSubmit={handleSubmit(onSubmit)}>
			{error ? <div className='error-text'>{error}</div> : null}
			<InputField label='Min Longitude' name='left' register={register} islongitude errors={errors} />
			<InputField label='Min Latitude' name='bottom' register={register} islatitude errors={errors} />
			<InputField label='Max Longitude' name='right' register={register} islongitude errors={errors} />
			<InputField label='Min Latitude' name='top' register={register} islatitude errors={errors} />
			<button className='search-btn' type='submit'>Submit</button>
		</form>
	);
};

export default InputForm;