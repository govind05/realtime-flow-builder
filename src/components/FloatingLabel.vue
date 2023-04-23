<template>
  <div
    class="absolute transition-all flex items-center justify-center flex-wrap animate-fade-in"
    :style="{
      top: user.mousePos.y + 'px',
      left: user.mousePos.x + 'px'
    }"
  >
    <div class="i-mdi-mouse h-6 w-6" :style="{ color: style.background }" />
    <span class="bg-opacity-80 text-white p-2 rounded-lg" :key="user.id" :style="{ ...style }">
      {{ user.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { SocketUserData } from '@/interface/socketUserData'
import { randomColor } from '@/utils/helper'
import { ref } from 'vue'

interface Props {
  user: SocketUserData
}

defineProps<Props>()

const style = ref({
  background: randomColor()
})
</script>
