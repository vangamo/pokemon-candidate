import React, { Component } from 'react';
import '../stylesheets/Card.scss';

class App extends Component {
  render() {
    return (
      <article className="card">
        <div className="greypart">
          <div className="photo">
            <img src="none" alt="IMG" />
          </div>
          <span className="id">
            ID / 2
          </span>
        </div>
        <div className="whitepart">
          <div className="name">{this.props.id}</div>
          <div className="kind"><span className="">kind1</span><span className="">kind2</span></div>
          <div className="evolution">
            <div className="ttile">Evoluciona de:</div>
            <div className="parent">EVOL</div>
          </div>
        </div>
      </article>
    );
  }
}

export default App;