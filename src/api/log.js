//所有请求登录相关接口
import request from "@/utils/request";

//图形验证码
export const getPicCode = () => {
  return request.get("/captcha/image");
};

//获取验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post("/captcha/sendSmsCaptcha", {
    form: {
      captchaCode,
      captchaKey,
      mobile,
    },
  });
};

//登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post("/passport/login", {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode,
    },
  });
};
