import { useEffect, useState } from 'react';
import * as d3 from 'd3';

import Logo from './../../assets/img/logo.png';

import './Animation.scss';

function Animation({...props}) {
	const id = 'mockId';
	const [transitionEnd, setTransitionEnd] = useState(false);

	useEffect(() => {
		const svg = d3.select(`#${id}`);
		svg.selectAll('*').remove();
		const image = svg.append('image');
		image.attr('xlink:href', Logo).attr('width', 0).attr('height', 0);
		const width = svg.property('width').baseVal.value;
		image
			//.transition().duration(2 * width)
			.attr('x1', width / 2)
			.attr('y1', 0)
			.attr('width', width)
			.attr('height', '400')
			//.transition().duration(2 * width)
			.attr('transform', 'translate(' + (-(width / 10)) + ', 0)')
			.transition().duration(2 * width)
			.attr('transform', 'translate(' + (width / 2 -
					(width / 25) ) + ','+ width / 5 + ') rotate(-30)')
			.on("end", () => {
				setTransitionEnd(true);
			});

		const container = d3.select('#container');
		container.selectAll('*').remove();

		const canvas = container.append('canvas')
			.attr('width', 300).attr('height', 200);

		const ctx = canvas.node()?.getContext('2d');
		if (ctx) {
			const img = new Image();
			img.onload = () => {
				ctx.drawImage(img, 50, 0, 200, 200);
				ctx.beginPath();
				ctx.moveTo(30, 96);
				ctx.stroke();
			};
			img.src = Logo;
		}

	}, [])

  return (
    <div className="Animation_container">
			{transitionEnd ? props.children : null}
			<svg height="500" id={id} ></svg>
			<div id="container" ></div>
    </div>
  );
}

export default Animation;
