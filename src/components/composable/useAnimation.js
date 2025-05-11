import { gsap } from 'gsap'
export default function useAnimation() {
  const animations = {
    expandedFromBottom: {
      beforeEnter: (el) => {
        el.style.height = '0px'
        el.style.overflow = 'hidden'
        el.style.opacity = '0'
      },
      enter: (el, done) => {
        gsap.to(el, {
          height: `35rem`,
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            el.style.height = '35rem'
            el.style.overflow = 'visible'
            done()
          }
        })
      },
      leave: (el, done) => {
        el.style.overflow = 'hidden'
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          onComplete: done
        })
      }
    }
  }

  return {
    animations
  }
}
