import { swatch, fileIcon, ai, caseLogo, phoneCase } from '../assets';

export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: swatch,
  },
  {
    name: 'filepicker',
    icon: fileIcon,
  },
  {
    name: 'aipicker',
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: 'caseLogo',
    icon: caseLogo,
  },
  {
    name: 'phoneCase',
    icon: phoneCase,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'caseLogo',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'phoneCase',
  },
};
