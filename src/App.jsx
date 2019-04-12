import React, { useReducer } from "react"
import styled,  { css }  from "styled-components"

const Item = (function() {
  const Contain = styled.div`
    background-color: white;
    border-radius: 3px;
    border: 1px dashed grey;


  `;
  
  return ({state, setState}) => {
  
    const [item, setItem] = useReducer((preItem, nextItem) => ({...preItem, ...nextItem}))

  return <Contain styled={{...Item, width: state.width, height: state.height}}>
    hello
  </Contain>}
})()

  // grid-template-columns: ${({styled}) => styled['grid-template-columns']};
  // grid-template-rows: ${({styled}) => styled['grid-template-rows']};
  // grid-row-gap: ${({styled}) => styled['grid-row-gap']};
  // grid-column-gap: ${({styled}) => styled['grid-column-gap']};
  // grid-template-areas: ${({styled}) => styled['grid-template-areas']};
  // grid-auto-columns: ${({styled}) => styled['grid-auto-columns']};
  // grid-auto-rows: ${({styled}) => styled['grid-auto-rows']};
  // grid-auto-flow: ${({styled}) => styled['grid-auto-flow']};
  // justify-items: ${({styled}) => styled['justify-items']};
  // align-items: ${({styled}) => styled['align-items']};
  // justify-content: ${({styled}) => styled['justify-content']};
  // align-content: ${({styled}) => styled['align-content']};

const Contain = (function() {
  const Div = styled.div.attrs(({styled}) => ({
    'grid-template-columns':  styled['grid-template-columns'],
    'grid-template-rows':  styled['grid-template-rows'],
    'grid-row-gap':  styled['grid-row-gap'],
    'grid-column-gap':  styled['grid-column-gap'],
    'grid-template-areas':  styled['grid-template-areas'],
    'grid-auto-columns':  styled['grid-auto-columns'],
    'grid-auto-rows':  styled['grid-auto-rows'],
    'grid-auto-flow':  styled['grid-auto-flow'],
    'justify-items':  styled['justify-items'],
    'align-items':  styled['align-items'],
    'justify-content':  styled['justify-content'],
    'align-content':  styled['align-content'],
  }))`
  display: grid;
  background-color: #4cc198;
  border-radius: 6px;
  padding: 6px;
  `;
  
  return ({state}) => {
    return (<Div styled={state}>
     {[...Array(state.count)].map((ele, index) => (<Item key={index}></Item>))}
    </Div>)
  }
})()

const Right = (function() {
  const Right = styled.div`
    flex: 1.5;
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
      <Contain state={state} setState={setState}></Contain>
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
    border: 1px solid #4cc198;
    color: ${prop => (prop.selected ? "white" : "#4cc198")};
    background-color: ${prop => (!prop.selected ? "white" : "#4cc198")};
  `

  return ({state, setState}) => (
    <Left>
      <ItemInput>
        <LabelInput>grid-template-columns：</LabelInput>
        <Input type="text" value={state['grid-template-columns']} onChange={e => setState({"grid-template-columns": e.target.value})}/>
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-template-rows：</LabelInput>
        <Input type="text" value={state['grid-template-columns']} onChange={e => setState({"grid-template-columns": e.target.value})}/>
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-row-gap：</LabelInput>
        <Input type="text" value={state['grid-row-gap']} onChange={e => setState({"grid-row-gap": e.target.value})}/>
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-column-gap：</LabelInput>
        <Input type="text" value={state['grid-column-gap']} onChange={e => setState({"grid-column-gap": e.target.value})}/>
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-template-areas：</LabelInput>
        <Input type="text" value={state['grid-template-areas']} onChange={e => setState({"grid-template-areas": e.target.value})}/>
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-auto-columns：</LabelInput>
        <Input type="text" value={state['grid-auto-columns']} onChange={e => setState({"grid-auto-columns": e.target.value})}/>
      </ItemInput>
      <ItemInput>
        <LabelInput>grid-auto-rows：</LabelInput>
        <Input type="text" value={state['grid-auto-rows']} onChange={e => setState({"grid-auto-rows": e.target.value})}/>
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
      height: 200,
      "grid-template-columns": "1fr 1fr 1fr 1fr",
      "grid-template-rows": "1fr 1fr 1fr 1fr",
      "grid-row-gap":'20px',
      "grid-column-gap":'20px',
      "grid-template-areas": '',
      "grid-auto-columns":'', 
      "grid-auto-rows":''
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
