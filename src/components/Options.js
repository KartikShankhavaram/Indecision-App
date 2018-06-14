import React from 'react';
import Option from "./Option";

const Options = props => (
	<div>
		<div className='widget-header'>
			<h3 className="widget-header__title">Your Options</h3>
			<button
				className="button button--link"
				disabled={!props.hasOptions}
				onClick={() => {props.onDeleteOptions()}}
			>
				Delete All
			</button>
		</div>
		{props.options.length === 0 && <p className="widget-message">Please add an option to get started!</p>}
		<div>
			{props.options.map((option, index) => <Option index={index} onDeleteOption={props.onDeleteOption} option={option}/>)}
		</div>
	</div>
);

export default Options;