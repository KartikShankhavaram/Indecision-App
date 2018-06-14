import React from 'react';

const Option = props => (
	<div className="option">
		<p className="option__text">{props.index+1}. {props.option}</p>
		<button
			className="button button--link"
			onClick={() => {props.onDeleteOption(props.option)}}
		>
			Delete
		</button>
	</div>
);

export default Option;