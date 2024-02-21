<template>
  <div class="pa-10">
    <div style="margin-top: 100px" class="mx-auto">
      <div
        style="font-family: '三极行楷简体-粗', serif; font-size: 50px"
        class="text-center primary-color"
      >
        绩点计算器
      </div>
      <!--      <VIcon-->
      <!--        class="mouse-pointer mx-auto"-->
      <!--        icon="mdi-github"-->
      <!--        :size="40"-->
      <!--        @click="githubClick"-->
      <!--      ></VIcon>-->
      <div style="margin-top: 200px">
        <div class="d-flex mx-auto" style="width: 150px">
          <span class="text-center justify-center mx-auto"> 版本 1.0.1</span>
          <VIcon
            style="margin-top: -10px"
            icon="mdi-github"
            :size="40"
            class="mouse-pointer justify-center mx-auto"
            @click="githubClick"
          ></VIcon>
        </div>
        <div style="opacity: 0.7" class="primary-color text-center mt-3">
          MIT Licensed | Copyright © 2023-present LHabc
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function githubClick() {
  window.open("https://github.com/LHabc-me/gpa-calculator");
}
</script>

<!--@formatter:off-->
<route>
{
  meta: {
    title: '首页'
  }
}
</route>
