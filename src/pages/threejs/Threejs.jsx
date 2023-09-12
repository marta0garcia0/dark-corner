import { useEffect, useState } from 'react';

import { withMenu } from '../../hocs/withMenu';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {
  Environment,
  OrbitControls,
} from '@react-three/drei';
import { Carrousel } from '../../components/carrousel/Carrousel';
import { Loader } from '../../utils/components';

import './Threejs.scss';

export const Threejs = withMenu(() => {
  const [item, setItem] = useState(null);
  const [model, setModel] = useState(null);
  const [bg, setBg] = useState('studio');

  useEffect(() => {
    if (item) {
      const loader = new GLTFLoader();

      loader.load(`./${item}.glb`, (result) => {
        setModel(result);
      });
    }
  }, [item]);

  return (
    <div className="Threejs">
      <Carrousel theme="light">
        <div className="Threejs_select_container">
          <div className="Threejs_selector h3">
            <button className={`h3 ${item === 'blackdragon' ? 'active' : ''}`} onClick={() => setItem('blackdragon')}>Dragon</button>
            <button className={`h3 ${item === 'chucky' ? 'active' : ''}`} onClick={() => setItem('chucky')}>Chucky</button>
            <button className={`h3 ${item === 'sponge_bob' ? 'active' : ''}`} onClick={() => setItem('sponge_bob')}>Sponge Bob</button>
            <button className={`h3 ${item === 'patrickStar' ? 'active' : ''}`} onClick={() => setItem('patrickStar')}>Patrick Star</button>
            <button className={`h3 ${item === 'reapy' ? 'active' : ''}`} onClick={() => setItem('reapy')}>Reapy</button>
            <button className={`h3 ${item === 'freddy' ? 'active' : ''}`} onClick={() => setItem('freddy')}>Freddy Kruegger</button>
          </div>
          <div className="Threejs_selector bg h3">
            <button className={`h3 ${bg === 'studio' ? 'active' : ''}`} onClick={() => setBg('studio')}>Studio</button>
            <button className={`h3 ${bg === 'sunset' ? 'active' : ''}`} onClick={() => setBg('sunset')}>Sunset</button>
            <button className={`h3 ${bg === 'dawn' ? 'active' : ''}`} onClick={() => setBg('dawn')}>Dawn</button>
            <button className={`h3 ${bg === 'night' ? 'active' : ''}`} onClick={() => setBg('night')}>Night</button>
            <button className={`h3 ${bg === 'warehouse' ? 'active' : ''}`} onClick={() => setBg('warehouse')}>Warehouse</button>
            <button className={`h3 ${bg === 'forest' ? 'active' : ''}`} onClick={() => setBg('forest')}>Forest</button>
            <button className={`h3 ${bg === 'apartment' ? 'active' : ''}`} onClick={() => setBg('apartment')}>Apartment</button>
            <button className={`h3 ${bg === 'city' ? 'active' : ''}`} onClick={() => setBg('city')}>City</button>
            <button className={`h3 ${bg === 'park' ? 'active' : ''}`} onClick={() => setBg('park')}>Park</button>
            <button className={`h3 ${bg === 'lobby' ? 'active' : ''}`} onClick={() => setBg('lobby')}>Lobby</button>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          {model ?
            <div className="threejs_canvas">
              <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={<Loader />}>
                  <primitive object={ model.scene }
                    scale={4} />
                  <OrbitControls />
                  <Environment preset={bg} background />
                </Suspense>
              </Canvas>
            </div>
          : null}
        </Suspense>
      </Carrousel>
    </div>
  )
});
