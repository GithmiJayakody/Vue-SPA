import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

export function useDarkMode() {

  function applyDark(value: boolean) {
    if (value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggleDark() {
    isDark.value = !isDark.value
    localStorage.setItem('stylecart_dark', String(isDark.value))
  }

  onMounted(() => {
    const saved = localStorage.getItem('stylecart_dark')
    if (saved === 'true') {
      isDark.value = true
    }
    applyDark(isDark.value)
  })

  watch(isDark, (val) => {
    applyDark(val)
  })

  return { isDark, toggleDark }
}