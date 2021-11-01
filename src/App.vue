/*
 * @Author: xu.zhehui 
 * @Date: 2021-05-13 18:39:24 
 * @Last Modified by: xu.zhehui
 * @Last Modified time: 2021-06-28 18:31:43
 */
<template>
  <a-config-provider :getPopupContainer="getPopupContainer">
    <router-view/>
  </a-config-provider>
</template>

<script>
export default {
  methods: {
    getPopupContainer(el, dialogContext) {//国际化
        if (dialogContext) {
          return dialogContext.getDialogWrap();
        } else {
          return document.body;
        }
    },
  },
}
</script>


<style lang="scss">
#app {width:100%;height:100%;overflow:hidden;}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar{
    width: 7px;
    height: 7px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    background-color: #c8c8c8;
  }
</style>
