<template>
  <div class="annotation-bar">
    <h3>📌 我的笔记</h3>
    <div v-if="store.annotations.length === 0" class="empty">
      📝 尚无批注，选中文本即可添加！
    </div>
    <div v-else class="list">
      <div v-for="(note, idx) in store.annotations" :key="idx" class="note-item">
        <strong>[{{ note.type }}]</strong> {{ note.text.substring(0, 50) }}...
      </div>
    </div>
    <button @click="exportNotes" class="export-btn">📤 导出为Word</button>
  </div>
</template>

<script setup>
import { usePaperStore } from '../stores/usePaperStore'

const store = usePaperStore()

function exportNotes() {
  alert("✅ 笔记已导出为 Word！\n（实际项目中可集成 docxtemplater）")
}
</script>

<style scoped>
.annotation-bar {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.empty {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 10px;
}
.note-item {
  font-size: 13px;
  margin: 8px 0;
  padding: 6px;
  background: #f0f2f5;
  border-radius: 4px;
  word-break: break-word;
}
.export-btn {
  width: 100%;
  padding: 10px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
