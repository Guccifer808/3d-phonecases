import state from '../store';
import { useSnapshot } from 'valtio';

const Button = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);
  //Styles according to the type of button
  const styleOptions = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: '#fff',
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
