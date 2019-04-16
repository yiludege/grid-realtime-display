import React, { createContext, useReducer, useContext, useState } from "react"
import styled, { css } from "styled-components"

const StateContext = createContext({ state: {}, setState: () => {} })

const Item = (function() {
  const Contain = styled.div`
    font-size: 10px;
    background-color: white;
    border-radius: 6px;
    padding: 3px;
    border: 1px solid grey;
    ${({ styled }) => css`
      grid-column-start: ${styled.gridColumnStart};
      grid-column-end: ${styled.gridColumnEnd};
      grid-row-start: ${styled.gridRowStart};
      grid-row-end: ${styled.gridRowEnd};
      width: ${styled.width.length > 1 ? styled.width : ''}px;
      height: ${styled.height}px;
    `}
  `

  const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
  `

  const Number = styled.div`
    margin: 5px auto;
    font-size: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    color: white;
    background-color: #4cc198;
  `
  const SelectContain = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 3px;
  `

  const Label = styled.label`
    flex: auto;
  `

  const Select = styled.select`
    flex: auto;
  `

  const Option = styled.option``

  return ({ index }) => {
    const [item, setItem] = useReducer((preItem, nextItem) =>({ ...preItem, ...nextItem }), {
      gridColumnStart: "",
      gridColumnEnd: "",
      gridRowStart: "",
      gridRowEnd: "",
      width: "",
      height: "",
      justifySelf: "stretch",
      alignSelf: "stretch"
    })

    const inputList = {
      gridColumnStart: "grid-column-start",
      gridColumnEnd: "grid-column-end",
      gridRowStart: "grid-row-start",
      gridRowEnd: "grid-row-end",
      width: "width(px)",
      height: "height(px)"
    }

    const isSize = (type) => (['width', 'height'].includes(type))

    const InputItem = ({ label, type }) => (
      <Input
        type="number"
        key="input"
        placeholder={label}
        value={item[type]}
        onChange={e => setItem({ [type]: e.target.value })}
      />
    )

    const SelectItem = ({ label, type }) => (
      <SelectContain>
        <Label>{label}</Label>
        <Select value={item[type]} onChange={e => setItem({ [type]: e.target.value })}>
          <Option value="stretch">stretch</Option>
          <Option value="start">start</Option>
          <Option value="end">end</Option>
          <Option value="center">center</Option>
        </Select>
      </SelectContain>
    )

    return (
      <Contain styled={item}>
        <Number>{index}</Number>
        {Object.entries(inputList).map(([type, label]) => (
          <InputItem label={label} type={type} key={type} />
        ))}
        <SelectItem label="justify-self" type="justifySelf" />
        <SelectItem label="align-self" type="alignSelf" />
      </Contain>
    )
  }
})()

const Contain = (function() {
  const Div = styled.div`
    display: grid;
    background-color: #4cc198;
    border-radius: 6px;
    padding: 6px;
    ${({ styled }) => css`
      grid-template-columns: ${styled.gridTemplateColumns
        .map(ele => ele.number + ele.type)
        .join(" ")};
      grid-template-rows: ${styled.gridTemplateRows.map(ele => ele.number + ele.type).join(" ")};
      grid-row-gap: ${styled.gridRowGap.map(ele => ele.number + ele.type).join(" ")};
      grid-column-gap: ${styled.gridColumnGap.map(ele => ele.number + ele.type).join(" ")};
      grid-auto-columns: ${styled.gridAutoColumns.map(ele => ele.number + ele.type).join(" ")};
      grid-auto-rows: ${styled.gridAutoRows.map(ele => ele.number + ele.type).join()};
      grid-template-areas: ${styled.gridTemplateAreas};
      grid-auto-flow: ${styled.gridAutoFlow};
      justify-items: ${styled.justifyItems};
      align-items: ${styled.alignItems};
      justify-content: ${styled.justifyContent};
      align-content: ${styled.alignContent};
    `}
  `

  return () => {
    const { state } = useContext(StateContext)
    return (
      <Div styled={state}>
        {[...Array(state.count)].map((ele, index) => (
          <Item key={index} index={index} />
        ))}
      </Div>
    )
  }
})()

