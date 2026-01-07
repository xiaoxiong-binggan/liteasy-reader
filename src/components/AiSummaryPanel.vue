<template>
  <div class="ai-panel">
    <h3>🧠 AI为你生成「小白版导读」</h3>
    <div v-if="store.aiSummary" class="summary-content">
      <p><strong>背景：</strong>{{ store.aiSummary.background }}</p>
      <p><strong>方法：</strong>{{ store.aiSummary.method }}</p>
      <p><strong>结论：</strong>{{ store.aiSummary.conclusion }}</p>
      <div class="highlight-tip">
        ✅ 已为你高亮重点段落：摘要、图3、结论
      </div>
    </div>
    <div v-else class="loading">⏳ 正在生成通俗解读...</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePaperStore } from '../stores/usePaperStore'

const store = usePaperStore()

onMounted(async () => {
  if (store.currentPaper && !store.aiSummary) {
    await store.generateAiSummary()
  }
})
</script>

<style scoped>
.ai-panel {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
.summary-content p {
  line-height: 1.6;
  color: #333;
}
.loading {
  color: #888;
  font-style: italic;
}
.highlight-tip {
  margin-top: 15px;
  padding: 10px;
  background: #e6f7ff;
  border-left: 4px solid #1890ff;
  font-size: 0.9em;
}
</style>
