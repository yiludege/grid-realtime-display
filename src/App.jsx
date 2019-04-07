import React, { useState, useReducer } from "react"
import styled from "styled-components"

const Contain = (function() {
  return () => {}
})()

const Item = (function() {
  return () => {}
})()

const Right = (function() {
  const Right = styled.div`
    flex: auto;
  `

  const Detail = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
  `

  const Label = styled.label`
    display: inline-block;
    margin-left: 20px;
    margin-right: 10px;
  `

  const Button = styled.button`
    display: inline-block;
    margin: 0 5px;
  `

  const Input = styled.input`
    width: 60px;
  `

  const Number = styled.span`
    display: inline-block;
    width: 30px;
  `

  const Span = styled.span`
    display: inline-block;
  `

  return (state, setState) => (
    <Right>
      <Detail>
        <Label>项目数量：</Label>
        <Number>{state.count}</Number>
        <Button onClick={e => setState({ count: state.count + 1 })}>+</Button>
        <Button onClick={e => setState({ count: state.count ? state.count - 1 : 0 })}>-</Button>
        <Label>项目长度：</Label>
        <Input
          type="range"
          min={100}
          max={500}
          onChange={e => setState({ width: e.target.value })}
        />
        <Number>{state.width}</Number>
        <Span>px</Span>
        <Label>项目宽度：</Label>
        <Input
          type="range"
          min={100}
          max={500}
          onChange={e => setState({ height: e.target.value })}
        />
        <Number>{state.height}</Number>
        <Span>px</Span>
      </Detail>
    </Right>
  )
})()

const Left = (function() {
  const Left = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 100px);
    grid-template-rows: repeat(10, 1fr);
  `
  const ItemInput = styled.div`
    grid-column: 1 / 6;
  `

  const Input = styled.input``

  const Label = styled.label`display: inline-block; width: 200px;`

  const ItemSelect = styled.div` `

  const Button = styled.button`
    height: 50px;
    border: 1px solid DeepSkyBlue;
    color: ${prop => prop.selected ? 'white': 'DeepSkyBlue'};
    background-color: ${prop => !prop.selected ? 'white': 'DeepSkyBlue'};
  `;
  

  return (state, setState) => (
    <Left>
      <ItemInput>
        <Label>grid-template-columns：</Label>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <Label>grid-template-rows：</Label>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <Label>grid-row-gap：</Label>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <Label>grid-column-gap：</Label>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <Label>grid-template-areas：</Label>
        <Input type="text" />
      </ItemInput>
    </Left>
  )
})()

const App = (function() {
  const Root = styled.div`
    height: 100%;
    color: #2c3e50;
    background: #ecf0f1;
  `

  const Header = styled.header`
    font-size: 30px;
    font-weight: 800;
    text-align: center;
  `

  const Flex = styled.div`
    display: flex;
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    margin: 0 20px;
    padding: 20px 20px;
  `

  return () => {
    const [state, setState] = useReducer((preState, newState) => ({ ...preState, ...newState }), {
      count: 4,
      width: 100,
      height: 200
    })

    return (
      <Root>
        <Header>Grid实时演示</Header>
        <Flex>
          <Left setState={setState} state={state} />
          <Right setState={setState} state={state} />
        </Flex>
      </Root>
    )
  }
})()

export default App
