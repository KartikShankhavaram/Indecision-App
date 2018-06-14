class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			options: ["One", "Two", "Three"],
		};

		this.deleteOptions = this.deleteOptions.bind(this);
		this.addOption = this.addOption.bind(this);
		this.pickOption = this.pickOption.bind(this);
		this.deleteOption = this.deleteOption.bind(this);
	}

	deleteOptions() {
		this.setState(() => {
			return ({
				options: []
			});
		});
	}

	deleteOption(option) {
		this.setState(prevState => ({
			options: prevState.options.filter((prevOption) => prevOption !== option)
		}));
	}

	addOption(option) {
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
	}

	pickOption() {
		let index = Math.floor(Math.random() * this.state.options.length);
		alert(this.state.options[index]);
	}

	componentDidMount() {
		let a = JSON.parse(localStorage.getItem("options"));
		if(a) {
			this.setState({ options: a });
		}
	}

	render() {
		const subtitle = "Put your life in the hands of a computer.";

		return(
			<div>
				<Header subtitle={subtitle} />
				<Action onPickOption={this.pickOption} hasOptions={this.state.options.length > 0}/>
				<Options onDeleteOption={this.deleteOption} onDeleteOptions={this.deleteOptions} hasOptions={this.state.options.length > 0} options={this.state.options}/>
				<AddOption onAddOption={this.addOption}/>
			</div>
		);
	}

	componentDidMount() {
		try {
			let a = JSON.parse(localStorage.getItem("options"));
			if (a) {
				this.setState({options: a});
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

const Header = (props) => (
	<div>
		<h1>{props.title}</h1>
		<h2>{props.subtitle}</h2>
	</div>
);

Header.defaultProps ={
	title: "Indecision App"
};

const Action = props => (
	<div>
		<button disabled={!props.hasOptions} onClick={() => {props.onPickOption()}}>What should I do?</button>
	</div>
);

const Options = props => (
	<div>
		<button disabled={!props.hasOptions} onClick={() => {props.onDeleteOptions()}}>Delete All</button>
		{props.options.length === 0 && <p>Please add an option to get started!</p>}
		<div>
			{props.options.map((option, index) => <Option key={index} onDeleteOption={props.onDeleteOption} index={index} option={option}/>)}
		</div>
	</div>
);

const Option = props => (
	<div>
		<strong>{props.index + 1}.  </strong>
		{props.option}
		<button onClick={() => {props.onDeleteOption(props.option)}}>Delete</button>
	</div>
);

class AddOption extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			errorMsg: ""
		};
	}

	onFormSubmit(e) {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		if(option) {
			let a = this.props.onAddOption(option);
			this.setState({ errorMsg: a});
			if(!a) {
				e.target.elements.option.value = "";
			}
		}
	}

	render() {
		return(
			<div>
				<form onSubmit={this.onFormSubmit.bind(this)}>
					<input type="text" name="option" />
					<button>Add option</button>
				</form>
				<div style={{ color: 'red'}}>{this.state.errorMsg}</div>
			</div>
		);
	}
}

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));