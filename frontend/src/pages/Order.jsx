import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from '../responsive';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';
import {
  updateaddCart,
  updatereduceCart,
  deleteCart
} from '../redux/cartRedux';
import {
  deleteCarts,
  getCarts
} from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import dateFormat, { masks } from 'dateformat';

const Container = styled.div``;
const PageTitle = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;
const Orders = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
  flex-direction: column;
`;
const OrderCard = styled.div`
  flex: 1;
  min-width: 450px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OrderId = styled.span`
  font-size: 16px;
`;
const Status = styled.button`
  font-size: 35px;
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => {
    if (props.status === 'pending') return '#2060EC';
    else if (props.status === 'completed') return '#28D34A';
    else return '#fff0f1';
  }};
  color: ${(props) => {
    if (props.status === 'pending') return '#FFFFFF';
    else if (props.status === 'completed') return '#FFFFFF';
    else return '#d95087';
  }};
`;
const Products = styled.div`
  display: flex;
  padding: 3px 0;
`;

const ImgContainer = styled.div`
  display: flex;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: cover;
  ${mobile({ height: '40vh' })}
`;
const ProductInfo = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: '10px' })}
`;
const TitleLine = styled.span`
  padding: 0 10px;
  margin: 30px;
`;
const Line = styled.div`
  display: flex;
  align-items: center;
`;
const ProductTitle = styled.h1`
  font-weight: 200;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 200;
  display: flex;
`;

const ProductPublication = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
`;
const Bottom = styled.span`
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 20px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  ${mobile({ width: '100%' })}
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterTitle = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

const FilterValue = styled.span`
  font-size: 16px;
`;

const Address = styled.span``;
const Total = styled.span`
  font-size: 30px;
  margin-top: 30px;
`;

const Order = () => {
  const userId = useSelector(
    (state) => state.user.currentUser ? state.user.currentUser._id : null
  );
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`./orders/find/${userId}`);
        setOrders(res.data);

        setOrders((prev) =>
          [...prev].sort((a, b) => b.time - a.time)
        );
      } catch {}
    };
    getOrders();
  }, []);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <PageTitle>Замовлення</PageTitle>
        <Orders>
          {orders?.map((order) => (
            <OrderCard key={order._id}>
              <Top>
                <OrderId>
                  <b>OrderId : </b>
                  {order._id}
                </OrderId>
                <Status status={order.status}>{order.status}</Status>
              </Top>
              {order.products?.map((product) => (
                <Products key={product._id}>
                  <ImgContainer>
                    <ProductImg src={product.img} />
                  </ImgContainer>
                  <ProductInfo>
                    <ProductTitle>{product.title}</ProductTitle>
                    <FilterContainer>
                      <FilterItem>
                        <FilterTitle>Рік видання:</FilterTitle>
                        <FilterValue>{product.year_of_publication}</FilterValue>
                      </FilterItem>
                      <FilterItem>
                        <FilterTitle>Видавництво:</FilterTitle>
                        <FilterValue>{product.publication}</FilterValue>
                      </FilterItem>
                      <FilterItem>
                        <FilterTitle>Кількість:</FilterTitle>
                        <FilterValue>{product.quantity}</FilterValue>
                      </FilterItem>
                    </FilterContainer>
                    <Price>Ціна: {product.price} грн.</Price>
                  </ProductInfo>
                </Products>
              ))}
              <Bottom>
                <Address>
                  <b>Адреса доставки: </b>
                  {order.address}
                </Address>
                <Total>
                  <b>Загальна сума: </b> {order.amount} грн.
                </Total>
                <Address>
                  <b>Створено: </b>
                  {order.createdAt}
                </Address>
              </Bottom>
            </OrderCard>
          ))}
        </Orders>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Order;
