import Heading from '@tiptap/extension-heading'
export default function extensions() {
  const customHeading = Heading.extend({
    // add size font if level 1 and else if level 2
    addAttributes() {
      return {
        ...this.parent?.(),
        class: {
          default: null,
          parseHTML: (element) => {
            return {
              class: element.className
            }
          },
          renderHTML: (attributes) => {
            return {
              class: attributes.class
            }
          }
        },
        size: {
          default: null,
          parseHTML: (element) => {
            return {
              size: element.style.fontSize
            }
          },
          renderHTML: (attributes) => {
            return {
              style: `font-size: ${attributes.size}`
            }
          }
        }
      }
    },

    // add size font if level 1 and else if level 2

    parseHTML() {
      return [
        {
          tag: 'h1'
        },
        {
          tag: 'h2'
        },
        {
          tag: 'h3'
        },
        {
          tag: 'h4'
        }
      ]
    }
  })
  return {
    customHeading
  }
}
