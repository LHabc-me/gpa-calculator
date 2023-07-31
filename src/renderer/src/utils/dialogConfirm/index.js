import { useMessage } from '../../store/modules/message'

const message = useMessage()

function dialogConfirm(dialog, lines) {
  try {
    let linesArr = []
    if (dialog.content.includes(',')) {
      linesArr = dialog.content.split(',')
    } else {
      if (dialog.content !== '') {
        linesArr = [dialog.content]
      }
    }

    if (linesArr.includes('*')) {
      if (dialog.action === 'delete') {
        lines.list = []
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

    if (dialog.action === 'delete') {
      const newList = []
      for (let i = 0; i < lines.list.length; i++) {
        if (!linesArr2.includes(i + 1)) {
          newList.push(lines.list[i])
        }
      }
      lines.list = newList
      message.success('删除成功')
    } else {
      // 检测>rules.list.length的行号是否连续
      for (let i = 0; i < linesArr2.length; i++) {
        if (linesArr2[i] > lines.list.length) {
          if (linesArr2[i] !== lines.list.length + i + 1) {
            // 错误：行号不连续
            message.error('行号不连续')
            return
          }
        }
      }

      const newList = []
      for (let i = 0; i < lines.list.length + linesArr2.length; i++) {
        if (linesArr2.includes(i + 1)) {
          newList.push({})
        }
        if (lines.list[i]) {
          newList.push(lines.list[i])
        }
      }
      lines.list = newList
      message.success('添加成功')
    }
  } finally {
    dialog.show = false
  }
}

export { dialogConfirm }
