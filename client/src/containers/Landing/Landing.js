import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { CsvUpload } from '../../components'
import { getCsvList } from '../../redux/actions'

const Container = styled.div`
  padding-top: 30px;
`

const ContentBox = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 30px;
  width: 680px;
  margin-left: auto;
  margin-right: auto;
`

export class LandingImp extends React.Component {
  componentDidMount() {
    this.props.getCsvList()
  }

  render() {
    const { csvList } = this.props
    console.log(csvList, ' :csvList')

    return (
      <Container className="container">
        <ContentBox>
          <CsvUpload />
        </ContentBox>
        <ContentBox>
          <h3 className="title is-4 has-text-centered">
            File List
          </h3>

          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>
                  File Name
                </th>
                <th>
                  Created
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {csvList.map(csv => (
                <tr key={csv._id}>
                  <td>{csv.fileName}</td>
                  <td>{csv.created}</td>
                  <td><Link to={`/csv/${csv._id}`}>Choose</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <CsvSidebar fileName="eoeo" /> */}
        </ContentBox>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getCsvList: payload => dispatch(getCsvList(payload)),
})

const mapStateToProps = state => ({
  csvList: state.csvList,
})

export const Landing = connect(mapStateToProps, mapDispatchToProps)(LandingImp)
