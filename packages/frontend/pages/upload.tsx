import React from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';

import Layout from '../components/layout';
import Dropzone from '../components/dropzone';
import SubHeading from '../components/sub-heading';
import Paragraph from '../components/paragraph';

import '../utils/setup-axios';

export type Props = {
  userId: string;
};

class Index extends React.Component<Props> {
  static async getInitialProps(req): Promise<Props> {
    return { userId: req.query.user_id };
  }

  constructor(props) {
    super(props);

    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleDropzoneTrigger = this.handleDropzoneTrigger.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  async onFileUpload(file: FileList) {
    try {
      let data = new FormData();
      // @ts-ignore
      data.append('audio', file[0]);
      data.append('user_id', this.props.userId);

      let res = await axios.post('/upload', data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });

      console.log(res.data);

      alert('File uploaded!');
    } catch (e) {
      console.error(e.response);
      console.error(e);

      alert('Could not upload file!');
    }
  }

  handleSelectFile(selectedFiles: FileList) {
    if (!selectedFiles.length) return;
    this.onFileUpload(selectedFiles);
  }

  handleDropzoneTrigger() {
    let inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.multiple = false;

    let handleSelectFile = this.handleSelectFile;
    inputElement.addEventListener('change', function() {
      if (!this.files) return;
      // @ts-ignore...
      handleSelectFile([...this.files]);
    });
    inputElement.dispatchEvent(new MouseEvent('click'));
  }

  render() {
    return (
      <Layout title="User">
        <SubHeading>Upload</SubHeading>
        <Paragraph>
          This page is only for DEMO purposes. <br /> In a production environment calls will be recorded and processed
          automatically after each call a staff member makes.
        </Paragraph>
        <Dropzone
          onTrigger={this.handleDropzoneTrigger}
          onDrop={this.handleSelectFile}
          heading="Upload a call recording"
          content="allowed extensions: mp3, wav, aiff"
          illustration={<img src="/static/upload.svg" title="Upload icon" alt="Upload icon" />}
        />
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
