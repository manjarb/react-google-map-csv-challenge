import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getCsvDetail } from '../../redux/actions'
import { MapDisplay, CsvChooseColumn } from '../../components'

const Container = styled.div`
  display: flex;
`

const LeftBox = styled.div`
  padding: 30px;
`

export class DetailImp extends React.Component {
  constructor() {
    super()
    this.state = {
      mapDetailsValue: [],
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.props.getCsvDetail(params.id)
  }

  renderMap = (submitValue) => {
    console.log(submitValue, ' submitValue')
    const {
      address,
      category,
      city,
      state,
      zipCode,
    } = submitValue
    const { csvDetail } = this.props
    const mapFilteredData = []
    csvDetail.forEach((csv) => {
      mapFilteredData.push({
        address: csv[address.originKey],
        category: csv[category.originKey],
        city: csv[city.originKey],
        state: csv[state.originKey],
        zipCode: csv[zipCode.originKey],
      })
    })

    console.log(mapFilteredData, ' mmmm')
  }

  render() {
    const { csvDetail } = this.props

    return (
      <Container>
        <LeftBox>
          {(csvDetail && csvDetail.length > 0) && <CsvChooseColumn csvDetail={csvDetail[0]} submit={this.renderMap} />}
        </LeftBox>
        <div>
          <MapDisplay />
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  csvDetail: state.csvDetail,
})

const mapDispatchToProps = dispatch => ({
  getCsvDetail: id => dispatch(getCsvDetail(id)),
})

export const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailImp)
