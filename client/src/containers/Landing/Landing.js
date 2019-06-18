import React from 'react'
import styled from 'styled-components'
import { CsvUpload } from '../../components'

const Container = styled.div`
  display: flex;
`

export class Landing extends React.Component {
  render() {
    return (
      <Container className="container">
        <h1>Landing</h1>
        <CsvUpload />
      </Container>
    )
  }
}
