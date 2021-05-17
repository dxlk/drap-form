<template>
  <div id="login">
    <div class="title">中盈安信数字管道业务中台</div>
    <div class="login_box">
      <div class="login_box_img"></div>
      <div class="login_input_box">
        <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick" stretch="true">
          <el-tab-pane label="账号登录" name="first">
            <template v-if="showcode">
              <el-input
                class="mrb30"
                type="text"
                size="small"
                v-model="login.user"
                placeholder="用户名/邮箱"
                clearable
              ></el-input>
              <el-input
                class="mrb20"
                type="password"
                size="small"
                v-model="login.password"
                placeholder="密码"
                :showPassword="true"
                clearable
              ></el-input>
            </template>
            <template v-else>
              <el-input
                class="mrb30 input-with-select"
                type="text"
                size="small"
                v-model="login.phone"
                clearable
                placeholder="您的手机号"
              >
                <template #prepend>
                  <el-select v-model="selectPhone" placeholder="请选择">
                    <el-option label="+86" value="1"></el-option>
                    <el-option label="+866" value="2"></el-option>
                    <el-option label="+852" value="3"></el-option>
                  </el-select>
                </template>
              </el-input>
              <el-input
                class="mrb20"
                type="password"
                size="small"
                v-model="login.code"
                clearable
                placeholder="获取验证码"
              >
                <template #append>
                  <span @click="getCode" class="hander">获取验证码</span>
                </template>
              </el-input>
            </template>
            <div class="auto-login">
              <div class="auto-login-check">
                <el-checkbox v-model="autoLogin">下次自动登录</el-checkbox>
              </div>
              <div class="auto-forword">忘记密码？</div>
            </div>
            <div class="login-btn" @click="goLogin()">登录</div>
            <div class="login-footer">
              <div class="login-left">
                <span v-show="showcode" @click="showcode=!showcode" class="hander">验证码登录</span>
                <span v-show="!showcode" @click="showcode=!showcode" class="hander">账号登录</span>
                <!-- <span class="login-bor"></span> -->
                <!-- <span class="hander">微信登录</span> -->
                <!-- <span class="login-bor"></span>
                <span class="hander">更多</span>-->
              </div>
              <div class="login-right">注册账号</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="钉钉登录" name="second">
            <div class="scan_box">
              <div class="scan_icon"></div>
              <div class="scan_desc">
                请使用钉钉扫描二维码登录
                <span class="hander">刷新</span>
              </div>
            </div>
            <div class="scan_footer">
              <div class="auto-login-check">
                <el-checkbox v-model="autoLogin">下次自动登录</el-checkbox>
              </div>
              <div class="scan_open">
                <span>还未开通钉钉?</span>
                <span class="hander">立即开通</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业微信登录" name="third">
            <div class="scan_box">
              <div class="scan_icon"></div>
              <div class="scan_desc">
                请使用钉钉扫描二维码登录
                <span class="hander">刷新</span>
              </div>
            </div>
            <div class="scan_footer">
              <div class="auto-login-check">
                <el-checkbox v-model="autoLogin">下次自动登录</el-checkbox>
              </div>
              <div class="scan_open">
                <span>还未开通企业微信?</span>
                <span class="hander">立即开通</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'login',
  props: {},
  data() {
    return {
      activeName: 'first',
      autoLogin: false,
      showcode: true, //表示当前登录用的是账号登录还是验证码登录
      selectPhone: '1', //表示当前手机号选择的是什么
      login: {
        user: '',
        password: '',
        phone: '', //手机号码
        code: '', //验证码
      },
    }
  },
  methods: {
    handleClick() {},
    goLogin() {
      console.log(this.login)
      this.$router.push('/home')
    },
    getCode() {
      alert('获取验证码')
    },
  },
}
</script>

<style lang="scss">
#login {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #f7f7f7;
  opacity: 1;
  position: relative;
  .el-input-group__prepend {
    width: 6vh;
    text-align: center;
  }
  .hander {
    cursor: pointer;
  }
  .title {
    position: absolute;
    top: 4.2vh;
    left: 3.7vh;
    height: 3.7vh;
    font-size: 2.6vh;
    font-family: Source Han Mono SC;
    font-weight: normal;
    line-height: 3.7vh;
    color: #515151;
    opacity: 1;
    padding-left: 4.2vh;
    background: url(../../assets/login/logo.png) no-repeat left center;
    background-size: auto;
  }
  .login_box {
    width: 80vh;
    height: 42vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(125, 133, 148, 0.25);
    opacity: 1;
    border-radius: 3px;
    display: flex;
    .login_box_img {
      flex: 17;
      background: url(../../assets/login/logo_content.png) no-repeat center
        center;
      background-size: 100% 100%;
    }
    .login_input_box {
      flex: 20;
      .el-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;
        .el-tabs__header {
          margin: 0px;
        }
        .el-tabs__item {
          padding: 0px;
          height: 5.6vh;
        }
        .el-tabs__content {
          flex: 1;
          padding: 4.6vh 3.7vh;
        }
      }
      .el-input__inner {
        height: 3.7vh;
        line-height: 3.7vh;
      }
      .mrb30 {
        margin-bottom: 3vh;
      }
      .mrb20 {
        margin-bottom: 1.8vh;
      }
      .auto-login {
        height: 3vh;
        line-height: 3vh;
        display: flex;
        .auto-login-check {
          flex: 1;
        }
        .auto-forword {
          flex: 1;
          text-align: right;
          color: #5887fb;
          font-size: 1.2vh;
          cursor: pointer;
        }
      }
      .login-btn {
        margin-top: 4vh;
        background: #5887fb;
        opacity: 1;
        border-radius: 3px;
        height: 3.7vh;
        line-height: 3.7vh;
        cursor: pointer;
        color: #fff;
        text-align: center;
      }
      .login-footer {
        height: 5.6vh;
        line-height: 5.6vh;
        color: #5887fb;
        font-size: 1.2vh;
        display: flex;

        .login-left {
          flex: 2;
        }
        .login-bor {
          display: inline-block;
          margin: 0vh 0.8vh;
          width: 0.09vh;
          height: 0.9vh;
          background: #e9e9e9;
        }
        .login-right {
          flex: 1;
          text-align: right;
          cursor: pointer;
        }
      }
    }
  }

  .scan_box {
    height: 25vh;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    opacity: 1;
    margin: auto;
    box-sizing: border-box;
    border-radius: 3px;
    .scan_icon {
      width: 22vh;
      height: 22vh;
      background: url(../../assets/login/scan.png) no-repeat center center;
      background-size: 100% 100%;
      margin: auto;
    }
    .scan_desc {
      text-align: center;
      color: #91a1b7;
      opacity: 1;
      font-size: 1.2vh;
      height: 3.7vh;
      line-height: 3.7vh;
      span {
        color: #5887fb;
      }
    }
  }
  .scan_footer {
    padding-top: 1vh;
    height: 3vh;
    line-height: 3vh;
    display: flex;
    .auto-login-check {
      flex: 1;
    }
    .scan_open {
      flex: 1;
      text-align: right;
      font-size: 1.2vh;
      .hander {
        color: #5887fb;
      }
    }
  }
}
</style>
