import { nextTick, ref } from 'vue'

const promiseResult = async (callback) => {
  try {
    return await callback
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
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

    message.value = ''
console.log(import.meta.env.VITE_API_URL)
    const response = await promiseResult(
      fetch(`${import.meta.env.VITE_API_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: mensageText,
          cursor: cursor.value
        })
      })
    )

    if (!response) {
      messages.value.splice(- 1, 1)
      addMessage('Lo siento, por favor intenta de nuevo.', false, false)
      pending.value = false
      return
    }
    const data = await response.json()
    cursor.value = data?.cursor

    messages.value.splice(- 1, 1)
    addMessage(data?.response, false, false)
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

    scrollToBottom()
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
