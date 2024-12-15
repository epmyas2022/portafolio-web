import { ref } from 'vue'
export default class Menu {
  constructor(editor) {
    this.editor = editor

    this.customMenu = ref([
      {
        name: 'bold',
        label: 'Bold',
        icon: 'mdi mdi-format-bold',
        class: '',
        clicked: () => {
          editor.value.chain().focus().toggleBold().run()
        }
      },

      {
        name: 'italic',
        label: 'Italic',
        icon: 'mdi mdi-format-italic',
        class: '',
        clicked: () => {
          editor.value.chain().focus().toggleItalic().run()
        }
      },

      {
        name: 'strike',
        label: 'Strike',
        icon: 'mdi mdi-format-strikethrough-variant',
        class: '',
        clicked: () => {
          editor.value.chain().focus().toggleStrike().run()
        }
      },

      {
        name: 'heading1',
        label: 'Heading 1',
        icon: 'mdi mdi-format-header-1',
        class: '',
        clicked: () => {
          //use custom heading extension
          editor.value
            .chain()
            .focus()
            .toggleHeading({ level: 1, class: 'lg:text-2xl text-lg' })
            .run()
        }
      },

      {
        name: 'heading2',
        label: 'Heading 2',
        icon: 'mdi mdi-format-header-2',
        class: '',
        clicked: () => {
          editor.value.chain().focus().toggleHeading({ level: 2, class: "text-xl" }).run()
        }
      },

      {
        name: 'heading3',
        label: 'Heading 3',
        icon: 'mdi mdi-format-header-3',
        class: '',
        clicked: () => {
            editor.value.chain().focus().toggleHeading({ level: 2, class: "text-lg" }).run()
        }
      },

      {
        name: 'heading4',
        label: 'Heading 4',
        icon: 'mdi mdi-format-header-4',
        class: '',
        clicked: () => {
            editor.value.chain().focus().toggleHeading({ level: 2, class: "text-base" }).run()
        }
      },

      {
        name: 'color',
        label: 'Color Pink',
        icon: 'mdi mdi-palette',
        class: 'text-pink-600',
        clicked: () => {
          //use  custom extension changeColorText
          editor.value.chain().focus().setColor('#DB2777').run()
        }
      },

      {
        name: 'image',
        label: 'Upload Image',
        icon: 'mdi mdi-image-area',
        class: '',
        clicked: () => {
          const url = window.prompt('URL to image')

          if (url) {
            editor.value.chain().focus().setImage({ src: url }).run()
          }
        }
      }
    ])
  }

  getMenu() {
    return this.customMenu
  }

  setItemMenu(item) {
    this.customMenu.value.push(item)
  }

  setMenu(menu) {
    this.customMenu = menu
  }
}
