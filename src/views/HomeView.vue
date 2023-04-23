<template>
  <main>
    <h1>Collaborate and create unique and effective flows with others in real time.</h1>
    Your username: <input v-model="name" />
    <br />
    <div>
      <p>Join your friend</p>
      Room Id: <input v-model="roomId" />
      <button @click="joinRoom(roomId)">Join</button>
    </div>
    <p>OR</p>
    <button>Create a new Room</button>
  </main>
</template>
<script setup lang="ts">
import { constants } from '@/common/constants'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = useStorage(constants.storageKeys.USERNAME, '', sessionStorage)
const roomId = ref()

const joinRoom = (roomId: string) => {
  router.push('/room/' + roomId)
}

const createANewRoom = () => {}
</script>
