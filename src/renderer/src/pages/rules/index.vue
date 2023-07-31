<template>
  <div class="pa-10">
    <VRow>
      <VCol :cols="6">
        <VBtn :block="true" color="primary" @click="addLine"> 新增</VBtn>
      </VCol>
      <VCol :cols="6">
        <VBtn :block="true" color="error" @click="deleteLine"> 删除</VBtn>
      </VCol>
    </VRow>
    <VRow class="align-center">
      <VCol :cols="3">行号</VCol>
      <VCol :cols="6">成绩</VCol>
      <VCol :cols="3">绩点</VCol>
    </VRow>
    <VRow v-for="(item, index) in lines.list" :key="index">
      <VCol :cols="3"> {{ index + 1 }}</VCol>
      <VCol :cols="6">
        <VRow>
          <VCol :cols="3">
            <VTextField
              v-model="item.scoreFrom"
              class="centered-input"
              color="primary"
              variant="underlined"
              density="compact"
              style="margin-top: -20px"
            >
            </VTextField>
          </VCol>
          <VCol :cols="2" class="text-center">到</VCol>
          <VCol :cols="3">
            <VTextField
              v-model="item.scoreTo"
              class="centered-input"
              color="primary"
              variant="underlined"
              density="compact"
              style="margin-top: -20px"
            >
            </VTextField>
          </VCol>
        </VRow>
      </VCol>
      <VCol :cols="3">
        <VTextField
          v-model="item.gpa"
          class="centered-input"
          color="primary"
          variant="underlined"
          density="compact"
          style="margin-top: -20px"
        >
        </VTextField>
      </VCol>
    </VRow>

    <VDialog v-model="dialog.show" width="500">
      <VCard>
        <VTextField v-model="dialog.content" color="primary" label="行号"></VTextField>
        <div style="opacity: 0.7">
          注：行号支持以下格式<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7表示第7行<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*表示所有行<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7-9表示7到9行<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7,9表示7和9行<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7,9-11表示7和9到11行
        </div>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn color="primary" variant="text" @click="dialogClick"> 确定</VBtn>
          <VBtn color="error" variant="text" @click="dialog.show = false"> 取消</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import { useRules } from '../../store/modules/rules'
import { dialogConfirm } from '../../utils/dialogConfirm'
import { ref } from 'vue'

const lines = useRules()

const dialog = ref({
  show: false,
  /** @type{""|"add"|"delete"} */
  action: '',
  content: ''
})

function addLine() {
  dialog.value.content = (lines.list.length + 1).toString()
  dialog.value.action = 'add'
  dialog.value.show = true
}

function deleteLine() {
  dialog.value.content = ''
  dialog.value.action = 'delete'
  dialog.value.show = true
}

function dialogClick() {
  dialogConfirm(dialog.value, lines)
}
</script>

<!--@formatter:off-->
<route lang="json5">
{
  meta: {
    title: '规则'
  }
}
</route>
