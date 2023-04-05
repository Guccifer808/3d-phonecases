import state from '../store';
import { useSnapshot } from 'valtio';

import { getContrastingColor } from '../config/helpers';

const Button = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);
  //Styles according to the type of button
  const styleOptions = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
        borderColor: getContrastingColor(snap.color),
        borderWidth: '1px',
      };
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: getContrastingColor(snap.color),
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    }
  };
  return (
    <button
      className={`p-2 flex-1 rounded-md ${customStyles}`}
      style={styleOptions(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
