import { Add, DeleteForeverOutlined, Remove } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from "../responsive"
import StripeCheckout from "react-stripe-checkout"
import { useState, useEffect } from "react"
import { userRequest } from "../requestMethods"
import { useNavigate } from "react-router"
import { deleteCart, deleteProductSuccess, updateaddCart, updatereduceCart } from "../redux/cartRedux"
import { Link } from "react-router-dom"
import { deleteCarts } from "../redux/apiCalls"

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div`
`

const Wrapper = styled.div`
padding: 20px;
${mobile({ padding: "10px" })}
`

const Title = styled.h1`
font-weight: 300;
text-align: center;
`

const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`

const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${(props) => props.type === "filled" && "none"};
background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
color: ${(props) => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
${mobile({ display: "none" })}
`

const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0px 10px;
`

const Bottom = styled.div`
display: flex;
justify-content: space-between;
${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
flex: 3;
`

const Product = styled.div`
display: flex;
justify-content: space-between;
${mobile({ flexDirection: "column" })}
`

const ProductDetail = styled.div`
flex: 2;
display: flex;
`

const Image = styled.img`
width: 200px;
`

const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`

const ProductName = styled.span`
`

const ProductID = styled.span`
`

const ProductPublication = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props) => props.color};
display: flex;
align-items: center;

> b {
  margin-right: 5px;
}
`

const ProductYearOfPublication = styled.span`
`

const PriceDetail = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`

const ProductAmount = styled.div`
font-size: 24px;
margin: 5px;
${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
background-color: #eee;
border: none;
height: 1px;
`

const Summary = styled.div`
flex: 1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 50vh;
`

const SummaryTitle = styled.h1`
font-weight: 200;
`

const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${(props) => props.type === "total" && "500"};
font-size: ${(props) => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span`
`

const SummaryItemPrice = styled.span`
`

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
`

const ButtonDelete = styled.button`
width: 50%;
margin: 1rem 0;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
cursor: pointer;
`

const DeleteContainer = styled.div`
    margin-bottom: 20px;
    color: #8d1313;
    cursor: pointer;
`

const Cart = () => {
    const userId = useSelector(state => state.user.currentUser ? state.user.currentUser._id : null)
    const cart = useSelector((state) => state.cart)
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                /* const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                }) */
                const dummydata = {
                    billing_details: {
                        address: 'Ukraine'
                    },
                }
                navigate("/success", {
                    state: {
                        /* stripeData: res.data, */
                        stripeData: dummydata,
                        products: cart,
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, cart.total, navigate])

    const quantity = useSelector(state => state.cart.quantity)

    const handleAdd = (props) => {
        const product = { ...props, quantity: quantity + 1 };
        dispatch(
            updateaddCart(product, dispatch)
        );
    };
    const handleRemove = (props) => {
        const product = { ...props, quantity: quantity - 1 };
        dispatch(
            updatereduceCart(product, dispatch)
        )
    };
    const handleDelete = (props) => {
        const product = { ...props };
        dispatch(
            deleteCart(product, dispatch)
        );
    };
    const handleDeleteDB = (props) => {
        const product = { ...props };
        deleteCarts(userId, product, dispatch)
    };

    /*     const handleDelete = (id) => {
            dispatch(() => deleteProductSuccess(id));
        }; */

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Ваш кошик</Title>
                <Top>
                    <Link to="/">
                        <TopButton>Продовжити покупки</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Кошик ({quantity})</TopText>
                        <TopText>Список бажань (0)</TopText>
                    </TopTexts>
                    {/* <TopButton type="filled">Разом</TopButton> */}
                </Top>
                <Bottom>
                    <Info>
                        {cart.products?.map((product) => (
                            /* {cart.products.map((product) => ( */
                            <Product key={product._id}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Товар:</b> {product.title}
                                        </ProductName>
                                        <ProductID>
                                            <b>ID:</b> {product._id}
                                        </ProductID>
                                        {/*<ProductPublication publication={product.publication}/>  !!!!!  */}  
                                        <ProductPublication>
                                            <b>Видання:</b> {product.publication}
                                        </ProductPublication>
                                        <ProductYearOfPublication>
                                            <b>Рік публікації:</b> {product.year_of_publication}
                                        </ProductYearOfPublication>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <DeleteContainer><DeleteForeverOutlined onClick={() => handleDelete(product)} /></DeleteContainer>
                                    <ProductAmountContainer>
                                        <Add style={{ cursor: 'pointer' }} onClick={() => handleAdd(product)} />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove style={{ cursor: 'pointer' }} onClick={product.quantity === 1 ? () => handleDelete(product) : () => handleRemove(product)} />
                                    </ProductAmountContainer>
                                    <ProductPrice>{product.price * product.quantity} грн.</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>Сума замовлення</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Підсумок</SummaryItemText>
                            <SummaryItemPrice>{cart.total} грн.</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Орієнтована доставка</SummaryItemText>
                            <SummaryItemPrice>60 грн.</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Знижка на доставку</SummaryItemText>
                            <SummaryItemPrice>-60 грн.</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Загальна сума</SummaryItemText>
                            <SummaryItemPrice>{cart.total} грн.</SummaryItemPrice>
                        </SummaryItem>
                        {userId ?
                            <StripeCheckout
                                name="Shop"
                                image="https://image.similarpng.com/very-thumbnail/2021/09/Online-shopping-logo-design-template-on-transparent-background-PNG.png"
                                billingAddress
                                shippingAddress
                                description={`Ваша загальна сума: ${cart.total} грн.`}
                                amount={cart.total * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button>Оформити замовлення</Button>
                            </StripeCheckout>
                            :
                            <Link to="/login">
                                <Button>Увійти</Button>
                            </Link>
                        }
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container >
    )
}

export default Cart