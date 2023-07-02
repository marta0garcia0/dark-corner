import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import './Jiggle.scss';
import { images } from '../../utils/ImgBrowser';

function Jiggle() {
	const id = 'mockId';
	const [img, setImg] = useState(images[1]);
	useEffect(() => {
		let svg = d3.select(`#${id}`);
		svg.selectAll('*').remove();
		const image = svg.append('image')
		image.attr('xlink:href', img).attr('width', 0).attr('height', 0);
		image.transition()
		.duration(2000)
		.attr('transform', 'translate(100,100)')
		.attr('width', '400')
		.attr('height', '400')
		.transition().duration(2000)
		.attr('transform', 'translate(200,200)')
		.attr('width', '0')
		.attr('height', '0')
		.transition().duration(2000)
		.attr('transform', 'translate(100,100)')
		.attr('width', '400')
		.attr('height', '400');

	}, [img])

	const selectImage = (img: string) => {
		setImg(img);
	}

  return (
    <div className="Jiggle">
			<div className="preview__container">
				{images.map(img => 
				<div className="preview__item">
					<img key={img} src={img} alt="jiggle me"
					onClick={() => selectImage(img)}/>
				</div>)}
			</div>
			<svg width="500" height="500" id={id} ></svg>
    </div>
  );
}

export default Jiggle;
