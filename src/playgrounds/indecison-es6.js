console.log("Running");

const app = {
	title: "Indecision app",
	subtitle: "Put your life in the hands of a computer",
	options: ["One", "Two", "Three"]
};

const onFormSubmit = e => {
	e.preventDefault();

	const option = e.target.elements.option.value;
	if(option) {
		app.options.push(option);
		e.target.elements.option.value = "";
		renderPage();
	}
};

const onReset = () => {
	app.options.length = 0;
	renderPage();
};

const onMakeDecision = () =>{
	const randomNum = Math.floor(Math.random() * app.options.length);
	const option = app.options[randomNum];
	alert(option);
	console.log(randomNum);
};

let appRoot = document.querySelector("#app");

const renderPage = () => {
	const template = (
		<div>
			<h1>{app.title}</h1>
			<p>{app.subtitle && app.subtitle}</p>
			<button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
			{app.options.length > 0 ?
				<div>
					<p>Here are your options: </p>
					<button onClick={onReset}>Reset</button>
					<ol>{app.options.map((option, index) => <li key={index}>{option}</li>)}</ol>
				</div>
				: <p>No options</p>}
			<form onSubmit={onFormSubmit}>
				<input type="text" name="option" />
				<button>Add option</button>
			</form>
		</div>
	);
	console.log('Rendered!');
	ReactDOM.render(template, appRoot);
};

renderPage();
