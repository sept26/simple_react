import React, {Component} from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { is, fromJS} from 'immutable'
// import PropTypes from 'prop-types'
// import API from './../../api/api'
// import envconfig from './../../envconfig/envconfig';
import Header from './../../components/header'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div>
        <Header title="首页" record/>
      </div>
    );
  }
}

export default Home