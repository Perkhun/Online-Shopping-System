import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const Container = styled.div`
`

const Title = styled.h2`
margin: 20px;
color: grey;
`

const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`

const Filter = styled.div`
margin: 20px;
${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`

const FilterText = styled.span`
font-size: 20px;
font-weight: 600;
margin-right: 20px;
${mobile({ marginRight: "0px" })}
`

const Select = styled.select`
padding: 10px;
margin-right: 20px;
${mobile({ margin: "10px 0px" })}
`

const Option = styled.option``;


const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split("/")[2]
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("newest");


    const decodedText = decodeURIComponent(cat);
    console.log(decodedText); 

    const handleFilters = (e) => {
        const value = e.target.value
        setFilters({
            ...filters,
            [e.target.name]: value,
        })
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{decodedText}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Фільтр:</FilterText>
                    <Select name="publication" onChange={handleFilters}>
                        <Option disabled>
                            AllPublication
                        </Option>
                        <Option>Vivat</Option>
                        <Option>Random House</Option>
                        <Option>Yakaboo Publishing</Option>
                        <Option>Видавництво Старого Лева</Option>
                        <Option>Наш Формат</Option>
                        <Option>Книжковий Клуб "Клуб Нашого дозвілля"</Option>
                        <Option>Віхола</Option>
                        <Option>А-ба-ба-га-ла-ма-га</Option>
                        <Option>Лабораторія</Option>
                        <Option>КМ-БУКС</Option>
                        <Option>Hodder</Option>
                        <Option>HQ Publishing</Option>
                        <Option>Смакі</Option>
                        <Option>Octopus Publishing Group</Option>
                        <Option>Моя книжкова полиця</Option>
                        <Option>Ранок</Option>
                        <Option>Талант</Option>
                        <Option>Вільний вітер</Option>
                        <Option>Кристал Бук</Option>
                        <Option>Арій</Option>
                        <Option>#книголав</Option>
                    </Select>
                    <Select name="year_of_publication" onChange={handleFilters}>
                        <Option disabled>
                            AllYearOfPublication
                        </Option>
                        <Option>2023</Option>
                        <Option>2022</Option>
                        <Option>2021</Option>
                        <Option>2020</Option>
                        <Option>2019</Option>
                        <Option>2018</Option>
                        <Option>2017</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Сортування:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">За замовчуванням</Option>
                        <Option value="asc">Ціна (вверх)</Option>
                        <Option value="desc">Ціна (вниз)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList