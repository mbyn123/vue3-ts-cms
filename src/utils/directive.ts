import { DirectiveBinding } from 'vue'

export const debounce = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let timer: NodeJS.Timeout | null = null
    el.addEventListener('click', () => {
      let firstClick: Boolean = !timer

      if (firstClick) {
        binding.value()
      }
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        timer = null
        if (!firstClick) {
          binding.value()
        }
      }, 1000)
    })
  }
}
