import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Slider from "react-slick"; // Import the Slider component
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect} from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/cartRedux";
import { addCarts } from "../redux/apiCalls";
import { useState } from "react";

const Container = styled.div`
`

const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({ padding: "10px", flexDirection: "column" })}
`
const SliderContainer = styled.div`
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImgContainer = styled.div`
flex: 1;
`

const Image = styled.img`
max-width: 100%;
max-height: 100%;
object-fit: cover;
${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
flex: 1;
padding: 0px 50px;
${mobile({ padding: "10px" })}
`

const Title = styled.h1`
font-weight: 400;
`
const Auth = styled.p `
color: gray;

font-size: 20px;
margin-top: 20px;
margin-bottom: 40px;
`

const Desc = styled.p`
margin: 20px 0px;
font-style: italic; 
`

const Price = styled.span`
font-weight: 100;
font-size: 40px;
`
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px; /* додано відступ для розділення від інших елементів */
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* додано відступ для розділення */
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 10px;
`;

const FilterText = styled.p`
  margin: 0;
  margin-left: 50px;
`;

const FilterTextLang = styled.p `
  margin-left: 25px;
`
/*
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; 
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 10px; 
`;*/

const FilterPublication = styled.select`
  padding: 5px;
  margin-left: 10px;
  font-size: 16px; 
`;

const FilterYearOfPublication = styled.select`
  padding: 5px;
  font-size: 16px; 
  margin-left: 25px;
`;

const FilterYearOfPublicationOption = styled.option`

`

const AddContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
margin-top: 40px;
justify-content: space-between;
${mobile({ width: "100%" })}
`

const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: 700;
`

const Amount = styled.span`
width: 30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;
`

const Button = styled.button`
padding: 15px;
border: 2px solid teal;
background-color: white;
cursor: pointer;
font-weight: 500;
&:hover{
    background-color: #f8f4f4;
}
`

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [publication, setPublication] = useState({});
  const [year_of_publication, setYearOfPublication] = useState({});
  const dispatch = useDispatch();
  const userId = useSelector(
    (state) => (state.user.currentUser ? state.user.currentUser._id : null)
  );

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setPublication(res.data.publication[0]);
        setYearOfPublication(res.data.year_of_publication[0]);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addCart({
        ...product,
        quantity,
        publication,
        year_of_publication,
      })
    );
  };

  const handleClickDB = () => {
    const products = {
      productId: product._id,
      title: product.title,
      desc: product.desc,
      img: product.img,
      passage: product.passage,
      price: product.price,
      quantity: quantity,
      author: product.author,
      language: product.language,
      year_of_publication: year_of_publication,
      publication: publication,
    };
    addCarts({ userId, products }, dispatch);
  };
  ///////////////////////////
  const [currentImage, setCurrentImage] = useState(product.img);

const handleImageDoubleClick = () => {
  setCurrentImage((prevImage) =>
    prevImage === product.img ? product.passage : product.img
  );
};

return (
  <Container>
    <Navbar />
    <Announcement />
    <Wrapper>
      <ImgContainer>
        <Image
          src={product.img}
          onDoubleClick={handleImageDoubleClick}
          tabIndex="0"
        />
      </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Auth>{product.author}</Auth>
          <Desc>
            {product.desc}
          </Desc>
          
         
          <FilterContainer>
  <Filter>
    <FilterTitle>Категорія</FilterTitle>
    <FilterText>{product.categories}</FilterText>
  </Filter>
  <Filter>
    <FilterTitle>Мова книги</FilterTitle>
    <FilterTextLang>{product.language}</FilterTextLang>
  </Filter>
</FilterContainer>

          <Price>{product.price} грн</Price>
          <FilterContainer>
            {/*<Filter>
              <FilterTitle>Видавництво</FilterTitle>
              {product.publication?.map((c) => (
                <FilterPublication publication={c} selected={publication} key={c} onClick={() => setPublication(c)} />
              ))}
              </Filter>*/}
              
              <Filter>
              <FilterTitle>Видавництво</FilterTitle>
              <FilterPublication onChange={(e) => setPublication(e.target.value)}>
                {product.publication?.map((s) => (
                  <FilterYearOfPublicationOption key={s}>{s}</FilterYearOfPublicationOption>
                ))}
              </FilterPublication>
            </Filter>
            <Filter>
              <FilterTitle>Рік видання</FilterTitle>
              <FilterYearOfPublication onChange={(e) => setYearOfPublication(e.target.value)}>
                {product.year_of_publication?.map((s) => (
                  <FilterYearOfPublicationOption key={s}>{s}</FilterYearOfPublicationOption>
                ))}
              </FilterYearOfPublication>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>Додати в кошик</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product