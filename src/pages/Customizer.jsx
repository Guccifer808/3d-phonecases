import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { motion, AnimatePresence } from 'framer-motion';

import { Button, AIHelper, ColorPicker, FilePicker, Tab } from '../components';

import config from '../config/config';
import state from '../store';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';

const Customizer = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {!snap.start && (
        <>
          <motion.div
            key='custom'
            className='absolute top-o left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              {/* Tab list */}
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => {}} />
                ))}
              </div>
            </div>
          </motion.div>
          {/* Back button */}
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <Button
              type='filled'
              title='Back'
              handleClick={() => (state.start = true)}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          {/* Bottom buttons */}
          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => {}}
                isFilterTab
                isActiveTab=''
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
