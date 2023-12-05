import { useContext } from '@nuxtjs/composition-api'
import { Ref, isRef, ref, unref, watch } from 'vue'

export const fetchData = <T>(url: string | Ref<string>) => {
  const { $axios } = useContext()

  const response = ref<T | null>(null)
  const fetching = ref<Boolean>(true)

  const fetch = async () => {
    fetching.value = true
    try {
      const res = await $axios.get(unref(url))
      response.value = res.data
    } catch (error) {
      alert(error)
    }
    fetching.value = false
  }

  if (isRef(url)) {
    watch(url, fetch)
  }

  fetch()

  return {
    response,
    fetching,
  }
}
