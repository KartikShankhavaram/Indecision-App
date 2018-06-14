import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
	<Modal
		onRequestClose={props.onClearSelectedOption}
		isOpen={props.selected}
		contentLabel="Selected option"
		closeTimeoutMS={200}
		className="modal"
	>
		<h3 className="modal_title">Selected Option</h3>
		<p className="modal__body">{props.option}</p>
		<button
			className="button"
			onClick={() => {setTimeout(props.onClearSelectedOption, 200)}}
		>OK</button>
	</Modal>
);

export default OptionModal;
