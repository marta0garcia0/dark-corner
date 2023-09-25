import { useEffect, useRef, useCallback, useState } from 'react';
import * as d3 from 'd3';
import chucky1 from './../../assets/img/chuckys/chucky1.png';
import chucky2 from './../../assets/img/chuckys/chucky2.png';
import chucky3 from './../../assets/img/chuckys/chucky3.png';
import chucky4 from './../../assets/img/chuckys/chucky4.png';
import chucky5 from './../../assets/img/chuckys/chucky5.png';
import chucky6 from './../../assets/img/chuckys/chucky6.png';
import chucky7 from './../../assets/img/chuckys/chucky7.png';
import chuckyLaugh from './../../assets/audio/chucky\'s-laugh.mp3';
import chuckyChant from './../../assets/audio/chucky-chant.mp3';
import chuckyNo from './../../assets/audio/chucky-noooooo.mp3';

import { skull } from './utils';

import './ChuckyGame.scss';
import { colors } from '../../styles/colors';
import { getTranslationValues } from '../../utils/utils';
import { usePrevious } from '../../hooks/usePrevious';

export const ChuckyGame = () => {
	const menuContainer = useRef();
	const game = useRef();

	const images = [chucky1, chucky2, chucky3, chucky4, chucky5, chucky6, chucky7];
	const [active, setActive] = useState(null);
	const [timing, setTiming] = useState(120);

	const playSound = (mp3) => {
		const audio = new Audio(mp3);
		audio.play();
	};

	const config = {
		'avatar_size': 100
	};

	const handleEscKey = useCallback(event => {
    const { keyCode } = event;
		const circle = d3.select('circle');
		const image = d3.select('image');
		const transform = getTranslationValues(circle.attr('transform'));
		const transformIm = getTranslationValues(image.attr('transform'));
		if (keyCode === 38) {
			event.preventDefault();
			if (+transform[1] - 10 > 0) {
				circle.attr('transform',`translate(${+transform[0]},${+transform[1] - 10})`);
				image.attr('transform',`translate(${+transformIm[0]},${+transformIm[1] - 10})`);
			}
		}
		if (keyCode === 40) {
			event.preventDefault();
			if (+transform[1] + 10 < game.current.getBoundingClientRect().height - config.avatar_size) {
				circle.attr('transform',`translate(${+transform[0]},${+transform[1] + 10})`);
				image.attr('transform',`translate(${+transformIm[0]},${+transformIm[1] + 10})`);
			}
		}
	}, []);

	const scrollDoc = (e) => {
		if(["ArrowUp","ArrowDown"].indexOf(e.code) > -1) {
				e.preventDefault();
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", scrollDoc, false);
		document.addEventListener('keydown', handleEscKey);
		return () => {
			document.removeEventListener('keydown', handleEscKey);
			window.removeEventListener("keydown", scrollDoc, false);
		}
	}, []);

	useEffect(() => {
		const body = d3.select(game.current);
		const svg = body.append('svg')
			.attr('width', 120)
			.attr('height', 120);
		const svg2 = body.append('svg')
			.attr('width', 120)
			.attr('height', 120);
		skull(svg, config.avatar_size, 100, 100, true);
		skull(svg2, config.avatar_size, 200, 100, false);
	}, []);


	const prevActive = usePrevious(active);
	useEffect(() => {
		let init = true;
		if (prevActive !== active && !init) {
			playSound(chuckyChant);
		}
		if (prevActive === null) {
			init = false;
		}
		if ((active || active === 0) && active >= 0) {
			const removeExtras = d3.selectAll('.avoidcollape').nodes();
			removeExtras.map(dotLimit => {
				if (+getTranslationValues(dotLimit.attributes.transform.value)[0] + 10 <= 0) {
					dotLimit.remove();
					return;
				}
			});
			const removeExtras2 = d3.selectAll('.avoidcollapeend').nodes();
			removeExtras2.map(dotLimit => {
				if (+getTranslationValues(dotLimit.attributes.transform.value)[0] + 10 <= 0) {
					dotLimit.remove();
					return;
				}
			});
			const body = d3.select(game.current);
			body.selectAll('*').remove();
			const svg = body.append('svg')
				.attr('width', game.current.getBoundingClientRect().width)
				.attr('height', game.current.getBoundingClientRect().height);
			const g = svg.append('g');
			if (game.current && svg) {
				const index = Math.round(Math.random() * Object.keys(colors).length);
				const index2 = Math.round(Math.random() * Object.keys(colors).length);
				const x = Math.round(0.5 * (game.current.getBoundingClientRect().width - 100));
				const y = Math.round(Math.random() * (game.current.getBoundingClientRect().height - 100));

				g
					.append('circle')
					.attr('class', 'chuckycircle')
					.attr('cx', config.avatar_size/2)
					.attr('cy', config.avatar_size/2)
					.attr('r', config.avatar_size/2)
					.style('cursor', 'pointer')
					.attr('fill', d3.color( colors[Object.keys(colors)[index]] ))
					.attr('stroke', d3.color( colors[Object.keys(colors)[index2]] ))
					.attr('transform','translate(' + x + ',' + y + ')');

				g.append('image')
					.attr('xlink:href', images[active])
					.attr('width',config.avatar_size/2)
					.attr('height',config.avatar_size)
					.style('cursor', 'pointer')
					.attr('transform','translate(' + (x + config.avatar_size/4) + ', ' + y +')')
					.attr('clip-path','url(#clipObj)');

				let yBU = 0;
				let lineData = [];
				const distantY = 160;
				const wallah = (init) => {
					const gap = 100;
					let fillx = init ? 0 : 1000;
					const steps = game.current.getBoundingClientRect().width / gap;
					const step = game.current.getBoundingClientRect().width / steps;
					const maxH = game.current.getBoundingClientRect().height - gap * 2;
					let hola = Array.from({length:steps+2},() => ([0, 0 ]));
					const allowedVariation = 100;
					let firstY = true;
					hola.reduce((acc, cV) => {
						const toAdd = Math.random() * allowedVariation - allowedVariation / 2;
						if ((!init || !firstY) && (acc + toAdd) <= maxH && (acc + toAdd) >= 0) {
							acc = acc + toAdd;
						}
						lineData.push([fillx, cV[1] + acc]);
						fillx+=step;
						yBU = cV[1] + acc;
						firstY = false;
						return acc;

					}, init ? Math.random() * (game.current.getBoundingClientRect().height - gap * 2) : yBU);

					const line2Data = lineData.map(vertex => {
						const edge = game.current.getBoundingClientRect().height - vertex[1] - gap;
						return [vertex[0], vertex[1] + gap + (edge*Math.random())];
					});

					const curve = d3.line().curve(d3.curveNatural);
					const startTranslateState = `translate(${0}px, ${0}px)`;
					const endTranslateState = `translate(-${init ? game.current.getBoundingClientRect().width :
						2 * game.current.getBoundingClientRect().width}px, ${0}px)`;
					const translateInterpolator = d3.interpolateString(startTranslateState, endTranslateState);

					svg.append("path")
						.attr("class", "line")
						.attr('d', curve(lineData))
						.attr('stroke', 'black')
						.attr('fill', 'none')
						.transition()
						.duration(5000)
						.styleTween('transform', function (d) {
							return translateInterpolator;
						})
						.on("end", () => {});

					svg.append("path")
						.attr('d', curve(line2Data))
						.attr('stroke', 'black')
						.attr('fill', (d, i) => {
							return 'none';
						});
				}

				wallah(true);
				let indexY = 0;
				let yAdd = 0;
				const initialY = Math.random() * (game.current.getBoundingClientRect().height - 100 * 2);
				let redirect = Math.random()*2 - 1;
				const MAX_RED_CNT = 15;
				let redirecCnt = MAX_RED_CNT;
				const limiting = (n, y) => {
					const removeExtras = d3.selectAll('.avoidcollape').nodes();
					removeExtras.map(dotLimit => {
						if (+getTranslationValues(dotLimit.attributes.transform.value)[0] + 10 <= 0) {
							dotLimit.remove();
						}
					});
					const removeExtras2 = d3.selectAll('.avoidcollapeend').nodes();
					removeExtras2.map(dotLimit => {
						if (+getTranslationValues(dotLimit.attributes.transform.value)[0] + 10 <= 0) {
							dotLimit.remove();
						}
					});
					removeExtras.map(node => {
						const transformed = getTranslationValues(node.getAttribute('transform'));
						if (init) {
							node.setAttribute('transform',`translate(${+transformed[0] - 0},${transformed[1]})`);
						} else {
							node.setAttribute('transform',`translate(${+transformed[0] - 10},${transformed[1]})`);
						}
						const chuckyPosition = getTranslationValues(d3.select('.chuckycircle').node().getAttribute('transform'));
						const nodePosition = getTranslationValues(node.getAttribute('transform'));
						const chuckyX = chuckyPosition[0];
						const nodeX = nodePosition[0];
						if (+nodeX > +chuckyX - config.avatar_size / 2 && +nodeX < +chuckyX + config.avatar_size / 2) {
							if (+nodePosition[1] >= +chuckyPosition[1]) {
								// meeeeh
								playSound(chuckyNo)
							}
							if (+nodePosition[1] + 170 <= +chuckyPosition[1] + config.avatar_size) {
								// meeeeeh
								playSound(chuckyLaugh)
							}
						}
					});
					removeExtras2.map(node => {
						const transformed = getTranslationValues(node.getAttribute('transform'));
						if (init) {
							node.setAttribute('transform',`translate(${+transformed[0] - 0},${transformed[1]})`);
						} else {
							node.setAttribute('transform',`translate(${+transformed[0] - 10},${transformed[1]})`);
						}
					});
					const gap = 10;
					let direction = 0;
					if (indexY%MAX_RED_CNT === 0) {
						direction = Math.round(Math.random()*2 - 1);
					}
					const finalY = !y ? initialY : y;
					const toRemoveExtras = svg
						.append('circle')
						.attr('class', 'avoidcollape')
						.attr('cx', 5)
						.attr('cy', 5)
						.attr('r', 10)
						.style('cursor', 'pointer')
						.attr('fill', d3.color( colors[Object.keys(colors)[10]] ))
						.attr('transform','translate(' + (game.current.getBoundingClientRect().width - 10 - 0) + ',' +
						//.attr('transform','translate(' + (game.current.getBoundingClientRect().width - 10 - n) + ',' +
							finalY + ')');
					toRemoveExtras
						.transition()
						.duration(timing)
						.on("end", () => {
							setTimeout(() => {
								indexY++;
								lineData.map(vertex => {
									const edge = game.current.getBoundingClientRect().height - vertex[1] - gap;
									return [vertex[0], vertex[1] + gap + (edge*Math.random())];
								});
								if (redirecCnt === MAX_RED_CNT) {
									redirect = Math.random()*2 - 1;
									redirecCnt = MAX_RED_CNT;
								} else {
									redirecCnt--;
								}
								let guay = finalY + 14 * redirect;
								if (finalY + 14 * redirect < 0) {
									guay = 0;
								} else if (finalY + 14 * redirect > game.current.getBoundingClientRect().height - 100 * 2) {
									guay = game.current.getBoundingClientRect().height - 100 * 2;
								}

								limiting(n + 10, guay);
							}, 10);
					});
					const position = getTranslationValues(toRemoveExtras.node().attributes.transform.value);
					// const distantY = Math.random() * (game.current.getBoundingClientRect().height - (position + 145));

					svg.append('circle')
						.attr('class', 'avoidcollapeend')
						.attr('cx', 5)
						.attr('cy', distantY)
						.attr('r', 10)
						.style('cursor', 'pointer')
						.attr('fill', d3.color( colors[Object.keys(colors)[1]] ))
						.attr('transform','translate(' + (game.current.getBoundingClientRect().width - 10 - 0) + ',' +
						// .attr('transform','translate(' + (game.current.getBoundingClientRect().width - 10 - n) + ',' +
							finalY + distantY
							// game.current.getBoundingClientRect().heigth - finalY + 200
							+ ')')
						.transition()
						.duration(timing);
					yAdd = 5/2 * direction + yAdd;
				}
				limiting( 0, null);
			}
		}
	}, [active]);

	return (
		<div className={"ChuckyGame_container"}>
			<div ref={menuContainer} className={"ChuckyGame_menu"}>
				<div className="Chuckys_img">
					{images.map((img, i) => {
						return <div key={i} className="Chuckys_container_bg">
							<div>
								<img  src={img} alt="chucky"/>
							</div>
						</div>
					})}
				</div>
				{images.map((img, i) => {
					return <div key={i} className="Chuckys_container">
						<div className={`Chuckys${active === i ? ' active' :  ''}`}
							onClick={() => setActive(i)}>
							<img  src={img} alt="chucky"/>
						</div>
					</div>
				})}
			</div>
			<div className={'ChuckyGame'}>
				<div ref={game} className='game_container'>
				</div>
				<div id="line"></div>
			</div>
		</div>
  );
};
