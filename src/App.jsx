import React, { createContext, useReducer, useContext, useEffect } from "react"
import styled, { css } from "styled-components"

const StateContext = createContext({ state: {}, setState: () => {} })
const ItemContext = createContext({ item: {}, setItem: () => {} })
const [count, minWidth, maxWidth, minHeight, maxHeight] = [9, 110, 300, 200, 500]

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
      justify-self: ${styled.justifySelf}
      align-self: ${styled.alignSelf}
      width: ${styled.width.length > 1 ? styled.width : ""}px;
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

  const InputItem = ({ label, type }) => {
    const { item, setItem } = useContext(ItemContext)
    return (
      <Input
        type="number"
        key="input"
        placeholder={label}
        value={item[type]}
        onChange={e => setItem({ [type]: e.target.value })}
      />
    )
  }

  const SelectItem = ({ label, type }) => {
    const { item, setItem } = useContext(ItemContext)
    return (
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
  }

  const inputList = {
    gridColumnStart: "grid-column-start",
    gridColumnEnd: "grid-column-end",
    gridRowStart: "grid-row-start",
    gridRowEnd: "grid-row-end",
    width: "width(px)",
    height: "height(px)"
  }

  const initItem = {
    gridColumnStart: "",
    gridColumnEnd: "",
    gridRowStart: "",
    gridRowEnd: "",
    width: "",
    height: "",
    justifySelf: "stretch",
    alignSelf: "stretch"
  }

  return ({ index }) => {
    const [item, setItem] = useReducer((preItem, nextItem) => ({ ...preItem, ...nextItem }), initItem)

    const { state } = useContext(StateContext)

    useEffect(() => {
      setItem(initItem)
    }, [state.resetFlag])

    return (
      <ItemContext.Provider value={{ item, setItem }}>
        <Contain styled={item}>
          <Number>{index}</Number>
          {Object.entries(inputList).map(([type, label]) => (
            <InputItem label={label} type={type} key={type} />
          ))}
          <SelectItem label="justify-self" type="justifySelf" />
          <SelectItem label="align-self" type="alignSelf" />
        </Contain>
      </ItemContext.Provider>
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
          <Button onClick={() => setState({ ...state, resetFlag: !state.resetFlag })}>
            项目重置
          </Button>
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
    font-size: 18px;
    font-weight: 600;
    line-height: 60px;
  `
  const ItemSelect = styled.div`
    flex: auto;
    display: flex;
    flex-direction: column;
    margin: 0 5px;
  `

  const Label = styled.label`
    flex: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 60px;
  `

  const Select = styled.select``
  const Option = styled.option``

  const Contain = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #4cc198;
  `

  const Button = styled.button`
    font-size: 15px;
    word-wrap: break-word;
    outline: none;
    border: 1px solid #4cc198;
    color: ${prop => (prop.selected ? "white" : "#4cc198")};
    background-color: ${prop => (!prop.selected ? "white" : "#4cc198")};
    border-radius: 3px;
    line-height:25px;
    cursor: pointer;
    margin: 5px 0;
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
  const inputList = {
    gridTemplateColumns: "rid-template-columns",
    gridTemplateRows: "grid-template-rows",
    gridRowGap: "grid-row-gap",
    gridColumnGap: "grid-column-gap",
    gridAutoColumns: "grid-auto-columns",
    gridAutoRows: "grid-auto-rows"
  }

  const initState = {
    gridTemplateColumns: {
      number: 1,
      type: "fr",
      defaultFr: 1,
      defaultPx: 110,
      minFr: 1,
      maxFr: 10,
      minPx: minWidth,
      maxPx: maxWidth
    },
    gridTemplateRows: {
      number: 1,
      type: "fr",
      defaultFr: 1,
      defaultPx: 200,
      minFr: 1,
      maxFr: 10,
      minPx: minHeight,
      maxPx: maxHeight
    }
  }

  const gapList = ["gridRowGap", "gridColumnGap"]

  const InputItem = ({ label, type }) => {
    const { state, setState } = useContext(StateContext)
    return (
      <ItemInput>
        <Label>{label}：</Label>
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
                      index === indexMap
                        ? {
                            ...ele,
                            type: e.target.value,
                            number: e.target.value === "fr" ? ele.defaultFr : ele.defaultPx
                          }
                        : ele
                    )
                  })
                }
              >
                {!gapList.includes(type) && <Option value="fr">fr</Option>}
                <Option value="px">px</Option>
              </Select>
            </DivContain>
          ))}
          {initState[type] && (
            <DivContain>
              <ButtonInput onClick={() => setState({ [type]: [...state[type], initState[type]] })}>
                +
              </ButtonInput>
              <ButtonInput
                onClick={() => state[type].length && setState({ [type]: state[type].slice(0, -1) })}
              >
                -
              </ButtonInput>
            </DivContain>
          )}
        </DivItem>
      </ItemInput>
    )
  }

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

  const SelectItem = ({ label, type, options }) => {
    const { state, setState } = useContext(StateContext)
    return (
      <ItemSelect onMouseDown={e => e.target.tagName === 'BUTTON' && setState({ [type]: e.target.textContent })}>
        <Label>{label}：</Label>
        {options.map((ele, index) => (
          <Button key={ele} selected={ele === state[type]}>{ele}</Button>
        ))}
      </ItemSelect>
    )
  }

  return () => {
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
      }
    ],
    gridRowGap: [{ number: 10, type: "px", minPx: 10, maxPx: 50 }],
    gridColumnGap: [{ number: 10, type: "px", minPx: 10, maxPx: 50 }],
    gridAutoColumns: [
      { number: 20, type: "px", minPx: minWidth, maxPx: maxWidth, defaultFr: 1, defaultPx: 110 }
    ],
    gridAutoRows: [
      { number: 20, type: "px", minPx: minHeight, maxPx: maxHeight, defaultFr: 1, defaultPx: 110 }
    ],
    gridTemplateAreas: "",
    justifyItems: "stretch",
    alignItems: "stretch",
    justifyContent: "stretch",
    alignContent: "stretch",
    gridAutoFlow: "row",
    resetFlag: false
  }

  return () => {
    const [state, setState] = useReducer(
      (preState, newState) => ({ ...preState, ...newState }),
      initState
    )
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
