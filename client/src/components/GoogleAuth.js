import React from "react"

export default class GoogleAuth extends React.Component {
  state = { isSignedIn: null }
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "156458958564-1obrk7kjhljq0kfh1kfsm692na2i9lep.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          this.onAuthChange()
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }
  onSignIn = () => {
    this.auth.signIn()
  }

  onSignOut = () => {
    this.auth.signOut()
  }

  renderAuthButton = () => {
    if (this.state.isSignedIn === null) return null
    else if (this.state.isSignedIn)
      return (
        <button className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      )
    else
      return (
        <button className="ui red google button" onClick={this.onSignIn}>
          <i className="google icon" />
          Sign In with Google
        </button>
      )
  }
  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}
