import React, { Component } from 'react'
import Table from '../../Components/Table';
import { STORES_COLUMNS } from '../../Components/Constants/stores';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../Components/router/paths';
import "./style.css"

class StoresPage extends Component {
  state = {
    stores: [],
    isLoading: true
  }

  componentDidMount() {
    fetch('https://some-data.onrender.com/stores')
      .then(response => response.json())
      .then(data => this.setState({ stores: data, isLoading: false }))
  }

  handleDelete = (id) => {
    console.log(id, "is Delted")
  }

  handleEdit = (id) => {
    console.log(id, "is Deleted")
    this.setState({ editId: id })
  }

  handleView = (row) => {
    console.log(row.id, "is View")
    this.setState({ rowId: row.id })
  }

  render() {
    return (
      <div className='stores-page'>
        <h1>StoresPage</h1>

        <button onClick={() => this.setState({ isCreating: true })}>
          Create Post
        </button>

        <Table 
          columns={STORES_COLUMNS(this.handleDelete, this.handleEdit)}
          data={this.state.stores}
          onRowClick={this.handleView}
          isLoading={this.state.isLoading}
        />
        {this.state.rowId && <Navigate to={`${this.state.rowId}`} replace />}
        {this.state.editId && <Navigate to={PATHS.STORES.EDIT.replace(":id", this.state?.editId)} replace />}
        {this.state.isCreating && <Navigate to={PATHS.STORES.CREATE} replace />}
      </div>
    )
  }
}

export default StoresPage;