
import { Suspense } from 'react';
import {
  Environment,
  Html,
  useProgress,
  OrbitControls as OrbitControls2
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export const KnowYourFighters = () => {
  const chucky = useLoader(GLTFLoader, './chucky.glb');
  const reapy = useLoader(GLTFLoader, './reapy.glb');
 
	return (
		<div className="DarkCorner" >
			<Suspense fallback={<Loader />}>
				<div className="darkcorner_canvas_xl">
					<Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
						<ambientLight intensity={0.5} />
						<Suspense fallback={<Loader />}>
							<primitive object={ chucky.scene } scale={4} />
							<OrbitControls2 />
							<Environment preset="studio" background />
						</Suspense>
					</Canvas>
				</div>
			</Suspense>
			<Suspense fallback={<Loader />}>
				<div className="darkcorner_canvas_xl">
					<Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 0, -50] }}>
						<ambientLight intensity={0.5} />
						<Suspense fallback={<Loader />}>
							<primitive object={ reapy.scene } scale={4} />
							<OrbitControls2 />
							<Environment preset="studio" background />
						</Suspense>
					</Canvas>
				</div>
			</Suspense>
		</div>
	)
}