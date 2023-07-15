import React, { Component } from 'react'
import Container from '../../Components/Container';
import WithParams from '../../Components/WithParams';
import StoreForm from '../../Components/StoreForm';
import axios from 'axios';
import { PATHS } from '../../Components/router/paths';
import { Navigate } from 'react-router-dom';
import "./style.css"

class EditStorePage extends Component {
  state = {
    store: null,
    isLoading: false,
    isGoToListPage: false,
  }
  
  id = this.props?.params?.id

  componentDidMount() {
    fetch(`https://some-data.onrender.com/stores/${this.id}`)
      .then(response => response.json())
      .then(data => this.setState({ store: data, isLoading: false }))
  }

  handleEditStore = async (body) => {
    this.setState({ isLoading: true });
    try {
      const res = await axios.put(`https://some-data.onrender.com/stores/${this.id}`, body)
      this.setState({
        store: res.data,
        isLoading: false,
        isGoToListPage: true,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    return (
      <div>
        <Container>
          <div className="edit-page">
            <h1>Edit Store {this.id}</h1>
            <StoreForm 
              store={this.state.store} 
              handleSubmit={this.handleEditStore} 
              isLoading={this.state.isLoading} 
            />
          </div>
        </Container>

        {this.state.isGoToListPage && (<Navigate to={PATHS.STORES.ROOT} replace />)}
      </div>
    )
  }
}

export default WithParams(EditStorePage);