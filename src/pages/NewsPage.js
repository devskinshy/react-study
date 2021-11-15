import { useParams } from 'react-router-dom';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewsPage = () => {
  let { category = 'all' } = useParams();

  return (
    <>
      <Categories/>
      <NewsList category={category}/>
    </>
  )
}

export default NewsPage;
