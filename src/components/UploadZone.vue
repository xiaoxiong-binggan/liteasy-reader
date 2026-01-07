<template>
  <div class="upload-zone">
    <h2>📄 上传你的第一篇英文文献</h2>
    <p>支持 PDF / DOI / URL</p>

    <input
      type="file"
      accept=".pdf"
      @change="handleFileUpload"
      class="file-input"
    />
    <p class="tip">👉 小贴士：试试上传一篇机器学习综述论文，体验AI导读！</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usePaperStore } from '../stores/usePaperStore'

const store = usePaperStore()
const router = useRouter()

async function handleFileUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async (evt) => {
    const pdfData = evt.target.result
    const blobUrl = URL.createObjectURL(file)

    // 存入全局状态
    store.$patch({
      currentPaper: {
        title: file.name,
        blobUrl,
        status: 'uploaded'
      }
    })

    // 自动触发AI导读
    await store.generateAiSummary()
  }
  reader.readAsArrayBuffer(file)
}
</script>

<style scoped>
.upload-zone {
  text-align: center;
  padding: 60px 20px;
  color: #444;
}
h2 { color: #1890ff; }
.file-input {
  margin: 20px 0;
  padding: 12px;
  border: 2px dashed #1890ff;
  border-radius: 8px;
  cursor: pointer;
}
.file-input:hover {
  background: #eef;
}
.tip {
  color: #666;
  font-size: 0.9em;
  max-width: 400px;
  margin: 20px auto;
}
</style>
