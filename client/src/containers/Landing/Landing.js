import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

export class Landing extends React.Component {
  render() {
    return (
      <Container>
        <h1>Landing</h1>
      </Container>
    )
  }
}
