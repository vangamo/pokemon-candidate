import React, { Component } from 'react';
import SearchBox from './SearchBox';
import Pile from './Pile';
import '../stylesheets/App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    }
  }

  render() {
    return (
    <div className="app">
      <section className="header">
        <SearchBox searchText={this.state.searchText}/>
      </section>
      <Pile searchText={this.state.searchText}/>
    </div>
    );
  }
}

export default App;