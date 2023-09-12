import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import './Jiggle.scss';
import { images } from '../../utils/ImgBrowser';

function Jiggle() {
	const container = useRef();
	const id = 'mockId';
	const [img, setImg] = useState(images[1]);
	useEffect(() => {
		let svg = d3.select(`#${id}`);
		svg.selectAll('*').remove();
		const image = svg.append('image')
		image.attr('xlink:href', img).attr('width', 0).attr('height', 0);
		image.transition()
		.duration(500)
		.attr('transform', 'translate(100,100)')
		.attr('width', '400')
		.attr('height', '400')
		.transition().duration(700)
		.attr('transform', 'translate(200,200)')
		.attr('width', '0')
		.attr('height', '0')
		.transition().duration(500)
		.attr('transform', 'translate(100,100)')
		.attr('width', 'calc(100% - 200px)')
		.attr('height', '600');

	}, [img])

	useEffect(() => {
    const el = container.current;
    if (el) {
      const onWheel = e => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
	const selectImage = (img: string) => {
		setImg(img);
	}

  return (
    <div className="Jiggle">
			<div className="preview__container" ref={container}>
				{images.map((img, i) => 
				<div className="preview__item" key={i} >
					<img key={img} src={img} alt="jiggle me"
					onClick={() => selectImage(img)}/>
				</div>)}
			</div>
			<svg id={id} ></svg>
    </div>
  );
}

export default Jiggle;
