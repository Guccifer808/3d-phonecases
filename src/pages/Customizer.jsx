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

  const [file, setFile] = useState('');
  // AI prompt
  const [prompt, setPrompt] = useState('');
  // Img generating
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState('');

  const [activeFilterTab, setActiveFilterTab] = useState({
    caseLogo: true,
    phoneCase: false,
  });

  // show tab content on activeTab
  const showTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case 'aihelper':
        return (
          <AIHelper
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  // Handling AI prompt submit
  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt!');

    try {
      // backend call
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }
  };

  // Handling Decals
  const handleDecals = (type, result) => {
    //checking type of a decal(logo/full texture)
    const decalType = DecalTypes[type];
    // updating the state
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };
  //switch for showing logo or full texture
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'caseLogo':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'phoneCase':
        state.isFullTexture = !activeFilterTab[tabName];
      default:
        state.isFullTexture = true;
        state.isLogoTexture = false;
    }

    // updating UI
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  //reading uploaded files
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('');
    });
  };
  return (
    <AnimatePresence>
      {!snap.start && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              {/* Tab list */}
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {showTabContent()}
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
                handleClick={() => handleActiveFilterTab(tab.name)}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
