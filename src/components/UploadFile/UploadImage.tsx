import React from 'react';
import './upload.css';
import { Box } from '@mui/material';
import { ErrorSnackbar } from 'src/utils/ShowSnackbar';

interface Props {
  fileUpload: File | undefined;
  setFileUpload: Function;
  notShowDelete?: boolean;
  style?: Record<string, string>;
  urlImage?: string;
  fileType?: string;
}

const UploadImage = (props: Props) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLInputElement;

    let file = target.files ? target.files[0] : null;

    if (file === null) {
      ErrorSnackbar('Tệp không tồn tại!!');
      return;
    }

    if (file.size > 1024 * 1024) {
      ErrorSnackbar('Tệp lớn hơn 1MB!!');
      return;
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      ErrorSnackbar('Tệp không đúng định dạng JPG/PNG !!');
      return;
    }

    props.setFileUpload(file);
    event.target.value = '';
  };

  const handleDestroy = () => {
    props.setFileUpload(undefined);
  };

  const styleUpload = {
    display: props.fileUpload || props.urlImage ? 'block' : 'none'
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        sx={{
          // maxWidth: '450px',
          height: '300px',
          width: '100%',
          border: '1px solid #ddd',
          padding: '15px',
          position: 'relative',
          ...props.style
        }}
      >
        <input
          type="file"
          id="file_up"
          name="file"
          accept={props.fileType || 'image/*'}
          onChange={handleUpload}
        />
        <div id="file_img" style={styleUpload}>
          <img
            src={
              props.urlImage
                ? props.urlImage
                : URL.createObjectURL(
                    props.fileUpload ? props.fileUpload : new Blob()
                  )
            }
            alt=""
          />
          {!props.notShowDelete && <div onClick={handleDestroy}>X</div>}
        </div>
      </Box>
    </Box>
  );
};

export default UploadImage;
