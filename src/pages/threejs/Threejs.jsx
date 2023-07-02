import { useMemo, useState } from 'react';

import { withMenu } from '../../hocs/withMenu';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from '@react-three/drei';
import { Carrousel } from '../../components/carrousel/Carrousel';

import './Threejs.scss';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export const Threejs = withMenu(() => {
  const [item, setItem] = useState('dragon');
  const [bg, setBg] = useState('studio');
  const dragon = useLoader(GLTFLoader, './blackdragon.glb');
  const patrickStar = useLoader(GLTFLoader, './patrickStar.glb');
  const spongeBob = useLoader(GLTFLoader, './sponge_bob.glb');

  const chucky = useLoader(GLTFLoader, './chucky.glb');
  
  const copiedScene = useMemo(() => dragon.scene.clone(), [dragon]);
  const copiedScene2 = useMemo(() => dragon.scene.clone(), [dragon]);

  return (
    <div className="Threejs">
      <Carrousel theme="light">
        <div className="Threejs_select_container">
          <div className="Threejs_selector h3">
            <button className={`h3 ${item === 'dragon' ? 'active' : ''}`} onClick={() => setItem('dragon')}>Dragon</button>
            <button className={`h3 ${item === 'chucky' ? 'active' : ''}`} onClick={() => setItem('chucky')}>Chucky</button>
            <button className={`h3 ${item === 'spongeBob' ? 'active' : ''}`} onClick={() => setItem('spongeBob')}>Sponge Bob</button>
            <button className={`h3 ${item === 'patrickStar' ? 'active' : ''}`} onClick={() => setItem('patrickStar')}>Patrick Star</button>
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
          {item === 'dragon' ?
          <div>
            <div className="threejs_canvas">
              <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={<Loader />}>
                  <primitive object={ dragon.scene } 
                    position={[0, -20, -30]}
                    scale={4} />
                  <OrbitControls />
                  <Environment preset="forest" background />
                </Suspense>
              </Canvas>
            </div>
            <div className="threejs_canvas">
              <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={<Loader />}>
                  <primitive object={ copiedScene } 
                    position={[0, -20, -30]}
                    scale={4} />
                  <OrbitControls />
                  <Environment preset={bg} background />
                </Suspense>
              </Canvas>
            </div>
            <div className="threejs_canvas">
              <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={<Loader />}>
                  <primitive object={ copiedScene2 } 
                    position={[0, -20, -30]}
                    scale={4} />
                  <OrbitControls />
                </Suspense>
              </Canvas>
            </div>
          </div>
          : null}
          {item === 'chucky' ?
            <div className="threejs_canvas">
              <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={<Loader />}>
                  <primitive object={ chucky.scene } 
                    
                    scale={4} />
                  <OrbitControls />
                  <Environment preset={bg} background />
                </Suspense>
              </Canvas>
            </div>
          : null}
          {item === 'spongeBob' ?
            <div className="threejs_canvas">
              <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={<Loader />}>
                  <primitive object={ spongeBob.scene } 
                    scale={4} />
                  <OrbitControls />
                  <Environment preset={bg} background />
                </Suspense>
              </Canvas>
            </div>
          : null}
          {item === 'patrickStar' ?
            <div className="threejs_canvas">
              <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
                <ambientLight intensity={0.5} />
                <Suspense fallback={<Loader />}>
                  <primitive object={ patrickStar.scene } 
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
