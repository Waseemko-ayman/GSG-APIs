import React, { Component } from 'react'
import Container from '../../Components/Container';
import StoreForm from '../../Components/StoreForm';
import axios from 'axios';
import { PATHS } from '../../Components/router/paths';
import { Navigate } from 'react-router-dom';
import "./style.css"

class CreateStorePage extends Component {
  state = {
    isLoading: false,
    isGoToListPage: false,
  }

  handleCreateStore = async (body) => {
    this.setState({ isLoading: true });
    try {
      const res = await axios.post(`https://some-data.onrender.com/stores`, body)
      console.log(res.data)
      this.setState({ isLoading: false, isGoToListPage: true })
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    return (
      <div className='create-page'>
        <Container>
          <div className='create-page'>
            <h1>Create Store</h1>
            <StoreForm 
              handleSubmit={this.handleCreateStore} 
              isLoading={this.state.isLoading}
            />
          </div>
        </Container>

        {this.state.isGoToListPage && (<Navigate to={PATHS.STORES.ROOT} replace />)}
      </div>
    )
  }
}

export default CreateStorePage;