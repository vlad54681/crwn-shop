import {
	SignUpContainer,
	ButtonsContainer
} from './sign-in-form.styles.jsx';
import { useState } from 'react';
import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	const SignInWithGoogle = async () => {
		await signInWithGooglePopup();
	}
	const handleSubmit = async (event) => {
		event.preventDefault();
		debugger
		try {
			await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert('incorrect password for email');
					break
				case "auth/user-not-found":
					alert('no user associated with this email');
					break
				default:
					console.log(error);
			}
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	}

	return (
		<SignUpContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit} >
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={SignInWithGoogle}>
						Sign In With Google
					</Button>
				</ButtonsContainer>
			</form>
		</SignUpContainer>

	)
}
export default SignInForm;