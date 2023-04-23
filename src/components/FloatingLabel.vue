<template>
  <div
    class="absolute transition-all flex items-center justify-center flex-wrap animate-fade-in z-40"
    :style="{
      top: user.mousePos.y - 14 + 'px',
      left: user.mousePos.x - 14 + 'px'
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
