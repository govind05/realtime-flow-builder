<template>
  <div>
    <h1>Welcome to room {{ $route.params.id }}!</h1>
    <h3>All connected</h3>
    <ul v-for="user in users" :key="user.id">
      <li>{{ user.name }}: x:{{ user.mousePos?.x }}, y:{{ user.mousePos?.y }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { SocketUserData } from '@/interface/socketUserData'
import { useSocketIO } from '@/utils/socket'
import { computed, ref, unref } from 'vue'
import { useRoute } from 'vue-router'

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
  onUserUpdate
})
</script>
<style></style>