import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isShow: false,
    isClick: false,
    websiteName: '',
    userName: '',
    password: '',
    userList: [],
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  changeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isClick: true})
    } else {
      this.setState({isClick: false})
    }
  }

  deleteButton = id => {
    const {userList} = this.state
    const newList = userList.filter(eachItem => eachItem.id !== id)
    const isLength = newList.length !== 0
    this.setState({userList: newList, isShow: isLength})
  }

  submitForm = event => {
    event.preventDefault()
    const {userName, websiteName, password} = this.state
    const initial = websiteName.slice(0, 1).toUpperCase()
    const classColor = colorList[Math.floor(Math.random() * 5)]
    const newItem = {
      id: uuidv4(),
      initialValue: initial,
      websiteName,
      userName,
      password,
      classColor,
    }
    this.setState(prevState => ({
      userList: [...prevState.userList, newItem],
      websiteName: '',
      userName: '',
      password: '',
      isShow: true,
      searchInput: '',
    }))
  }

  render() {
    const {isClick, websiteName, userName, password, searchInput, userList} =
      this.state

    let {isShow} = this.state
    const newList = userList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isShow = false
    } else {
      isShow = true
    }
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="sm-password-image"
            alt="password manager"
          />
          <form className="input-container" onSubmit={this.submitForm}>
            <h1 className="password-heading">Add New Password</h1>
            <div className="input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-element"
                value={websiteName}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-element"
                value={userName}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="input-element-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-element"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="lg-password-image"
          />
        </div>
        <div className="display-container">
          <div className="top-container">
            <div className="pass-container">
              <h1 className="pass-heading">Your Passwords</h1>
              <p className="count">{userList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                value={searchInput}
                onChange={this.changeSearch}
              />
            </div>
          </div>
          <hr />
          <div className="show-container">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isShow && (
            <div className="empty-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty-image"
              />
              <p className="empty-password">No Passwords</p>
            </div>
          )}
          {isShow && (
            <ul className="show-user-details-container">
              {newList.map(eachItem => (
                <li className="show-list-container" key={eachItem.id}>
                  <p className={`user-initial ${eachItem.classColor}`}>
                    {eachItem.initialValue}
                  </p>
                  <div className="user-details-container">
                    <p className="web-name">{eachItem.websiteName}</p>
                    <p className="web-name">{eachItem.userName}</p>
                    {!isClick && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="star-image"
                        alt="stars"
                      />
                    )}
                    {isClick && <p className="web-name">{eachItem.password}</p>}
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    data-testid="delete"
                    onClick={() => this.deleteButton(eachItem.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="delete-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
