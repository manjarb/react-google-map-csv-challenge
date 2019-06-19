import React from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import axios from 'axios/index'
import { Auth } from '../../helper/auth/auth'


const Container = styled.div`
  padding-top: 30px;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
`

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
    }
  }

  formSubmit = (values, actions) => {
    axios({
      method: 'post',
      url: `http://neat-mvp-api.herokuapp.com/v1/auth?email=${values.email}&password=${values.password}`,
    }).then((res) => {
      Auth.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true,
        }))
      })

      actions.resetForm({
        email: '',
        password: '',
      })
      actions.setSubmitting(false)
    }).catch((e) => {
      alert('Login error')
      actions.setSubmitting(false)
    })
  }

  formValidate = (values) => {
    const requiredText = 'Required'

    const errors = {}
    if (!values.email) {
      errors.email = requiredText
    }

    if (!values.password) {
      errors.password = requiredText
    }

    return errors
  }

  returnDangerClass = status => (status ? 'is-danger' : '')

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true) {
      this.props.history.push(from.pathname)
    }
    return (
      <Container>
        <Formik
          initialValues={{
            email: '',
            password: '',
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
            <form
              onSubmit={handleSubmit}
            >
              <div className="card">
                <div className="card-content">
                  <h2 className="title">
                    Login
                  </h2>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className={`input ${this.returnDangerClass(errors.email && touched.email)}`}
                        autoFocus="autofocus"
                        placeholder="Email"
                        type="email"
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                      />

                      <p
                        className="help is-danger"
                        data-testid="csv-upload-name-error"
                      >
                        {(errors.email && touched.email) && errors.email}
                      </p>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className={`input ${this.returnDangerClass(errors.password && touched.password)}`}
                        autoFocus="autofocus"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                      />

                      <p
                        className="help is-danger"
                      >
                        {(errors.password && touched.password) && errors.password}
                      </p>
                    </div>
                  </div>

                  <div className="card-footer">
                    <p className="card-footer-item">
                      <button
                        type="submit"
                        className="button is-primary login-button"
                        disabled={isSubmitting}
                      >
                      Login
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>

      </Container>
    )
  }
}
