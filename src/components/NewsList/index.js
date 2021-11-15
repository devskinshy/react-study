import axios from 'axios';
import { NewsListBlock } from './styled';
import NewsItem from '../NewsItem';
import UsePromise from '../../lib/usePromise';

const NewsList = ({category}) => {
  const [loading, response, error] = UsePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`);
  },  [category])

  if(loading) {
    return <NewsListBlock>Loading...</NewsListBlock>
  }

  if(!response) {
    return null;
  }

  if(error) {
    return <NewsListBlock>Error...</NewsListBlock>;
  }

  const {articles} = response.data;
  return (
    <NewsListBlock>
      {articles.map(article => <NewsItem key={article.url} article={article}/>)}
    </NewsListBlock>
  )
}

export default NewsList;
