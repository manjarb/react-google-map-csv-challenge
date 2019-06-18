import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

export class DetailImp extends React.Component {
  render() {
    return (
      <div>
        DEtails
      </div>
    )
  }
}

const mapStateToProps = state => ({
  csvDetail: state.csvDetail,
})

export const Detail = connect(mapStateToProps)(DetailImp)
