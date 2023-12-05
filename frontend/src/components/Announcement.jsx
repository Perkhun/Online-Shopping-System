import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
height: 30px;
background-color: teal;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
${mobile({ textAlign: "center" })};
`

const Announcement = () => {
  return (
    <Container>
      Супер пропозиція! Безкоштовна доставка для всіх замовлень.
    </Container>
  )
}

export default Announcement