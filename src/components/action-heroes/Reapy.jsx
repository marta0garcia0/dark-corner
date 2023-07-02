import { createRef, useEffect } from 'react';
import { Clock, AnimationMixer, WebGLRenderer,
  Scene, PerspectiveCamera, PointLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const Reapy = () => {
  const container = createRef();
  const reapy = useLoader(GLTFLoader, './reapy.glb');

	const scene = new Scene();
  const clock = new Clock()

  const light1 = new PointLight();
  const light2 = new PointLight();
  const camera = new PerspectiveCamera(50, 1, 0.2, 2000);
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  let mixer;

	light1.position.set(2.5, 5, -20);
	light2.position.set(-2.5, 5, -20);
	scene.add(light1);
	scene.add(light2);

	camera.position.set(0, 1, -10);

	// GLTF position
	controls.target.set(-4, 0, 0);

	const animation = reapy.animations.filter(a => a.name.includes('ArmatureAction'));
	mixer = new AnimationMixer(reapy.scene);
	mixer.clipAction(animation[animation.length-1]).play();

	scene.add(reapy.scene)
	useEffect(() => {
		if (container.current) {
			container.current.innerHTML = '';
			container.current.append(renderer.domElement);
			animate();
		}
	}, [renderer]);
	
  const animate = function () {
    requestAnimationFrame(animate)
    controls.update();
		mixer.update(clock.getDelta())
    renderer.render(scene, camera)
  }

	return (
		<div ref={container} className="darkCornerContainer"></div>
	);
}