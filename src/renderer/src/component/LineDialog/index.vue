<template>
  <VDialog v-model="dialog.show">
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
        <VBtn color="primary" variant="text" @click="dialogConfirm"> 确定</VBtn>
        <VBtn color="error" variant="text" @click="dialog.show = false"> 取消</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
import { useMessage } from '../../store/modules/message'
import { ref } from 'vue'

let line = {}
const message = useMessage()
const dialog = ref({
  show: false,
  /** @type{""|"add"|"delete"} */
  action: '',
  content: ''
})

function addLine(l) {
  line = l
  dialog.value.content = (line.list.length + 1).toString()
  dialog.value.action = 'add'
  dialog.value.show = true
}

function deleteLine(l) {
  line = l
  dialog.value.content = ''
  dialog.value.action = 'delete'
  dialog.value.show = true
}

function dialogConfirm() {
  try {
    let linesArr = []
    if (dialog.value.content.includes(',')) {
      linesArr = dialog.value.content.split(',')
    } else {
      if (dialog.value.content !== '') {
        linesArr = [dialog.value.content]
      }
    }

    if (linesArr.includes('*')) {
      if (dialog.value.action === 'delete') {
        line.list = []
        message.success('删除成功')
        return
      } else {
        // 错误：添加*行
        message.error('不能添加*行')
        return
      }
    }
    const linesArr2 = []
    for (const line of linesArr) {
      if (line.includes('-')) {
        const lineArr = line.split('-')
        for (let i = parseInt(lineArr[0]); i <= parseInt(lineArr[1]); i++) {
          linesArr2.push(i)
        }
      } else {
        linesArr2.push(parseInt(line))
      }
    }

    if (linesArr2.length === 0) {
      // 错误：行号为空
      message.error('行号不能为空')
      return
    }
    if (linesArr2.includes(NaN)) {
      // 错误：包含非数字
      message.error('行号不能包含非数字')
      return
    }
    linesArr2.sort((a, b) => parseInt(a) - parseInt(b))

    if (dialog.value.action === 'delete') {
      const newList = []
      for (let i = 0; i < line.list.length; i++) {
        if (!linesArr2.includes(i + 1)) {
          newList.push(line.list[i])
        }
      }
      line.list = newList
      message.success('删除成功')
    } else {
      // 检测>rules.list.length的行号是否连续
      for (let i = 0; i < linesArr2.length; i++) {
        if (linesArr2[i] > line.list.length) {
          if (linesArr2[i] !== line.list.length + i + 1) {
            // 错误：行号不连续
            message.error('行号不连续')
            return
          }
        }
      }

      const newList = []
      for (let i = 0; i < line.list.length + linesArr2.length; i++) {
        if (linesArr2.includes(i + 1)) {
          newList.push({})
        }
        if (line.list[i]) {
          newList.push(line.list[i])
        }
      }
      line.list = newList
      message.success('添加成功')
    }
  } finally {
    dialog.value.show = false
  }
}
</script>
