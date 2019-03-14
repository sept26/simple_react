import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveFormData, saveImage, clearData } from '@/store/home/action'
// import { is, fromJS} from 'immutable'
import PropTypes from 'prop-types'
// import API from './../../api/api'
// import envconfig from './../../envconfig/envconfig';
import Header from './../../components/header'
import './home.less'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  static propTypes = {
    formData: PropTypes.object.isRequired
  }

  handleInput = (type, event) => {
    let value = event.target.value
    switch(type) {
      case 'orderSum':
        value = value.replace(/\D/g,'')
      break;
      case 'name':
      break
      case 'phoneNo':
        // 这地方的问题
        // value = this.padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
        value = value.replace(/\D/g,'')
      break;
      default:;
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header title="首页" record/>
        <p className="person-info">请输入您的信息</p>
        <form className="form-group">
          <div>
            <label>销售金额:</label>
            <input type="text" placeholder="请输入订单金额" value={this.props.formData.orderSum} onChange={this.handleInput.bind(this, 'orderSum')}/>
          </div>
          <div>
            <label>客户姓名:</label>
            <input type="text" placeholder="请输入客户姓名" value={this.props.formData.name} onChange={this.handleInput.bind(this,'name')}/>
          </div>
          <div>
            <label>客户电话:</label>
            <input type="text" placeholder="请输入客户电话" value={this.props.formData.phoneNo} onChange={this.handleInput.bind(this,'phoneNo')}/>
          </div>
        </form>
        <div className="select-product">
          <p>请选择销售的产品</p>
          <Link to="/production" className="common-select">
            选择产品
          </Link>
        </div>
        <div className="upload-img">
          <p>请上传发票凭据</p>
          <div className="file-label">
            <span>上传图片</span>
            <input type="file"  onChange={this.uploadFile} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  formData: state.formData,
}),{
  saveFormData,
  saveImage,
  clearData
}
)(Home)