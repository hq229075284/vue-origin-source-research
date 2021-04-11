<script>
import elmentUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
Vue.use(elmentUI)

export default {
  /* eslint-disable vue/name-property-casing */
  name: 'dc-dialog',
  props: {
    needDefaultFooter: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    noop() {}
  },
  render() {
    return <el-dialog {...{ props: this.$attrs }} class='dc-dialog' appendToBody>
      {this.$slots.title ? <div slot='title' class='el-dialog__title'>{this.$slots.title}</div> : null}
      {this.$slots.default}
      {
        this.$slots.footer
          ? <div class='footer-container' slot='footer'>{this.$slots.footer}</div>
          : this.needDefaultFooter
            ? <div class='footer-container' slot='footer'>
              <el-button type='primary' onClick={this.$listeners.confirm || this.noop}>确定</el-button>
              <el-button type='info' onClick={this.$listeners.cancel || this.noop}>取消</el-button>
            </div>
            : null
      }
    </el-dialog>
  }
}
</script>

<style lang="less" scoped>
.dc-dialog ::v-deep{
    .el-dialog{
        max-width: 900px;
        min-width: 600px;
        width: 50%;
        box-shadow: 0px 6px 18px 0px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
    }
    .el-dialog__header{
        padding: 26px 50px 26px 30px;
       position: relative;
    }
    .el-dialog__title{
       font-weight: bold;
       font-family: MicrosoftYaHei;
       font-size: 18px;
       color: #4d5c6e;
    }
    .el-dialog__headerbtn{
        top:50%;
        right: 30px;
        margin-top:-10px;
    }
    .el-dialog__close{
        font-size: 20px;
        font-weight: 700;
        color:#fe6e6d;
    }
    .el-dialog__body{
        padding:0 30px 16px;
    }
    .el-dialog__footer{
        padding: 20px 30px 36px;
        text-align: center;
        .el-button{
            width: 160px;
            height: 42px;
            background-color: #dbdee4;
            box-shadow: 0px 4px 10px 0px rgba(219, 222, 228, 0.24);
            border-radius: 4px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            font-size: 16px;
            color: #818e9b;
            border:none;
            &.el-button--primary{
                background-color: #1576e2;
                box-shadow: 0px 4px 10px 0px rgba(97, 125, 226, 0.24);
                color:#ffffff;
            }
        }
    }
}
</style>