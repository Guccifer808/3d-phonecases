import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';

const Case = () => {
  const snap = useSnapshot(state);
  // 3d model
  const { nodes, materials } = useGLTF('/iphone4.glb');
  // const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  //smoothing colors
  useFrame(
    (state, delta) =>
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
    // easing.dampC(materials.skinCaseiphone.color, snap.color, 0.25, delta)
  );
  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString}>
      <mesh
        castShadow
        // geometry={nodes.T_Shirt_male.geometry}
        // material={materials.lambert1}
        geometry={nodes.iphone.geometry}
        material={materials.lambert1}
        material-roughness={1}
        // material-transparent={false}
        // material-opacity={1}
        dispose={null}
        rotation-x={Math.PI / 2}
      >
        {snap.isFullTexture && (
          <Decal
            position={[-2, 0, 0]}
            rotation={[180, 0, 0]}
            scale={3.3}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[-1.95, 0, 0]}
            // position={[0, 0, 0]}
            rotation={[180, 0, 0]}
            scale={1}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Case;
