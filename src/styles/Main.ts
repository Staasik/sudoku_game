import styled from "styled-components";

export const HtmlWrapper = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    align-self:center;
`
export const Text = styled.div`
    width:auto;
    font-size: 40px;
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
    font-family: cursive;
    cursor: pointer;
`
export const Field = styled.div`    
    width:500px;
    height:500px;
    display:grid;
    border: 3px solid black;
    grid-template-columns: 1fr;
    grid-auto-rows:repeat(9, 1fr);
    & > div:not(:last-child):nth-child(3n) {
    border-bottom: 3px solid black;
    }
`
export const Square = styled.div`
    display:grid;
    align-items:center; 
    justify-content:center;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: 1fr;    
`
export const Item = styled.div`
    height: 53px;    
    display:flex;
    border: 1px solid gray;
    cursor: pointer;
    font-size: 40px;
    align-items:center; 
    justify-content:center;
    &:not(:last-child):nth-child(3n) {
        border-right: 3px solid black;
    }
`
export const NumbersDiv = styled.div` 
    width:auto;
    height: 50px;
    align-items:center; 
    justify-content:center;
    display:grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 40px;
    margin-top:25px;
`
export const Numbers = styled.div` 
    display:flex;
    width: 50px;
    height: 50px;
    border: 1px solid gray;
    cursor: pointer;
    font-size: 40px;
    align-items:center; 
    justify-content:center;
`