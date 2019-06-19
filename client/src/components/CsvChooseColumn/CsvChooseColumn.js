import React from 'react'
import styled from 'styled-components'

const SelectBox = styled.div`
  margin-bottom: 15px;
`

const keys = {
  address: 'address',
  city: 'city',
  state: 'state',
  zipCode: 'zipCode',
  category: 'category',
}

const SelectOption = ({
  name,
  inputValue,
  label,
  onChange,
  columns,
}) => (
  <SelectBox>
    <label className="label">{label}</label>
    <div className="select">
      <select
        name={name}
        value={inputValue}
        onChange={e => onChange(e, name)}
      >
        <option
          value=""
          disabled="disabled"
        >
          Select Value
        </option>
        {columns.map((col, index) => (
          <option
            key={`csv-option-${index}`}
            value={col.key}
          >
            {col.value}
          </option>
        ))}
      </select>
    </div>
  </SelectBox>
)

const defaultState = {
  submitValue: {},
  columns: [],
  cityColumns: [],
  stateColumns: [],
  zipCodeColumns: [],
  categoryColumns: [],
  [keys.address]: '',
  [keys.city]: '',
  [keys.state]: '',
  [keys.zipCode]: '',
  [keys.category]: '',
}

export class CsvChooseColumn extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  componentDidMount() {
    this.setState({
      columns: this.modifyColumn(this.props.csvDetail),
    })
  }

  modifyColumn = (csvObj) => {
    const modifyCsv = []
    Object.keys(csvObj).forEach((key) => {
      modifyCsv.push({
        key,
        value: csvObj[key],
      })
    })

    return modifyCsv
  }

  onChange = (e, selectType) => {
    const { value } = e.target
    const stateSubmitValue = this.state.submitValue
    const submitValue = {
      ...stateSubmitValue,
      [selectType]: {
        originKey: value,
        selectKey: selectType,
      },
    }

    this.setState({
      submitValue,
      [selectType]: value,
    })

    const { columns } = this.state
    console.log(columns, 'rurur')
    console.log(submitValue, ' susus')
    const filterColumns = columns.filter((col) => {
      let isFound = false
      Object.keys(submitValue).forEach((sKey) => {
        if (submitValue[sKey].originKey === col.key) {
          isFound = true
        }
      })
      return !isFound
    })

    if (selectType === keys.address) {
      this.setState({
        cityColumns: filterColumns,
      })
    } else
    if (selectType === keys.city) {
      this.setState({
        stateColumns: filterColumns,
      })
    } else
    if (selectType === keys.state) {
      this.setState({
        zipCodeColumns: filterColumns,
      })
    } else
    if (selectType === keys.zipCode) {
      this.setState({
        categoryColumns: filterColumns,
      })
    }
  }

  render() {
    const { csvDetail } = this.props
    const {
      columns,
      cityColumns,
      stateColumns,
      zipCodeColumns,
      categoryColumns,
      address,
      city,
      state,
      zipCode,
      category,
    } = this.state

    return (
      <div>
        <SelectBox>
          <SelectOption
            name={keys.address}
            inputValue={address}
            label="Address"
            onChange={this.onChange}
            columns={columns}
          />
        </SelectBox>
        {(address) && (
          <SelectBox>
            <SelectOption
              name={keys.city}
              inputValue={city}
              label="City"
              onChange={this.onChange}
              columns={cityColumns}
            />
          </SelectBox>
        )}
        {(city) && (
          <SelectBox>
            <SelectOption
              name={keys.state}
              inputValue={state}
              label="State"
              onChange={this.onChange}
              columns={stateColumns}
            />
          </SelectBox>
        )}
        {(state) && (
          <SelectBox>
            <SelectOption
              name={keys.zipCode}
              inputValue={zipCode}
              label="Zip Code"
              onChange={this.onChange}
              columns={zipCodeColumns}
            />
          </SelectBox>
        )}
        {(zipCode) && (
          <SelectBox>
            <SelectOption
              name={keys.category}
              inputValue={category}
              label="Category"
              onChange={this.onChange}
              columns={categoryColumns}
            />
          </SelectBox>
        )}
      </div>
    )
  }
}
