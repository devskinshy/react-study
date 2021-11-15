import { CategoriesBlock, Category } from './styled';
import cx from 'classnames';
import categories from './data.json';

const Categories = ({onSelect, category}) => {
  return (
    <CategoriesBlock>
      {categories.map(
        ({name, text}) =>
          <Category
            className={({ isActive }) => cx({ 'active': isActive })}
            key={name}
            to={name === 'all' ? '/' : `/${name}`}>
            {text}
          </Category>
      )}
    </CategoriesBlock>
  )
}

export default Categories;
