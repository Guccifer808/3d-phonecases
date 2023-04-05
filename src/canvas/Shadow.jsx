import { easing } from 'maath';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Shadow = () => {
  const shadow = useRef();
  return (
    <AccumulativeShadows
      position={[-5, 5, -0.1]}
      ref={shadow}
      frames={60}
      alphaTest={0.5}
      scale={25}
      resolution={1024}
      rotation={[Math.PI / 2, -0.25, 0]}
    >
      <RandomizedLight
        amount={5}
        radius={9}
        intensity={0.8}
        ambient={0.5}
        position={[2, -5, 10]}
      />
      <RandomizedLight
        amount={9}
        radius={6}
        intensity={0.6}
        ambient={0.2}
        position={[15, -5, -10]}
      />
    </AccumulativeShadows>
  );
};

export default Shadow;
