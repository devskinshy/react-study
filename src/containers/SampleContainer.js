import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useActions from '../lib/useActions';
import { GET_POST, GET_USERS, getPost, getUsers } from '../modules/sample';
import Sample from '../components/Sample';

const SampleContainer = () => {
  const { post, users } = useSelector(state => state.sample);
  const loading = useSelector(state => state.loading);
  const loadingPost = loading[GET_POST];
  const loadingUsers = loading[GET_USERS];

  const [onGetPost, onGetUsers] = useActions([getPost, getUsers]);

  useEffect(() => {
    onGetPost(1);
    onGetUsers(1);
  }, [onGetPost, onGetUsers])

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default React.memo(SampleContainer);
