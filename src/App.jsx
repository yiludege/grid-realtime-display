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
    flex: 2;
  `

  const Flex = styled.div`
    display: flex;
    height: 50px;
    flex-wrap: wrap;
  `

  const Label = styled.label`
    display: inline-block;
    margin-right: 10px;
  `

  const Button = styled.button`
    display: inline-block;
    flex: none;
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

  const FlexItem = styled.div`
    display: flex;
    margin-right: 20px;
    align-items: center;
    flex: none;
  `

  return ({ state, setState }) => (
    <Right>
      <Flex>
        <FlexItem>
          <Label>项目数量：</Label>
          <Number>{state.count}</Number>
          <Button onClick={e => setState({ count: state.count + 1 })}>+</Button>
          <Button onClick={e => setState({ count: state.count ? state.count - 1 : 0 })}>-</Button>
        </FlexItem>
        <FlexItem>
          <Label>项目长度：</Label>
          <Input
            type="range"
            min={100}
            max={500}
            onChange={e => setState({ width: e.target.value })}
          />
          <Number>{state.width}</Number>
          <Span>px</Span>
        </FlexItem>
        <FlexItem>
          <Label>项目宽度：</Label>
          <Input
            type="range"
            min={100}
            max={500}
            onChange={e => setState({ height: e.target.value })}
          />
          <Number>{state.height}</Number>
          <Span>px</Span>
        </FlexItem>
      </Flex>
    </Right>
  )
})()

const Left = (function() {
  const Left = styled.div`
    margin-right: 20px;
    flex: 1;
  `
  const ItemInput = styled.div`
    display: flex;
    flex-wrap: wrap;
  `

  const Input = styled.input`
    flex: auto;
    width: 200px;
  `

  const LabelInput = styled.label`
    margin-right: 10px;
    flex: none;
  `
  const ItemSelect = styled.div`
    flex: auto;
    display: flex;
    flex-direction: column;
    margin: 0 5px;
  `

  const LabelSelect = styled.label`
    flex: none;
  `

  const Contain = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;
  
 const Button = styled.button`
    word-wrap:break-word;
    outline: none;
    border: 1px solid DeepSkyBlue;
    color: ${prop => (prop.selected ? "white" : "DeepSkyBlue")};
    background-color: ${prop => (!prop.selected ? "white" : "DeepSkyBlue")};
  `

  return ({state, setState}) => (
    <Left>
      <ItemInput>
        <LabelInput>grid-template-columns：</LabelInput>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-template-rows：</LabelInput>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-row-gap：</LabelInput>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-column-gap：</LabelInput>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-template-areas：</LabelInput>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-auto-columns：</LabelInput>
        <Input type="text" />
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-auto-rows：</LabelInput>
        <Input type="text" />
      </ItemInput>
      <Contain>
        <ItemSelect>
          <LabelSelect onClick={e => setState({'grid-auto-flow': e.target.textContent})}>grid-auto-flow：</LabelSelect>
          <Button>row</Button>
          <Button>column</Button>
          <Button>row dense</Button>
          <Button>column dense</Button>
        </ItemSelect>
        <ItemSelect>
          <LabelSelect onClick={e => setState({'justify-items': e.target.textContent})}>justify-items：</LabelSelect>
          <Button>start</Button>
          <Button>end</Button>
          <Button>center</Button>
          <Button>stretch</Button>
        </ItemSelect>
        <ItemSelect>
          <LabelSelect onClick={e => setState({'align-items': e.target.textContent})}>align-items：</LabelSelect>
          <Button>start</Button>
          <Button>end</Button>
          <Button>center</Button>
          <Button>stretch</Button>
        </ItemSelect>
        <ItemSelect>
          <LabelSelect onClick={e => setState({'justify-content': e.target.textContent})}>justify-content：</LabelSelect>
          <Button>start</Button>
          <Button>end</Button>
          <Button>center</Button>
          <Button>stretch</Button>
          <Button>space-around</Button>
          <Button>space-between</Button>
          <Button>space-evenly</Button>
        </ItemSelect>
        <ItemSelect onClick={e => setState({'align-content': e.target.textContent})}>
          <LabelSelect>align-content：</LabelSelect>
          <Button>start</Button>
          <Button>end</Button>
          <Button>center</Button>
          <Button>stretch</Button>
          <Button>space-around</Button>
          <Button>space-between</Button>
          <Button>space-evenly</Button>
        </ItemSelect>
      </Contain>
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
    justify-content: space-between;
    flex-wrap: wrap;
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
