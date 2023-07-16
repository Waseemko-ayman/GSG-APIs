import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../Components/router/paths';
import WithParams from '../../Components/WithParams';
import Container from '../../Components/Container';
import "./style.css"
import axios from 'axios';

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

  // By axios
  async componentDidMount() { // Reqular Function علشان هيك حطيت الأسنك بالاول
    try {
      const { data } = await axios.get(`https://some-data.onrender.com/stores/${this.id}`)
      this.setState({ store: data })
    } catch (error) {
      console.log(error.message)
      this.setState({ error: error.message })
    } finally {
      this.setState({ isLoading: false })
    }
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