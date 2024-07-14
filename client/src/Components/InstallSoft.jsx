// DownloadComponent.js

import React from 'react';
import axios from 'axios';

const InstallSoft = () => {
  const handleDownload = () => {
    const softwareUrl = 'https://nodejs.org/dist/v14.17.0/node-v14.17.0-linux-x64.tar.xz';
    const downloadLocation = '/home/user/downloads/node-v14.17.0-linux-x64.tar.xz';

    axios.post('http://localhost:3001/download/approvedSoftware', { softwareUrl, downloadLocation })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error downloading software:', error);
      });
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Software</button>
    </div>
  );
};

export default InstallSoft;

