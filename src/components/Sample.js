import React from 'react';

const Sample = ({loadingPost, loadingUsers, post, users}) => {
  return (
    <div>
      <section>
        <h1>post</h1>
        {loadingPost && 'loading post...'}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr/>
      <section>
        <h1>users</h1>
        {loadingUsers && 'loading users...'}
        {!loadingUsers && users && (
          <ul>
            {users.map(({ id, username, email }) => (
              <li key={id}>
                {username} ({email})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Sample;
