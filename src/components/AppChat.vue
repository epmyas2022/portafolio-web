<template>
  <div class="fixed right-0 bottom-0 z-50 md:left-auto left-0">
    <!-- Floating button -->
    <div class="flex justify-end">
      <button
        @click="toggleChat"
        class="relative bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-full p-4 mr-4 mb-4 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 ease-out group"
      >
        <IconChat
          :size="28"
          color="white"
          class="group-hover:rotate-12 transition-transform duration-300"
        ></IconChat>
      </button>
    </div>

    <Transition
      name="expand"
      @before-enter="animations.expandedFromBottom.beforeEnter"
      @enter="animations.expandedFromBottom.enter"
      @leave="animations.expandedFromBottom.leave"
    >
      <div
        v-show="open"
        class="absolute bottom-0 right-0 left-0 md:right-4 md:bottom-4 md:left-auto bg-white dark:bg-gray-900 flex flex-col justify-between rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full md:w-[32rem] h-[40rem] overflow-hidden backdrop-blur-xl"
      >
        <!-- Chat header -->
        <AppChatHeader @closeChat="toggleChat"></AppChatHeader>

        <!-- Chat messages -->
        <div
          id="chatMenu"
          class="overflow-y-auto flex-1 bg-gray-50 dark:bg-gray-950/50"
          ref="chatMenuScroll"
        >
          <div class="flex flex-col gap-3 p-5 flex-1">
            <AppChatMessage
              v-for="(msg, index) in messages"
              :key="index"
              :message="msg?.text"
              :isUser="msg?.isUser"
              :pending="msg?.pending"
            ></AppChatMessage>
          </div>
        </div>

        <!-- Chat input -->
        <div class="p-4 rounded-b-2xl border border-gray-200 dark:border-gray-700 dark:border-t-gray-800 bg-white dark:bg-gray-900">
          <AppChatSuggestions
            :suggestions="suggestions"
            @suggestionSelected="(suggestion) => (message = suggestion)"
          ></AppChatSuggestions>

          <div class="flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe un mensaje a Isaac..."
              v-model="message"
              @keyup.enter="sendMessage()"
              :disabled="pending"
              class="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 w-full outline-none border-2 border-transparent focus:border-pink-500 dark:focus:border-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />

            <button
              @click="sendMessage()"
              :disabled="pending"
              class="flex-shrink-0 p-3 bg-pink-500 hover:bg-pink-600 rounded-2xl text-white disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <IconSend :size="22"></IconSend>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import IconChat from './icons/IconChat.vue'
import IconSend from './icons/IconSend.vue'
import AppChatHeader from './AppChatHeader.vue'
import AppChatMessage from './AppChatMessage.vue'
import AppChatSuggestions from './AppChatSuggestions.vue'
const suggestions = ['Hola', '¿Cómo estás?', 'Hablame de ti']
import useAnimation from './composable/useAnimation'
import useChat from './composable/useChat'

const { messages, sendMessage, pending, message, chatMenuScroll, toggleChat, open } = useChat()

const { animations } = useAnimation()
</script>

<style scoped>
#chatMenu {
  scrollbar-width: thin;
  scrollbar-color: rgb(236, 72, 153) transparent;
}

#chatMenu::-webkit-scrollbar {
  width: 6px;
}

#chatMenu::-webkit-scrollbar-track {
  background: transparent;
}

#chatMenu::-webkit-scrollbar-thumb {
  background: rgb(236, 72, 153);
  border-radius: 10px;
}

#chatMenu::-webkit-scrollbar-thumb:hover {
  background: rgb(219, 39, 119);
}
</style>
