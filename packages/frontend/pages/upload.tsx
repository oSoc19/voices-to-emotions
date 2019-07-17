import React from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';

import Layout from '../components/layout';
import Dropzone from '../components/dropzone';

import '../utils/setup-axios';
import styled from '@emotion/styled';

export type Props = {
  userId: string;
};

let SubHeading = styled.h2`
  font-weight: inherit;
  font-size: 2rem;
  line-height: 2rem;
  margin: 0;
  align-self: flex-end;
  margin-bottom: 20px;
`;

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
      data.append('audio', file[0][0]);
      data.append('user_id', this.props.userId);

      let res = await axios.post('/upload', data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });

      if (!res.data.text || !res.data.emotion) {
        throw new Error('Invalid API Response');
      }

      console.log(res.data);

      alert('File uploaded!');
    } catch (e) {
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

    inputElement.addEventListener('change', function() {
      if (!this.files) return;
      // @ts-ignore...
      handleSelectFile([...this.files]);
    });
    inputElement.dispatchEvent(new MouseEvent('click'));
  }

  render() {
    let { userId }: Props = this.props;

    return (
      <Layout title="User">
        <SubHeading>Upload</SubHeading>
        <Dropzone
          onTrigger={this.handleDropzoneTrigger}
          onDrop={this.handleSelectFile}
          illustration={<img src="/static/engie-logo.svg" title="Upload icon" alt="Upload icon" />}
        />
        <div>user id: {userId}</div>
      </Layout>
    );
  }
}

// @ts-ignore
export default withRouter(Index);
