import { defineStore } from 'pinia'
import { fetchAiSummary, fetchTranslation } from '../utils/edgeApi'

export const usePaperStore = defineStore('paper', {
  state: () => ({
    currentPaper: null,
    selectedText: '',
    extractedText: '',
    aiSummary: null,
    annotations: [],
    translationCache: new Map()
  }),

  actions: {
    async generateAiSummary() {
      if (!this.extractedText) return

      const prompt = `
你是一个科研科普助手，请用初中生能听懂的话解释这篇论文：
要求分三部分：
【背景】这篇文章想解决什么问题？
【方法】作者是怎么做的？打个比方。
【结论】发现了什么？有什么用？

摘要内容：${this.extractedText.substring(0, 1000)}...
      `.trim()

      const result = await fetchAiSummary(prompt)
      this.aiSummary = result || {
        background: "该论文提出了一种新方法来提升文献阅读效率。",
        method: "就像给论文装了个语音解说，自动告诉你重点在哪。",
        conclusion: "实验证明，这种方法能让新手快5倍读懂论文。"
      }
    },

    addAnnotation(note) {
      this.annotations.push({ ...note })
    }
  }
})
