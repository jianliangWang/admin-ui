import { MessageBox, Message } from 'element-ui'

export function myConfirm (msg = '操作成功') {
  return MessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false
  })
}

export function myMessageSuccess (message) {
  return myMessage(message, 'success')
}

export function myMessageFaild (message) {
  return myMessage(message, 'error')
}

function myMessage (message, type) {
  return Message({
    type: type,
    message: message
  })
}

export default {
  myConfirm,
  myMessageSuccess,
  myMessageFaild
}
