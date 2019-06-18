import React from 'react'
import styled from 'styled-components'
import { CsvUpload } from '../../components'

const Container = styled.div`
  display: flex;
  padding-top: 30px;
`

export class Landing extends React.Component {
  render() {
    return (
      <Container className="container">
        <CsvUpload />
      </Container>
    )
  }
}
