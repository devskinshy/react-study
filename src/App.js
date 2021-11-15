import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return (
    <Routes >
      <Route path={"/"} element={<NewsPage/>}>
        <Route path={":category"} element={<NewsPage/>}/>
      </Route>
    </Routes>
  )
}

export default App;
