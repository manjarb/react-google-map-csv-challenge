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
  componentDidMount() {
    const { match: { params } } = this.props
    this.props.getCsvDetail(params.id)
  }

  render() {
    const { csvDetail } = this.props

    return (
      <Container>
        <LeftBox>
          {(csvDetail && csvDetail.length > 0) && <CsvChooseColumn csvDetail={csvDetail[1]} />}
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
