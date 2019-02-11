import React, { Component } from 'react';
import {
  Button, Container, Form, Input,
} from '@bootstrap-styled/v4/dist/@bootstrap-styled/v4';
import ReposList from './ReposList';
import { search } from '../../services/git-api';

class ReposSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResults: [],
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    const { value } = this.state;
    event.preventDefault();
    search(value).then((result) => {
      this.setState({ searchResults: result.items, error: null });
    }, (error) => {
      this.setState({ error });
    });
  }

  render() {
    const { value } = this.state;
    const { searchResults } = this.state;
    const { error } = this.state;

    let element;

    if (error) {
      const { message } = error;
      element = <h3>{message}</h3>;
    } else if (searchResults.length > 0) {
      element = <ReposList repos={searchResults} />;
    } else {
      element = <h3>No existen repos</h3>;
    }

    return (
      <Container>
        <div className="d-inline-block">
          <Form inline className="my-2 my-lg-0" onSubmit={this.handleSubmit}>
            <Input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search Repos"
              value={value}
              onChange={this.handleChange}
            />
            <Button color="success">Search Repos</Button>
          </Form>
        </div>
        <div id="list">
          {element}
        </div>
      </Container>
    );
  }
}

export default ReposSearch;