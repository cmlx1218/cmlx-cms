import {request, requestLogin} from "./request";
import {DataToFormData} from "../common/utils";

export default {
  // 登录
  login(data) {
    return requestLogin({
      url: '/uaa/oauth/login',
      method: 'POST',
      data: DataToFormData(data)
    })
  },

  // 登出
  logout(data) {
    return requestLogin({
      url: '/uaa/oauth/logout',
      method: 'POST',
      data: DataToFormData(data)
    })
  },

  /* 运营人员相关 */
  // 获取运营人员信息
  getOperatorInfo(data) {
    return request({
      url: '/cms/web/operator/getOperatorInfo',
      method: 'POST',
      data: DataToFormData(data)
    })
  },


  /* 热门词相关 */
  getHotWordList(data) {
    return request({
      url: '/cms/web/word/getHotWordList',
      method: 'POST',
      data: DataToFormData
    })
  }




}
