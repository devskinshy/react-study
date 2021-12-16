import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../modules/users';
import { Preloader, usePreloader } from '../lib/PreloadContext';
import User from '../components/User';
import { useParams } from 'react-router-dom';

const UserContainer = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const {id} = useParams();

  usePreloader(() => dispatch(getUser(id)));
  useEffect(() => {
    if(user && user.id === parseInt(id, 10)) return;
    dispatch(getUser(id));
  }, [dispatch, id, user]);

  // if(!user) {
  //   return <Preloader resolve={() => dispatch(getUser(id))} />;
  // }

  if(!user) return null;
  return <User user={user}/>;
};

export default UserContainer;
