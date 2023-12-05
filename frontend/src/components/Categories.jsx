import styled from 'styled-components'
import { categories } from '../data'
import { mobile } from '../responsive'
import CategoryItem from './CategoryItem'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(25% - 10px), 1fr));
  grid-gap: 20px;
  padding: 20px;
  ${mobile({ padding: "0px", gridTemplateColumns: "1fr", gridGap: "10px" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  )
}

export default Categories