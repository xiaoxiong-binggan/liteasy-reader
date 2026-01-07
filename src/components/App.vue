<template>
  <div class="app-container">
    <!-- 顶部：上传区 -->
    <UploadZone v-if="!store.currentPaper" />

    <!-- 阅读主界面 -->
    <div v-else class="reader-layout">
      <!-- 左侧：PDF阅读 -->
      <div class="pdf-view">
        <PdfReader />
      </div>

      <!-- 右侧：AI辅助区 -->
      <div class="sidebar">
        <AiSummaryPanel />
        <AnnotationToolbar />
      </div>
    </div>

    <!-- 悬浮翻译弹窗 -->
    <TranslationTooltip />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import UploadZone from './UploadZone.vue'
import PdfReader from './PdfReader.vue'
import AiSummaryPanel from './AiSummaryPanel.vue'
import AnnotationToolbar from './AnnotationToolbar.vue'
import TranslationTooltip from './TranslationTooltip.vue'
import { usePaperStore } from '../stores/usePaperStore'

const store = usePaperStore()

onMounted(() => {
  // 模拟引导：首次进入显示提示
  if (!localStorage.getItem('hasSeenGuide')) {
    alert("📚 LitEasy 使用指南：\n1. 上传PDF\n2. 查看AI生成的小白导读\n3. 选中文本即可翻译或批注！")
    localStorage.setItem('hasSeenGuide', 'true')
  }
})
</script>

<style scoped>
.app-container {
  height: 100vh;
  overflow: hidden;
}
.reader-layout {
  display: flex;
  height: 100%;
}
.pdf-view {
  flex: 3;
  border-right: 1px solid #ddd;
  position: relative;
  overflow: auto;
  background: white;
}
.sidebar {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f5f7fa;
}
</style>
