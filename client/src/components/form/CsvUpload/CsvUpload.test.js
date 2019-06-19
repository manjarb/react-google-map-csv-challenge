import React from 'react'
import {
  render,
  fireEvent,
  wait,
} from '@testing-library/react'
import { CsvUploadImp } from './CsvUpload'

describe('<CsvUploadImp />', () => {
  let testLabel
  let testText
  let testId
  let testDebug

  beforeEach(() => {
    const {
      getByLabelText, getByText, getByTestId, debug,
    } = render(
      <CsvUploadImp />,
    )

    testLabel = getByLabelText
    testText = getByText
    testId = getByTestId
    testDebug = debug
  })

  test('renders a form with file, name, uploaded by and a submit button', () => {
    expect(testId('csv-upload-form-container')).toHaveFormValues({
      fileUpload: '',
      fileName: '',
    })
  })

  test('renders an error validation', async () => {
    const fileError = testId('csv-upload-file-error')
    const nameError = testId('csv-upload-name-error')
    expect(fileError).toBeEmpty()
    expect(nameError).toBeEmpty()
    const submitButton = testId('csv-upload-submit-button')
    fireEvent.click(submitButton)
    await wait(() => {
      expect(fileError).toHaveTextContent('Required')
      expect(nameError).toHaveTextContent('Required')
    })
  })

  test('Snapshot matched', () => {
    expect(testId('csv-upload-form-container')).toMatchSnapshot()
  })
})
