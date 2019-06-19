import React from 'react'
import { Auth } from '../../auth/auth'

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
    }
  }

 login = () => {
   Auth.authenticate(() => {
     this.setState(() => ({
       redirectToReferrer: true,
     }))
   })
 }

 render() {
   const { from } = this.props.location.state || { from: { pathname: '/' } }
   const { redirectToReferrer } = this.state
   if (redirectToReferrer === true) {
     this.props.history.push(from.pathname)
   }
   return (
     <div>
       <p>Please, you need to be authenticated to to view this content</p>
       <button onClick={this.login} type="button">Log in</button>
     </div>
   )
 }
}
