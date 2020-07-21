import React, { Component } from 'react';
import '../stylesheets/Card.scss';

class App extends Component {
  render() {
    return (
      <article class="card">
        <div class="greypart">
          <div class="photo">
            <img src="none" alt="IMG" />
          </div>
          <span class="id">
            ID / 2
          </span>
        </div>
        <div class="whitepart">
          <div class="name">{this.props.id}</div>
          <div class="kind"><span class="">kind1</span><span class="">kind2</span></div>
          <div class="evolution">
            <div class="ttile">Evoluciona de:</div>
            <div class="parent">EVOL</div>
          </div>
        </div>
      </article>
    );
  }
}

export default App;