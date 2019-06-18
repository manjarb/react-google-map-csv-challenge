import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getCsvDetail } from '../../redux/actions'
import { MapDisplay, CsvChooseColumn } from '../../components'

const Container = styled.div`
  display: flex;
`

const LeftBox = styled.div`
  padding: 15px;
`

export class DetailImp extends React.Component {
  componentDidMount() {
    const { match: { params } } = this.props
    this.props.getCsvDetail(params.id)
  }

  render() {
    return (
      <Container>
        <LeftBox>
          <CsvChooseColumn />
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
