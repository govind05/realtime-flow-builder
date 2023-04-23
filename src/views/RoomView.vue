<template>
  <div h-screen>
    <FloatingLabel v-for="user of users" :key="user.id" :user="user" />
    <span text-xl absolute z-40>
      People connected:
      <span class="text-green-500">{{ users.length + 1 }} </span>
    </span>
    <VueFlow ref="vueflow">
      <Background />
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { constants } from '@/common/constants'
import FloatingLabel from '@/components/FloatingLabel.vue'
import type { SocketUserData } from '@/interface/socketUserData'
import { useSocketIO } from '@/utils/socket'
import { Background } from '@vue-flow/background'
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { computed, ref, unref } from 'vue'
import { useRoute } from 'vue-router'

const { nodes, edges, onEdgesChange, onNodesChange, applyEdgeChanges, applyNodeChanges } =
  useVueFlow({
    nodes: [
      // Nodes
      // An input node, specified by using `type: 'input'`
      { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },

      // Default nodes, you can omit `type: 'default'`
      { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
      { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },

      // An output node, specified by using `type: 'output'`
      { id: '4', type: 'output', label: 'Node 4', position: { x: 400, y: 200 } }
    ],
    edges: [
      { id: 'e1-3', source: '1', target: '3' },

      // An animated edge
      { id: 'e1-2', source: '1', target: '2', animated: true }
    ],
    autoPanOnNodeDrag: false,
    panOnDrag: false,
    panOnScroll: false,
    zoomOnScroll: false,
    zoomOnPinch: false,
    zoomOnDoubleClick: false
  })
const vueflow = ref('')

const route = useRoute()
const roomId = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
)
const users = ref<SocketUserData[]>([])

const onInit = (data: SocketUserData[]) => {
  users.value = data
}
const onUserJoined = (data: SocketUserData) => {
  users.value.push(data)
}
const onUserLeft = (data: SocketUserData) => {
  users.value = users.value.filter(({ id }) => id != data.id)
}
const onUserUpdate = (data: SocketUserData) => {
  users.value = users.value.map((user) => {
    if (data.id === user.id) return data
    return user
  })
}

const { send, close } = useSocketIO({
  roomId: unref(roomId),
  onInit,
  onUserJoined,
  onUserLeft,
  onUserUpdate,
  applyEdgeChanges,
  applyNodeChanges,
  vueflow
})

onEdgesChange((changes) => {
  send(constants.socketEvents.EDGE_CHANGE, changes)
})
onNodesChange((changes) => {
  send(constants.socketEvents.NODE_CHANGE, changes)
})
</script>
<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
</style>
