import React from 'react';
import TextFieldGroup from './TextFieldGroup.js';
import validateInput from './validations/login.js';

class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			errors: {},
			isLoading: false
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	isValid(){
		const { errors, isValid } = validateInput(this.state);

		if(!isValid){
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e){
		e.preventDefault();
		if(this.isValid()){

		}
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}


	render(){
		const { errors, username, password, isLoading } = this.state;
	
		return(
			<form onSubmit={this.onSubmit}>
				<h1>Login</h1>
				<TextFieldGroup
				field="username"
				label="Username"
				value={username}
				error={errors.username}
				onChange={this.onChange}
				/>

				<TextFieldGroup
				field="password"
				label="Password"
				value={password}
				error={errors.password}
				onChange={this.onChange}
				type="password"
				/>

				<div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
			</form>
		);
	}
}

export default LoginForm;
