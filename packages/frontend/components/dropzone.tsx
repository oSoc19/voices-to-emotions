import * as React from 'react';
import styled from '@emotion/styled';

type Props = {
  heading?: React.ReactNode;
  content?: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
  onDrop: (files: FileList) => any;
  onTrigger: () => any;
};

type DropzoneProps = {
  isDragging: boolean;
};

let DropzoneContainer = styled.div<DropzoneProps>(({ isDragging }) => {
  return {
    display: 'grid',
    gridTemplateAreas: '"illustration" "heading" "content"',
    border: '2px dashed',
    borderRadius: '10px',
    color: isDragging ? '#f5f55e' : '#FFFFFF',
    fontFamily: 'roboto',
    outline: 'none',
    borderColor: isDragging ? '#f5f55e' : '#FFFFFF'
  };
});

// @ts-ignore what the heck is goin on
let DropzoneHeading = styled.h2(() => {
  return {
    gridArea: 'heading',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'roboto',
    fontWeight: 'auto',
    padding: 0,
    margin: '0 0 5px 0'
  };
});

let DropzoneContent = styled.p(() => {
  return {
    gridArea: 'content',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: '0 0 20px 0'
  };
});

let IllustrationContainer = styled.div(() => {
  return {
    gridArea: 'illustration',
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  };
});

export default function Dropzone(props: Props) {
  let {
    heading = 'Drag and Drop files here',
    content = 'click to browse files',
    illustration,
    className,
    onDrop,
    onTrigger
  } = props;

  let [isDragging, setIsDragging] = React.useState(false);

  const handleDragEnter = (e: any) => {
    e.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    handleDragLeave();

    // @ts-ignore
    onDrop([...e.dataTransfer.files]);
  };

  return (
    <DropzoneContainer
      role="button"
      aria-label="Drop files in here, or click to select files"
      tabIndex={0}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={onTrigger}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          onTrigger();
        }
      }}
      isDragging={isDragging}
    >
      <IllustrationContainer>{illustration}</IllustrationContainer>
      <DropzoneHeading>{heading}</DropzoneHeading>
      <DropzoneContent>{content}</DropzoneContent>
    </DropzoneContainer>
  );
}
