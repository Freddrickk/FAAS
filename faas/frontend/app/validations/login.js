import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};

	if(!data.username){
		errors.username = 'This field is required';
	}

	if(!data.password){
		errors.password = 'This field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}
