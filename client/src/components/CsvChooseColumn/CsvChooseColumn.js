import React from 'react'
import { Formik } from 'formik'
import styled from 'styled-components'

const SelectBox = styled.div`
  
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

export class CsvChooseColumn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const submitValue = {
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
    const filterColumns = columns.filter(col => col.key !== value)
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
      </div>
    )
  }
}
