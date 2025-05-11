import { nextTick, ref } from 'vue'

export default function useChat() {
  const message = ref('')
  const messages = ref([])
  const open = ref(false)
  const cursor = ref(null)
  const pending = ref(false)
  const chatMenuScroll = ref(null)

  const sendMessage = async () => {
    if (message.value.trim() === '') return

    pending.value = true
    
    const mensageText = message.value

    addMessage(message.value, true, false)
    addMessage('', false, true)

    scrollToBottom()

    message.value = ''

    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/about-me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: mensageText,
        cursor: cursor.value
      })
    })
    const data = await response.json()
    cursor.value = data?.cursor

    messages.value.splice(messages.value.length - 1, 1)
    addMessage(data?.chat?.message, false, false)
    scrollToBottom()
    pending.value = false
  }

  const scrollToBottom = () => {
    nextTick(() => {
      const el = chatMenuScroll.value
      if (!el) return
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      })
    })
  }
  const addMessage = (msg, isUser, pending) => {
    messages.value.push({
      text: msg,
      isUser,
      pending
    })
  }

  const toggleChat = () => {
    open.value = !open.value
  }

  return {
    message,
    messages,
    pending,
    cursor,
    open,
    addMessage,
    sendMessage,
    toggleChat,
    chatMenuScroll
  }
}
