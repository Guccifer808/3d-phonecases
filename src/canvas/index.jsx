import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';

import Shadow from './Shadow';
import Camera from './Camera';
import Case from './Case';

const CanvasElement = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className='w-full max-w-full transition-all ease-in h-full'
    >
      <ambientLight intensity={0.4} />
      <Environment preset='city' />
      {/* <Environment path='/hdri/' files='potsdamer_platz_1k.hdr' /> */}
      <Camera>
        <Center>
          <Case />
        </Center>
        <Shadow />
      </Camera>
    </Canvas>
  );
};

export default CanvasElement;
