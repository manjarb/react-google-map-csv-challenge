import React from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { uploadCsv } from '../../../redux/actions/index'

const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`

export class CsvUploadImp extends React.Component {
  formSubmit = (values, actions) => {
    const formData = new FormData()
    formData.append('fileUpload', values.fileUpload)
    formData.append('fileName', values.fileName)

    this.props.uploadCsv(formData)
    actions.resetForm({
      fileUpload: null,
      fileName: '',
    })
    actions.setSubmitting(false)
    this.fileUploadInput.value = null
  }

  formValidate = (values) => {
    const requiredText = 'Required'

    const errors = {}
    if (!values.fileUpload) {
      errors.fileUpload = requiredText
    }

    if (!values.fileName) {
      errors.fileName = requiredText
    }

    return errors
  }

  returnDangerClass = status => (status ? 'is-danger' : '')

  render() {
    return (
      <Formik
        initialValues={{
          fileUpload: null,
          fileName: '',
        }}
        validate={this.formValidate}
        onSubmit={this.formSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Container>
            <form
              onSubmit={handleSubmit}
              data-testid="csv-upload-form-container"
            >
              <div className="columns">
                <div className="column is-6">
                  <div className="field">
                    <label
                      className="label"
                      htmlFor="portal-upload-form-file"
                    >
                      CSV file
                    </label>
                    <div className="control">
                      <input
                        id="portal-upload-form-file"
                        type="file"
                        name="fileUpload"
                        ref={(ref) => { this.fileUploadInput = ref }}
                        onChange={(event) => {
                          setFieldValue('fileUpload', event.currentTarget.files[0])
                        }}
                      />
                      <p
                        className="help is-danger"
                        data-testid="portal-upload-file-error"
                      >
                        {(errors.fileUpload && touched.fileUpload) && errors.fileUpload}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-6">
                  <div className="field">
                    <label
                      className="label"
                      htmlFor="portal-upload-form-name"
                    >
                      File name (No extension needed)
                    </label>
                    <div className="control">
                      <input
                        className={`input ${this.returnDangerClass(errors.fileName && touched.fileName)}`}
                        id="csv-upload-form-name"
                        type="text"
                        name="fileName"
                        onChange={handleChange}
                        value={values.fileName}
                        placeholder="File name"
                      />

                      <p
                        className="help is-danger"
                        data-testid="portal-upload-name-error"
                      >
                        {(errors.fileName && touched.fileName) && errors.fileName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="submit-box">
                <button
                  className="button is-primary"
                  type="submit"
                  data-testid="csv-upload-submit-button"
                  disabled={isSubmitting}
                >
                  Upload CSV
                </button>
              </div>
            </form>
          </Container>
        )}
      </Formik>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  uploadCsv: payload => dispatch(uploadCsv(payload)),
})

export const CsvUpload = connect(null, mapDispatchToProps)(CsvUploadImp)
