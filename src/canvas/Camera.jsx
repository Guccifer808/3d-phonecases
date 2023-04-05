import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';

const Camera = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    // optimization of view for devices
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerHeight <= 600;

    // initial position
    let targetPosition = [-4, 0, 15];

    if (snap.start) {
      if (isBreakpoint) targetPosition = [0, 1.25, 20];
      if (isMobile) targetPosition = [0, 0, 15];
    } else {
      if (isMobile) targetPosition = [0, 0, 15];
      else targetPosition = [0, 0, 15];
    }

    // set camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 3, -state.pointer.x / 3, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default Camera;
