import { config } from '@/common/config'
import { constants } from '@/common/constants'
import { throttleFilter, useMouse, useStorage, useThrottleFn } from '@vueuse/core'
import io from 'socket.io-client'
import { reactive, ref, unref, watch, type Ref } from 'vue'

interface Props {
  roomId: string
  onInit: Function
  onUserJoined: Function
  onUserLeft: Function
  onUserUpdate: Function
  applyEdgeChanges: Function
  applyNodeChanges: Function
  vueflow: Ref
}

export const useSocketIO = (options: Props) => {
  const {
    roomId,
    onInit,
    onUserJoined,
    onUserLeft,
    onUserUpdate,
    applyEdgeChanges,
    applyNodeChanges
  } = options
  const name = unref(useStorage(constants.storageKeys.USERNAME, '', sessionStorage))
  const socket = ref(io(config.socketUrl, { query: { name, roomId } }))

  const mousePos = reactive(useMouse({ eventFilter: throttleFilter(100), touch: false }))

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
  socket.value.on(constants.socketEvents.NODE_CHANGE, (data) => {
    applyNodeChanges(data)
  })
  socket.value.on(constants.socketEvents.EDGE_CHANGE, (data) => {
    applyEdgeChanges(data)
  })

  const throttledEmit = useThrottleFn((event, data) => {
    socket.value.emit(event, data)
  }, 10)

  return {
    send: throttledEmit,
    close: socket.value.disconnect,
    socket
  }
}
