import React from 'react';
import SearchPresenter from './SearchPresenter';
import { movieAPI, tvAPI } from 'api';

export default class extends React.Component {
  state = {
    movieResults: null,
    showResults: null,
    searchTerm: '',
    loading: false,
    error: null,
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== '') {
      this.searchByTerm();
    }
  };
  searchByTerm = async () => {
    try {
      const { searchTerm } = this.state;
      const {
        data: { results: movieResults },
      } = await movieAPI.search(searchTerm);
      const {
        data: { results: showResults },
      } = await tvAPI.search(searchTerm);
      this.setState({ movieResults, showResults });
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    const {
      movieResults,
      showResults,
      searchTerm,
      loading,
      error,
    } = this.state;
    console.log(this.state);

    return (
      <SearchPresenter
        movieResults={movieResults}
        showResults={showResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
