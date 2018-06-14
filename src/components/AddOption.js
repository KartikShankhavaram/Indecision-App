import React from "react";

export default class AddOption extends React.Component {

	state = {
		errorMsg: undefined
	};

	onFormSubmit = e => {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		if(option) {
			let a = this.props.onAddOption(option);
			this.setState(() => ({ errorMsg: a}));
			if(!a) {
				e.target.elements.option.value = "";
			}
		} else {
			this.setState(() => ({ errorMsg: 'Please enter an option.'}));
		}
	};

	getErrorMessage = () => {
		if(this.state.errorMsg)
			return(
				<div className="add-option-error">{this.state.errorMsg}</div>
			);
	};

	render() {
		return(
			<div>
				{this.getErrorMessage()}
				<form className="add-option" onSubmit={this.onFormSubmit}>
					<input className="add-option__input" type="text" name="option" />
					<button className="button">Add option</button>
				</form>
			</div>
		);
	}
}