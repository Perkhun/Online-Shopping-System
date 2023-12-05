import React from 'react'
import styled from 'styled-components'
import { ExitToApp, Search, ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from '@material-ui/core'
import { mobile } from "../responsive"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logOut } from "../redux/apiCalls"

const Container = styled.div`
height: 60 px;
${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content: space-between;
align-items: center;
${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`

const Language = styled.div`
font-size: 14px;
cursor: pointer;
${mobile({ display: "none" })}
`

const SearchContainter = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
${mobile({ marginLeft: "5px" })}
`

const Input = styled.input`
border: none;
${mobile({ width: "50px" })}
`

const Center = styled.div`
flex: 1;
text-align:center;
`

const Logo = styled.h1`
font-weight: bold;
${mobile({ fontSize: "24px", marginLeft: "5px" })}
`

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()
  /*   const { isFetching, error } = useSelector((state) => state.user) */

  const handleLogOut = (e) => {
    e.preventDefault();
    logOut(dispatch);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>UA</Language>
          <SearchContainter>
            <Input placeholder='Пошук' />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainter>
        </Left>
        <Center><Logo>Магазин книг</Logo></Center>
        <Right>
          {!user && (
            <Link to="/register">
              <MenuItem>Реєстрація</MenuItem>
            </Link>
          )}
          {!user && (
            <Link to="/login">
              <MenuItem>Увійти</MenuItem>
            </Link>
          )}
          {user && (
            <MenuItem onClick={handleLogOut}>
              <ExitToApp />
            </MenuItem>
          )}
          {user && (
          <Link to="/order">
            <MenuItem>Замовлення</MenuItem>
          </Link>
          )}
          <Link to="/carts">
            <MenuItem>
              <Badge overlap="rectangular" badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem> 
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar