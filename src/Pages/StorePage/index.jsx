import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../Components/router/paths';
import WithParams from '../../Components/WithParams';
import Container from '../../Components/Container';
import "./style.css"

class StorePage extends Component {
  state = {
    store: {},
    isLoading: true,
    isEditing: false,
  }

  id = this.props?.params?.id;

  handleEdit = () => {
    this.setState({ isEditing: true })
  }

  componentDidMount() {
    fetch(`https://some-data.onrender.com/stores/${this.id}`)
      .then(response => response.json())
      .then(data => this.setState({ store: data, isLoading: false }))
  }

  render() {
    return (
      <div className='store-page'>
        <Container>
          <div>
            {this.state.isLoading ? (
              <h1 style={{ textAlign: 'center', margin: 20 }}>Loading...</h1>
            ) : (
              <>
                <h2>Store {this.state.store.id}</h2>
                <p>{this.state.store?.name}</p>
                <p>{this.state.store.cities}</p>
              </>
            )}
            <button onClick={this.handleEdit}>Edit</button>
            {this.state.isEditing && <Navigate to={PATHS.STORES.EDIT.replace(":id", this.id)} replace />}
          </div>
        </Container>
      </div>
    )
  }
}

export default WithParams(StorePage);