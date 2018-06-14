import React from "react";
import AddOption from "./AddOption";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {

	state = {
		options: [],
		selected: undefined
	};

	clearSelectedOption = () => {
		this.setState(() => ({
			selected: undefined
		}));
	};

	deleteOptions = () => {
		this.setState(() => {
			return ({
				options: []
			});
		});
	};

	deleteOption = option => {
		this.setState(prevState => ({
			options: prevState.options.filter((prevOption) => prevOption !== option)
		}));
	};

	addOption = option => {
		if(!option) {
			return 'Please enter a option';
		}
		if(this.state.options.indexOf(option) !== -1) {
			return 'This option already exists. Enter something else.';
		}
		this.setState(prevState => {
			let array = [...prevState.options];
			array.push(option);
			return({
				options: array,
			});
		});
	};

	pickOption = () => {
		let index = Math.floor(Math.random() * this.state.options.length);
		let selectedOption = this.state.options[index];
		this.setState(() => ({
			selected: selectedOption
		}));
	};

	render() {
		const subtitle = "Put your life in the hands of a computer.";

		return(
			<div>
				<Header
					subtitle={subtitle}
				/>
				<div className="container">
					<Action
						onPickOption={this.pickOption}
						hasOptions={this.state.options.length > 0}
					/>
					<div className="widget">
						<Options
							onDeleteOption={this.deleteOption}
							onDeleteOptions={this.deleteOptions}
							hasOptions={this.state.options.length > 0}
							options={this.state.options}
						/>
						<AddOption
							onAddOption={this.addOption}
						/>
					</div>
				</div>
				<OptionModal
					selected={!!this.state.selected}
					option={this.state.selected}
					onClearSelectedOption={this.clearSelectedOption}
				/>
			</div>
		);
	}

	componentDidMount() {
		try {
			let a = JSON.parse(localStorage.getItem("options"));
			if (a) {
				this.setState(() => ({options: a}));
			}
		} catch(e) {

		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.options.length !== this.state.options) {
			localStorage.setItem("options", JSON.stringify(this.state.options));
		}
	}
}