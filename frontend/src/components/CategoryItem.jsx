import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'
import React from 'react'

const Container = styled.div`
flex: 1;
margin: 3px;
height: 70vh;
position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Встановлюємо об'єктне заповнення для картинок */
  ${mobile({ height: "40vh" })}
`;

const Info = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Title = styled.h1`
color: white;
margin-bottom: 20px;
`

const Button = styled.button`
border: none;
padding: 10px;
background-color: white;
color: gray;
cursor: pointer;
font-weight: 600;
`

const CategoryItem = ({ item }) => {
  const [loading, setLoading] = React.useState(true);
  const ref = React.createRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoading(false);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    }
  });
  
  return (
    <Container key={item.id} ref={ref}>
      <Link to={`/products/${item.cat}`}>
        {
          loading ?
            <span>'Загрузка...'</span> :
            <Image src={item.img} />
        }
        <Info>
          <Title>{item.title}</Title>
          <Button>Переглянути все</Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem