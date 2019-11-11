import React, { Component } from 'react'
import PropTypes from 'prop-types'

class List extends Component {
  constructor(props) {
		super(props)
		this.state = {
      filtered: [],
      items: []
		}
		this.handleChange = this.handleChange.bind(this)
  }

  async callApi() {
    const response = await fetch(`api/getList`)
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  async componentDidMount() {
    await this.callApi()
    .then(res => {
      this.setState({ 
        items: res.playlists.items,
        filtered: res.playlists.items
      })
    })
    .catch(err => console.log(err))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    })
  }
	
	handleChange(e) {
    let currentList = []
    let newList = []

    if (e.target.value !== '') {
      currentList = this.state.items

      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase()
        const filter = e.target.value.toLowerCase()
        return lc.includes(filter)
      })
    } else {
      newList = this.state.items
    }

    this.setState({
      filtered: newList
    })
  }

  render() {
		return (
      <div className="container">
        <section className="section">
          <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
          <ul>
            {this.state.filtered &&
              this.state.filtered.map(item => (
                <li key={item.id}>
                  {item.name}
                </li>
              ))
            }
          </ul>
        </section>
      </div>
		)
	}
}

export default List

List.propTypes = {
  items: PropTypes.array
}
