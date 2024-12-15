import gsap from 'gsap'

export default function useModal(props) {
  const modalAnimatedClose = () => {
    const modal = document.getElementById('modal')
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.style.display = 'none'
      }
    })
  }

  const modalAnimatedOpen = () => {
    const modal = document.getElementById('modal')
    modal.style.display = 'flex'
    gsap.to(modal, {
      opacity: 1,
      duration: 0.3
    })
  }
  const close = () => {
    if (props?.closable()) return
    modalAnimatedClose()
  }

  const ok = () => {
    if (props?.ok()) return
    modalAnimatedClose()
  }

  return {
    modalAnimatedClose,
    modalAnimatedOpen,
    close,
    ok
  }
}