const Right = (function() {
  const Right = styled.div`
    flex: 1;
  `

  const Flex = styled.div`
    display: flex;
    margin: 20px 0;
    flex-wrap: wrap;
  `

  const Label = styled.label`
    display: inline-block;
    margin-right: 10px;
  `

  const Button = styled.button`
    /* display: inline-block; */
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

  return () => {
    const { state, setState, setInitState } = useContext(StateContext)

    return (
      <Right>
        <Flex>
          <FlexItem>
            <Label>项目数量：</Label>
            <Number>{state.count}</Number>
            <Button onClick={e => setState({ count: state.count + 1 })}>+</Button>
            <Button onClick={e => setState({ count: state.count ? state.count - 1 : 0 })}>-</Button>
          </FlexItem>
          <Button onClick={setInitState}>容器重置</Button>
          <Button onClick={setInitState}>项目重置</Button>
        </Flex>
        <Contain state={state} setState={setState} />
      </Right>
    )
  }
})()

const Left = (function() {
  const Left = styled.div`
    margin-right: 20px;
    flex: 1;
  `
  const ItemInput = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: none;
    margin: 0 5px;
  `

  const Input = styled.input`
    flex: none;
    width: 60px;
  `
  const ButtonInput = styled.button`
    display: inline-block;
    flex: none;
    margin: 0 5px;
  `

  const LabelInput = styled.label`
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

  const Select = styled.select``
  const Option = styled.option``

  const Contain = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  `

  const Button = styled.button`
    word-wrap: break-word;
    outline: none;
    border: 1px solid #4cc198;
    color: ${prop => (prop.selected ? "white" : "#4cc198")};
    background-color: ${prop => (!prop.selected ? "white" : "#4cc198")};
  `
  const DivContain = styled.div`
    display: flex;
    align-items: center;
    margin-left: 8px;
  `

  const DivItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3px;
    border: 1px solid #4cc198;
    border-radius: 6px;
    width: 160px;
    flex: none;
  `

  const ButtonNumber = styled.button`
    margin: 0 3px;
  `

  return () => {
    const { state, setState } = useContext(StateContext)

    const inputList = {
      gridTemplateColumns: "rid-template-columns",
      gridTemplateRows: "grid-template-rows",
      gridRowGap: "grid-row-gap",
      gridColumnGap: "grid-column-gap",
      gridAutoColumns: "grid-auto-columns",
      gridAutoRows: "grid-auto-rows"
    }

    const InputItem = ({ label, type }) => (
      <ItemInput>
        <LabelInput>{label}：</LabelInput>
        <DivItem>
          {state[type].map((ele, index, arr) => (
            <DivContain key={index}>
              <Input
                type="range"
                value={ele.number}
                min={ele.type === "fr" ? ele.minFr : ele.minPx}
                max={ele.type === "fr" ? ele.maxFr : ele.maxPx}
                onChange={e =>
                  setState({
                    [type]: arr.map((ele, indexMap) =>
                      index === indexMap ? { ...ele, number: e.target.value } : ele
                    )
                  })
                }
              />
              <ButtonNumber>{ele.number}</ButtonNumber>
              <Select
                value={ele.type}
                onChange={e =>
                  setState({
                    [type]: arr.map((ele, indexMap) =>
                      index === indexMap ? { ...ele, type: e.target.value } : ele
                    ),
                    number: ele.type === "fr" ? ele.defaultFr : ele.defaultPx
                  })
                }
              >
                <Option value="fr">fr</Option>
                <Option value="px">px</Option>
              </Select>
            </DivContain>
          ))}
          {
            <Contain>
              <ButtonInput>+</ButtonInput>
              <ButtonInput>-</ButtonInput>
            </Contain>
          }
        </DivItem>
      </ItemInput>
    )

    const defaultOptions = ["start", "end", "center", "stretch"]
    const moreOptions = ["space-around", "space-between", "space-evenly"]
    const flowOptions = ["row", "column", "row dense", "column dense"]
    const selectList = [
      { label: "justify-items", type: "justifyItems", options: defaultOptions },
      { label: "align-items", type: "alignItems", options: defaultOptions },
      {
        label: "justify-content",
        type: "justifyContent",
        options: [...defaultOptions, ...moreOptions]
      },
      {
        label: "align-content",
        type: "alignContent",
        options: [...defaultOptions, ...moreOptions]
      },
      { label: "grid-auto-flow", type: "gridAutoFlow", options: flowOptions }
    ]

    const SelectItem = ({ label, type, options }) => (
      <ItemSelect onClick={e => setState({ [type]: e.target.textContent })}>
        <LabelSelect>{label}：</LabelSelect>
        {options.map((ele, index) => (
          <Button key={ele}>{ele}</Button>
        ))}
      </ItemSelect>
    )

    return (
      <Left>
        <Contain>
          {Object.entries(inputList).map(([type, label]) => (
            <InputItem label={label} type={type} key={type} />
          ))}
        </Contain>
        <Contain>
          {selectList.map(({ label, type, options }) => (
            <SelectItem label={label} type={type} options={options} key={type} />
          ))}
        </Contain>
      </Left>
    )
  }
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

  const [count, minWidth, maxWidth, minHeight, maxHeight] = [16, 110, 300, 200, 500]
  const initState = {
    count,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    gridTemplateColumns: [
      {
        number: 1,
        type: "fr",
        defaultFr: 1,
        defaultPx: 110,
        minFr: 1,
        maxFr: 10,
        minPx: minWidth,
        maxPx: maxWidth
      },
      {
        number: 1,
        type: "fr",
        defaultFr: 1,
        defaultPx: 110,
        minFr: 1,
        maxFr: 10,
        minPx: minWidth,
        maxPx: maxWidth
      },
      {
        number: 1,
        type: "fr",
        defaultFr: 1,
        defaultPx: 110,
        minFr: 1,
        maxFr: 10,
        minPx: minWidth,
        maxPx: maxWidth
      },
      {
        number: 1,
        type: "fr",
        defaultFr: 1,
        defaultPx: 110,
        minFr: 1,
        maxFr: 10,
        minPx: minWidth,
        maxPx: maxWidth
      }
    ],
    gridTemplateRows: [
      {
        number: 1,
        type: "fr",
        defaultFr: 1,
        defaultPx: 200,
        minFr: 1,
        maxFr: 10,
        minPx: minHeight,
        maxPx: maxHeight
      },
      {
        number: 1,
        type: "fr",
        defaultFr: 1,
        defaultPx: 200,
        minFr: 1,
        maxFr: 10,
        minPx: minHeight,
        maxPx: maxHeight
      },
      {
        number: 1,
        type: "fr",
        defaultFr: 1,
        defaultPx: 200,
        minFr: 1,
        maxFr: 10,
        minPx: minHeight,
        maxPx: maxHeight
      },
      {
        number: 1,
        type: "fr",
        defaultFr: 1,
        defaultPx: 200,
        minFr: 1,
        maxFr: 10,
        minPx: minHeight,
        maxPx: maxHeight
      }
    ],
    gridRowGap: [{ number: 10, type: "px", minPx: 10, maxPx: 50 }],
    gridColumnGap: [{ number: 10, type: "px", minPx: 10, maxPx: 50 }],
    gridAutoColumns: [{ number: 20, type: "px", minPx: minWidth, maxPx: maxWidth }],
    gridAutoRows: [{ number: 20, type: "px", minPx: minHeight, maxPx: maxHeight }],
    gridTemplateAreas: "",
    justifyItems: "",
    alignItems: "",
    justifyContent: "",
    alignContent: "",
    gridAutoFlow: ""
  }

  return () => {
    const [state, setState] = useReducer((preState, newState) => ({ ...preState, ...newState }), initState)
    const setInitState = () => setState(initState)
    return (
      <Root>
        <Header>Grid实时演示</Header>
        <StateContext.Provider value={{ state, setState, setInitState }}>
          <Flex>
            <Left />
            <Right />
          </Flex>
        </StateContext.Provider>
      </Root>
    )
  }
})()

export default App
