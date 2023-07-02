import './Carrousel.scss';

export const Carrousel = ({...props}) => {

	return (
		<div className={'Carrousel_container ' + props.theme}>
			{props && props.children}
		</div>

  );
};
