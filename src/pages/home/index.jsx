import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveFormData, saveImage, clearData } from '@/store/home/action'
import { clearSelect } from '@/store/production/action'
import { is, fromJS} from 'immutable'
import PropTypes from 'prop-types'
import API from './../../api/api'
import envconfig from './../../envconfig/envconfig';
import Header from './../../components/header'
import './home.less'
import TouchableOpacity from '@/components/touchableOpacity'
import Alert from '@/components/alert'
require("babel-polyfill")

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      alertStatus: false,
      alertTip: ''
     }
  }
  static propTypes = {
    formData: PropTypes.object.isRequired,
    saveFormData: PropTypes.func.isRequired,
    saveImage: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    clearSelect: PropTypes.func.isRequired
  }

  selectedProList = []

  componentWillReceiveProps(nextProps) {
    // 两个对象的hashCode相等，值就是相同的，避免了深度遍历，提高了性能
    if(!is(fromJS(this.props.proData),fromJS(nextProps.proData))) {
      this.initData(nextProps)
    }
  }

  componentWillMount(){
    this.initData(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  initData = props => {
    this.selectedProList = []
    props.proData.dataList.forEach(item => {
      if(item.selectStatus && item.selectNum) {
        this.selectedProList.push(item)
      }
    })
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
        value = value.replace(/\D/g,'')
      break;
      default:;
    }
    this.props.saveFormData(value, type);
  }

  // 上传图片
  uploadFile = async event => {
    try {
      let formdata = new FormData()
      formdata.append('file', event.target.files[0])
      let result = await API.uploadImg({data: formdata})
      this.props.saveImage(envconfig.imgUrl + result.image_path)
    } catch(err) {
      console.log(err)
    }
  }

  // 提交
  sumitForm = () => {
    const {orderSum, name, phoneNo} = this.props.formData
    let alertTip = ''
    if (!String(orderSum).length) {
      alertTip = '请填写金额'
    } else if(!String(name).length) {
      alertTip = '请填写姓名'
    } else if(!String(phoneNo).length) {
      alertTip = '请填写手机号'
    } else {
      alertTip = '添加数据成功'
      this.props.clearSelect()
      this.props.clearData()
    }
    this.setState(() => {
      return {
        alertStatus: true,
        alertTip
      }
    })
  }

  // 关闭弹框
  closePop = () => {
    this.setState(() => {
      return {
        alertStatus: false,
        alertTip: ''
      }
    })
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
            {
              this.selectedProList.length ? <ul className="selected-pro">
                {
                  this.selectedProList.map((item,index) => {
                    return (<li key={index}>
                      {item.product_name}x{item.selectNum}
                    </li>)
                  })
                }
              </ul>:'选择产品'
            }
          </Link>
        </div>
        <div className="upload-img">
          <p>请上传发票凭据</p>
          <div className="file-label">
            <span>上传图片</span>
            <input type="file"  onChange={this.uploadFile} />
          </div>
          {this.props.formData.imgPath && <img src={this.props.formData.imgPath} className="select-img"/>}
        </div>
        <TouchableOpacity className="submit-btn" clickCallBack={this.sumitForm} text="提交"/>
        <Alert closeAlert={this.closePop} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus}/>    
      </div>
    )
  }
}

export default connect(state => ({
  formData: state.formData,
  proData: state.proData
}),{
  saveFormData,
  saveImage,
  clearData,
  clearSelect
}
)(Home)