import Button from './Button';

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>
        <p className='mt-2 text-sm truncate'>
          {file === '' ? 'No file selected' : file.name}
        </p>
      </div>
      {/* Buttons wrapper */}
      <div className='flex flex-wrap mt-4 gap-3'>
        <Button
          type='outline'
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles='text-xs'
        />
        <Button
          type='filled'
          title='Full'
          handleClick={() => readFile('full')}
          customStyles='text-xs'
        />
      </div>
    </div>
  );
};

export default FilePicker;
