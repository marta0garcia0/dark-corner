import { useState } from 'react';
import { Chucky } from './Chucky';
import { Reapy } from './Reapy';


export const ActionHeroes = () => {
  const [gltf, setGltf] = useState('chucky');

	return (
		<div>
			<span>Choose your fighter</span>
			<button onClick={() => setGltf('chucky')}>Chucky</button>
			<button onClick={() => setGltf('reapy')}>Reapy</button>
			{gltf === 'chucky' ? <Chucky /> : null}
			{gltf === 'reapy' ? <Reapy /> : null}
		</div>
	)
}