import { createRef, useEffect } from 'react';
import { Clock, AnimationMixer, Color, WebGLRenderer,
  Scene, PerspectiveCamera, PointLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export const Po = () => {
  const container = createRef();
  const po = useLoader(GLTFLoader, './po.glb');
  
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

	light1.position.set(2.5, 2.5, 2.5);
	light2.position.set(-2.5, 2.5, 2.5);
	scene.add(light1);
	scene.add(light2);
	scene.background = new Color( 0xffffff );

	camera.position.set(20, 0, -10);

	// GLTF position
	controls.target.set(0, 0, 0);
	useEffect(() => {
		if (po) {
			const animation = po.animations.filter(a => a.name === ('Armature.001'));
			mixer = new AnimationMixer(po.scene);
			mixer.clipAction(animation[animation.length-1]).play();
	
			scene.add(po.scene);
			if (container.current) {
				container.current.innerHTML = '';
				container.current.append(renderer.domElement);
			}
			animate();	
		}
	}, [po]);

  const animate = function () {
    requestAnimationFrame(animate)
    controls.update();
		mixer.update(clock.getDelta())
    renderer.render(scene, camera)
  }

	return (<div ref={container} className="darkCornerContainer"></div>);
}