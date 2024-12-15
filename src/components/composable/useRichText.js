import { onBeforeUnmount, onMounted, ref } from 'vue'

import { Editor, EditorContent } from '@tiptap/vue-3'
import Color from '@tiptap/extension-color'

import extensions from '../tiptap/extensions'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import Menu from '../tiptap/menu'
export default function useRichText() {
  const editor = ref(null)
  const customMenu = new Menu(editor).getMenu()
  onMounted(() => {
    editor.value = new Editor({
      content: `
          <p>
            Hello World! 🌎️
          </p>
        `,
      extensions: [
        Document,
        Text,
        Paragraph,
        Bold,
        Italic,
        Strike,
        extensions().customHeading, // add custom heading
        TextStyle,
        Color, // add custom color
        Image
      ]
    })
  })

  onBeforeUnmount(() => {
    editor.value.destroy()
  })
  return {
    editor,
    EditorContent,
    customMenu
  }
}
