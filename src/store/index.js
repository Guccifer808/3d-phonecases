import { proxy } from 'valtio';

const state = proxy({
  start: true,
  color: '#498dd6',
  isLogoTextured: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state;
