import React from 'react'
import {
  render,
  fireEvent,
  wait,
} from '@testing-library/react'
import { LandingImp } from './Landing'

const sampleCsvData = [{
  created: '2019-06-19T19:15:52.619Z', _id: '5d0a8a621d6f68008e8dd471', fileName: 'south', saveName: 'fileUpload-1560971874233', __v: 0,
}, {
  created: '2019-06-19T19:15:52.619Z', _id: '5d0a8a9a1d6f68008e8dd472', fileName: 'north', saveName: 'fileUpload-1560971930724', __v: 0,
}]

describe('<Landing />', () => {
  let testLabel
  let testText
  let testId
  let testDebug
  let testQuery

  beforeEach(() => {
    const {
      queryAllByTestId,
    } = render(
      <LandingImp csvList={sampleCsvData} />,
    )

    // testLabel = getByLabelText
    // testText = getByText
    // testId = getByTestId
    // testDebug = debug
    testQuery = queryAllByTestId
  })

  test('render CSV data row correctly', () => {
    const rowList = testQuery('csv-list-row')
    expect(rowList.length).toBe(sampleCsvData.length)
  })

  test('Snapshot matched', () => {
    expect(testId('landing-container')).toMatchSnapshot()
  })
})
