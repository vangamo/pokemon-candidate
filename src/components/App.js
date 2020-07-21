import React, { Component } from 'react';
import SearchBox from './SearchBox';
import Pile from './Pile';
import '../stylesheets/App.css';

class App extends Component {
  render() {
    return (
    <div class="app">
      <section class="header">
        <SearchBox/>
      </section>
      <Pile/>
    </div>
    );
  }
}

export default App;