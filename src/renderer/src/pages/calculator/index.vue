<template>
  <div class="pa-10">
    <VRow>
      <VCol :cols="4">
        <VBtn :block="true" color="primary" @click="addLine">新增</VBtn>
      </VCol>
      <VCol :cols="4">
        <VBtn :block="true" color="error" @click="deleteLine">删除</VBtn>
      </VCol>
      <VCol :cols="4">
        <VBtn :block="true" color="success" @click="uploadFileInput.click()">从文件导入</VBtn>
        <input
          ref="uploadFileInput"
          type="file"
          class="d-none"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="onUploadFileInputChange"
        />
      </VCol>
    </VRow>
    <VRow>
      <div class="mx-auto">
        平均绩点(按学分加权): <span class="primary-color">{{ GPA }}</span>
      </div>
    </VRow>
    <VRow>
      <div class="mx-auto" style="opacity: 0.8">
        (注：未填写绩点时，按成绩向下取整根据规则计算绩点)
      </div>
    </VRow>
    <VRow>
      <VCol :cols="2.4">行号</VCol>
      <VCol :cols="2.4">课程名</VCol>
      <VCol :cols="2.4">总成绩</VCol>
      <VCol :cols="2.4">学分</VCol>
      <VCol :cols="2.4">绩点</VCol>
    </VRow>
    <VRow v-for="(item, index) in lines.list" :key="index">
      <VCol :cols="2.4"> {{ index + 1 }}</VCol>
      <VCol :cols="2.4">
        <VTextField
          v-model="item.course"
          class="centered-input"
          color="primary"
          variant="underlined"
          density="compact"
          style="margin-top: -20px"
        >
        </VTextField>
      </VCol>
      <VCol :cols="2.4">
        <VTextField
          v-model="item.score"
          class="centered-input"
          color="primary"
          variant="underlined"
          density="compact"
          style="margin-top: -20px"
        >
        </VTextField>
      </VCol>
      <VCol :cols="2.4">
        <VTextField
          v-model="item.credit"
          class="centered-input"
          color="primary"
          variant="underlined"
          density="compact"
          style="margin-top: -20px"
        >
        </VTextField>
      </VCol>
      <VCol :cols="2.4">
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
import { dialogConfirm } from '../../utils/dialogConfirm'
import { ref, computed } from 'vue'
import { useRules } from '../../store/modules/rules'
import { useCalculatorList } from '../../store/modules/calculatorList'
import * as XLSX from 'xlsx'

const uploadFileInput = ref(null)

function onUploadFileInputChange(event) {
  let file = event.target.files[0]
  const fileReader = new FileReader()
  fileReader.onload = (ev) => {
    const data = ev.target.result
    const workbook = XLSX.read(data, {
      type: 'binary'
    })
    const wsname = workbook.SheetNames[0] //取第一张表
    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) //生成json表格内容
    for (const item of ws) {
      lines.list.push({
        course: item['课程名'],
        score: item['总成绩'],
        credit: item['学分'],
        gpa: item['绩点']
      })
    }
  }
  fileReader.readAsBinaryString(file)
}

const rules = useRules()
const GPA = computed(() => {
  //根据学分计算平均绩点
  let sum = 0
  let creditSum = 0
  for (const item of lines.list) {
    console.log(item)
    let gpa = null
    let credit = null
    let score = null

    if (!item.credit) {
      continue
    } else {
      credit = Number(item.credit)
    }
    if (item.score === undefined && item.gpa === undefined) {
      continue
    } else {
      if (item.score !== undefined) {
        const index = item.score.toString().indexOf('.') ?? item.score.toString().length
        score = Math.floor(Number(item.score.toString().slice(0, index + 7))) ?? null
      }
      if (item.gpa !== undefined) {
        gpa = Number(item.gpa) ?? null
      }
    }

    if (gpa !== null) {
      sum += gpa * credit
      creditSum += credit
    } else if (credit !== null) {
      const rule = rules.list.find((rule) => rule.scoreFrom <= score && score <= rule.scoreTo)
      if (rule) {
        sum += Number(rule.gpa) * credit
        creditSum += credit
      }
    }
  }
  const result = sum / creditSum
  if (isNaN(result)) {
    return '-'
  }
  return result.toFixed(6)
})

const lines = useCalculatorList()

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
    title: '计算器'
  }
}
</route>
