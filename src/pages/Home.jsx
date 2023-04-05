import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion';
// using valtio state manager
import state from '../store';

import { Button } from '../components';

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.start && (
        <motion.section className='home' {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img
              src='./threejs.png'
              alt='logo'
              className='w-8 h-8 object-contain'
            />
          </motion.header>
          <motion.div className='home-content' {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                BUILD <br className='xl:block hidden' /> YOUR OWN
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className='flex flex-col gap-5 mt-72 md:mt-2'
            >
              <p className='max-w-xl font-semibold text-black text-base'>
                Build your unique and exclusive phone case with our 3D
                AI-powered tool
              </p>
              <Button
                type='filled'
                title='Customize it'
                handleClick={() => (state.start = false)}
                customStyles='w-fit px-4 py-2.5 font-bold text-sm mx-auto sm:mx-0'
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
