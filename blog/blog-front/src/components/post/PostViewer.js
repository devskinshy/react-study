import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({post, error, loading}) => {
  if(error) {
    if(error.response && error.response.state === 404) {
      return <PostViewerBlock>This post does not exist.</PostViewerBlock>
    }
    return <PostViewerBlock>Error!!!</PostViewerBlock>
  }

  if(loading || !post) {
    return null;
  }

  const {title, body, user, publishedDate, tags} = post;
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo username={user.username} publishedDate={publishedDate} hasMarginTop/>
        <Tags tags={tags}/>
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{__html: body}}></PostContent>
    </PostViewerBlock>
  )
}

export default PostViewer;