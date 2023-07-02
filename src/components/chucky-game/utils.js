import * as d3 from 'd3';
export const skull = (svg, avatar_size, x, y, ok) => {
	svg
		.attr('transform', `translate(${x}, ${y})`)
		.append('circle')
		.attr('cx', avatar_size/2)
		.attr('cy', avatar_size/2)
		.attr('r', avatar_size/2)
		.attr('fill', 'black');
	svg
		.append('circle')
		.attr('cx', avatar_size/2)
		.attr('cy', avatar_size/2)
		.attr('r', avatar_size*.35)
		.attr('transform','translate(0, 30)')
		.attr('fill', 'black');
	svg
		.append('circle')
		.attr('cx', avatar_size/2)
		.attr('cy', avatar_size/2)
		.attr('r', avatar_size/7)
		.attr('transform','translate(-20, 0)')
		.attr('fill', 'white');
	svg
		.append('circle')
		.attr('cx', avatar_size/2)
		.attr('cy', avatar_size/2)
		.attr('r', avatar_size/7)
		.attr('transform','translate(20, 0)')
		.attr('fill', 'white');
	const arcGen = d3.arc()
		.innerRadius(15)
		.outerRadius(20)
		.startAngle(ok ? Math.PI/2 :  Math.PI/2)
		.endAngle(ok ? 3 * Math.PI/2 : -Math.PI/2);
	svg
		.append('path')
		.attr('d', arcGen)
		.attr('transform',`translate(50, ${ok ? 80 : 95})`)
		.attr('fill', 'white');
	return svg;
};
