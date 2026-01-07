// 模拟调用阿里云边缘节点的AI服务
export async function fetchAiSummary(prompt) {
  // 实际应 POST 到 https://your-esa-domain.com/edge-api/ai-summary
  console.log('[Edge AI] 请求AI导读:', prompt.slice(0, 100) + '...')
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        background: "研究人员发现人工读论文太慢，想用AI帮忙提速。",
        method: "他们训练了一个模型，能自动提取论文核心观点。",
        conclusion: "测试表明，这个工具帮助用户节省了70%阅读时间。"
      })
    }, 1500)
  })
}

export async function fetchTranslation(text, mode = 'simple') {
  console.log('[Edge Translate] 翻译:', text)
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        translated: text === 'Transformer' 
          ? '一种新型AI模型结构（如ChatGPT所用）'
          : '这个模型的效果达到了目前最好水平'
      })
    }, 800)
  })
}
