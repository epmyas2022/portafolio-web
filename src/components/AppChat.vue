<template>

    <div class="fixed right-0 bottom-0 z-50 md:left-auto left-0">

        <div class="flex justify-end">
            <button @click="toggleChat"
                class="bg-pink-600 rounded-full p-3 mr-4 mb-4 box-border shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out">
                <IconChat :size="30" color="white"></IconChat>
            </button>
        </div>


        <Transition name="expand" @before-enter="animations.expandedFromBottom.beforeEnter"
            @enter="animations.expandedFromBottom.enter" @leave="animations.expandedFromBottom.leave">


            <div v-show="open"
                class="absolute bottom-0 right-0 left-0 md:right-4 md:bottom-4 md:left-auto bg-white flex flex-col justify-between dark:bg-gray-800 rounded-2xl shadow-lg w-full md:w-[30rem] h-[35rem]">

                <!-- Chat header -->
                <AppChatHeader @closeChat="toggleChat"></AppChatHeader>
                <!-- Chat messages -->
                <div id="chatMenu" class="overflow-y-auto flex-1" ref="chatMenuScroll">
                    <div class="flex flex-col gap-2 p-4 flex-1">
                        <AppChatMessage v-for="(msg, index) in messages" :key="index" :message="msg?.text"
                            :isUser="msg?.isUser" :pending="msg?.pending"></AppChatMessage>

                    </div>
                </div>

                <!-- Chat input -->

                <div class=" p-4 border-t dark:border-gray-700">
                    <!--Autocomple-->

                    <AppChatSuggestions :suggestions="suggestions"
                        @suggestionSelected="(suggestion) => message = suggestion"></AppChatSuggestions>

                    <div class="flex items
                    justify-between">
                        <input type="text" placeholder="Escribe un mensaje a Isaac" v-model="message"
                            @keyup.enter="sendMessage()" :disabled="pending"
                            class="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 w-full mr-2 outline-none ring-2 ring-gray-400/20 disabled:opacity-50" />

                        <button @click="sendMessage()" :disabled="pending"
                            class="p-2 dark:text-white text-pink-600 disabled:text-gray-400">
                            <IconSend :size="25"></IconSend>
                        </button>
                    </div>
                </div>

            </div>
        </Transition>
    </div>
</template>

<script setup>
import IconChat from './icons/IconChat.vue';
import IconSend from './icons/IconSend.vue';
import AppChatHeader from './AppChatHeader.vue';
import AppChatMessage from './AppChatMessage.vue';
import AppChatSuggestions from './AppChatSuggestions.vue';
const suggestions = ['Hola', '¿Cómo estás?', 'Hablame de ti'];
import useAnimation from './composable/useAnimation';
import useChat from './composable/useChat';

const {
    messages,
    sendMessage,
    pending, message,
    chatMenuScroll,
    toggleChat,
    open
} = useChat();

const { animations } = useAnimation();

</script>

<style scoped>
#chatMenu {
    scrollbar-color: transparent transparent;
    scrollbar-width: thin;

}
</style>