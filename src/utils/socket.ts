import { config } from '@/common/config'
import { constants } from '@/common/constants'
import { throttleFilter, useMouse, useStorage } from '@vueuse/core'
import io from 'socket.io-client'
import { reactive, ref, unref, watch } from 'vue'

interface Props {
  roomId: string
  onInit: Function
  onUserJoined: Function
  onUserLeft: Function
  onUserUpdate: Function
}

export const useSocketIO = (options: Props) => {
  const { roomId, onInit, onUserJoined, onUserLeft, onUserUpdate } = options
  const name = unref(useStorage(constants.storageKeys.USERNAME, '', sessionStorage))
  const socket = ref(io(config.socketUrl, { query: { name, roomId } }))

  const mousePos = reactive(useMouse({ eventFilter: throttleFilter(200), touch: false }))

  watch(mousePos, () => {
    socket.value.emit(constants.socketEvents.MOUSE_POS_UPDATE, mousePos)
  })
  socket.value.on(constants.socketEvents.USER_LIST, (data) => {
    onInit(data)
  })
  socket.value.on(constants.socketEvents.USER_JOINED, (data) => {
    onUserJoined(data)
  })
  socket.value.on(constants.socketEvents.USER_LEFT, (data) => {
    onUserLeft(data)
  })
  socket.value.on(constants.socketEvents.USER_UPDATE, (data) => {
    onUserUpdate(data)
  })

  return {
    send: socket.value.emit,
    close: socket.value.disconnect,
    socket
  }
}
