<template>
  <teleport to="body">
    <div
      v-if="show"
      class="tooltip"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <div class="word-info" v-if="currentWord">
        <strong>{{ currentWord }}</strong>
        <span>📖 {{ simpleMeaning }}</span>
        <span>🔬 {{ academicMeaning }}</span>
      </div>
      <div class="sentence-translation" v-if="sentence">
        {{ sentenceZh }}
      </div>
      <button @click="insertAnnotation('不懂')">❓ 不懂</button>
      <button @click="insertAnnotation('重点')">✅ 重点</button>
    </div>
  </teleport>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { usePaperStore } from '../stores/usePaperStore'
import { fetchTranslation } from '../utils/edgeApi'

const store = usePaperStore()
const show = ref(false)
const top = ref(0)
const left = ref(0)
const currentWord = ref('')
const simpleMeaning = ref('')
const academicMeaning = ref('')
const sentence = ref('')
const sentenceZh = ref('')

// 模拟术语库
const termDict = {
  transformer: {
    simple: '一种新型AI模型结构',
    academic: '基于自注意力机制的深度学习架构'
  },
  'state-of-the-art': {
    simple: '当前最好的',
    academic: '达到最先进水平的技术'
  }
}

onMounted(() => {
  window.addEventListener('text-selected', openTooltip)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tooltip')) {
      show.value = false
    }
  })
})

async function openTooltip() {
  const sel = window.getSelection()
  const text = sel.toString().trim()
  if (text.length === 0) return

  const range = sel.getRangeAt(0)
  const rect = range.getBoundingClientRect()

  top.value = rect.top - 60
  left.value = rect.left

  // 判断是单词还是句子
  if (text.split(' ').length <= 3) {
    const wordKey = text.toLowerCase()
    const term = termDict[wordKey]
    if (term) {
      currentWord.value = text
      simpleMeaning.value = term.simple
      academicMeaning.value = term.academic
      sentence.value = null
    } else {
      sentence.value = text
      const res = await fetchTranslation(text, 'simple')
      sentenceZh.value = res.translated
    }
  } else {
    sentence.value = text
    const res = await fetchTranslation(text, 'simple')
    sentenceZh.value = res.translated
  }

  show.value = true
}

function insertAnnotation(type) {
  store.addAnnotation({
    text: store.selectedText,
    type,
    time: new Date().toLocaleTimeString()
  })
  show.value = false
}
</script>

<style scoped>
.tooltip {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  z-index: 1000;
  max-width: 300px;
  font-size: 14px;
}
.word-info strong { display: block; margin-bottom: 4px; }
button {
  margin-top: 8px;
  margin-right: 6px;
  padding: 4px 8px;
  font-size: 12px;
}
</style>
