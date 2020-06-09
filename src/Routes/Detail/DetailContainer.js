import React from 'react';
import DetailPresenter from './DetailPresenter';
import { movieAPI, tvAPI } from '../../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes('/movie/'),
    };
  }
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const parsedID = parseInt(id);
    if (isNaN(parsedID)) {
      return push('/');
    }
    const { isMovie } = this.state;
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieAPI.movieDetail(parsedID));
      } else {
        ({ data: result } = await tvAPI.showDetail(parsedID));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  render() {
    const { result, loading, error } = this.state;
    return <DetailPresenter result={result} loading={loading} error={error} />;
  }
}
