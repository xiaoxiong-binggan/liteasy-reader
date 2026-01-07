<template>
  <div ref="pdfContainer" class="pdf-container"></div>
</template>

<script setup>
import * as pdfjsLib from 'pdfjs-dist'
import { onMounted, ref, nextTick } from 'vue'
import { usePaperStore } from '../stores/usePaperStore'

// 设置 worker 路径（使用 CDN 版本）
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

const pdfContainer = ref(null)
const store = usePaperStore()

onMounted(async () => {
  if (!store.currentPaper) return

  const loadingTask = pdfjsLib.getDocument(store.currentPaper.blobUrl)
  const pdf = await loadingTask.promise

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale: 1.5 })

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width

    await page.render({ canvasContext: context, viewport }).promise

    // 添加文本层以便选中
    const textLayer = document.createElement('div')
    textLayer.className = 'text-layer'
    textLayer.style.position = 'absolute'
    textLayer.style.inset = '0'
    textLayer.style.overflow = 'hidden'
    textLayer.style.opacity = '0'
    textLayer.style.cursor = 'text'

    const container = document.createElement('div')
    container.style.position = 'relative'
    container.appendChild(canvas)
    container.appendChild(textLayer)

    pdfContainer.value.appendChild(container)

    // 提取文本用于后续翻译
    const textContent = await page.getTextContent()
    const strings = textContent.items.map(item => item.str).join(' ')
    store.extractedText += ' ' + strings
  }

  // 启用选中翻译
  enableTextSelection()
})

function enableTextSelection() {
  pdfContainer.value.addEventListener('mouseup', async () => {
    await nextTick()
    const selection = window.getSelection()
    if (selection.toString().length > 0) {
      store.selectedText = selection.toString()
      // 触发翻译事件（由 TranslationTooltip 监听）
      window.dispatchEvent(new CustomEvent('text-selected'))
    }
  })
}
</script>

<style scoped>
.pdf-container {
  padding: 20px;
}
.text-layer {
  user-select: text;
}
</style>
