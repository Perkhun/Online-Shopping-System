import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { register } from "../redux/apiCalls"
import { mobile } from "../responsive"

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
  rgba(255, 255, 255, 0.5),
  rgba(255, 255, 255, 0.5)
  ),
  url("https://chytomo.com/wp-content/uploads/2020/10/krasyvi-knyharni-kytai.jpg")
  center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: white;
${mobile({ width: "75%" })}
`

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`

const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [inputs, setInputs] = useState({})
  const [confirm, setConfirm] = useState({})
  const [state, setState] = useState(true)
  /*   const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("") */
  const dispatch = useDispatch()
  /*   const { isFetching, error } = useSelector((state) => state.user) */

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  /* const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { username, email, password });
  } */

  const handleClick = (e) => {
    e.preventDefault()
    const user = { ...inputs };
    if (user.password === confirm.confirm) {
      register(dispatch, user)
    } else setState(false)
  }

  return (
    <Container>
      <Wrapper>
        <Title>Створити обліковий запис</Title>
        <Form>
          {/*           <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} /> */}
          <Input name="firstname" placeholder="firstname" onChange={handleChange} />
          <Input name="lastname" placeholder="lastname" onChange={handleChange} />
          <Input name="username" placeholder="username" onChange={handleChange} />
          <Input name="email" placeholder="email" onChange={handleChange} />
          <Input name="password" type = "password" placeholder="password" onChange={handleChange} />
          <Input name="confirm" type = "password" placeholder="confirm password" onChange={(e) => setConfirm({ [e.target.name]: e.target.value })} />
          <Agreement>
            Створюючи обліковий запис, я даю згоду на обробку моїх особистих даних відповідно до <b>ПОЛІТИКИ КОНФІДЕНЦІЙНОСТІ</b>
          </Agreement>
          {/* <Button onClick={handleClick} disabled={isFetching}>СТВОРИТИ</Button> */}
          <Button onClick={handleClick}>СТВОРИТИ</Button>
          {/* {error && <Error>Щось пішло не так...</Error>} */}
          {state === false && <Error>Щось пішло не так...</Error>}{/*  */}
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register