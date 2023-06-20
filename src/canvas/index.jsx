import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';

import Shadow from './Shadow';
import Camera from './Camera';
import Case from './Case';

const CanvasElement = () => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const canvasAspect = containerSize.width / containerSize.height;

  return (
    <Canvas
      style={{
        width: containerSize.width,
        height: containerSize.height,
      }}
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className='w-full max-w-full transition-all ease-in h-full'
    >
      <ambientLight intensity={0.4} />
      <Environment preset='city' />

      <Camera aspect={canvasAspect}>
        <Center>
          <Case />
        </Center>
        <Shadow />
      </Camera>
    </Canvas>
  );
};

export default CanvasElement;
