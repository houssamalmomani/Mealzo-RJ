import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [fromInputsValidity, setFromInputValidity] = useState({
		name: true,
		street: true,
		city: true,
		postal: true,
	});
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();
	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalIsValid = isFiveChars(enteredPostal);

		setFromInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postal: enteredPostalIsValid,
		});

		const formsIsValid =
			enteredNameIsValid &&
			enteredCityIsValid &&
			enteredStreetIsValid &&
			enteredPostalIsValid;

		if (!formsIsValid) {
			return;
		}
		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postal: enteredPostal,
		});
	};
	const nameControlClasses = `${classes.control} ${
		fromInputsValidity.name ? '' : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		fromInputsValidity.street ? '' : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		fromInputsValidity.city ? '' : classes.invalid
	}`;
	const postalControlClasses = `${classes.control} ${
		fromInputsValidity.postal ? '' : classes.invalid
	}`;
	return (
		<form
			className={classes.form}
			onSubmit={confirmHandler}
		>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					ref={nameInputRef}
				/>
				{!fromInputsValidity.name && <p>Please enter a valid input</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input
					type='text'
					id='street'
					ref={streetInputRef}
				/>
				{!fromInputsValidity.street && <p>Please enter a valid input</p>}
			</div>
			<div className={postalControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input
					type='text'
					id='postal'
					ref={postalInputRef}
				/>
				{!fromInputsValidity.postal && <p>Please enter a valid input</p>}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input
					type='text'
					id='city'
					ref={cityInputRef}
				/>
				{!fromInputsValidity.city && <p>Please enter a valid input</p>}
			</div>
			<div className={classes.actions}>
				<button
					type='button'
					onClick={props.onCancel}
				>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
