'use client';
import React from 'react';
import PostEditor from '../PostEditor';

type Props = {};

const PostEditorContainer = (props: Props) => {
  return (
    <PostEditor
      onSubmit={({ category, title, content }) => {
        console.log({
          category,
          title,
          content
        });
      }}
    />
  );
};

export default PostEditorContainer;
