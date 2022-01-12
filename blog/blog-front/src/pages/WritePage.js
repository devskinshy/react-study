import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonContainer';
import {Helmet} from "react-helmet-async";

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>Write - REACTERS</title>
      </Helmet>
      <EditorContainer onCHangeEdit/>
      <TagBoxContainer onChnageTag/>
      <WriteActionButtonsContainer onCommit/>
    </Responsive>
  );
};

export default WritePage;
