import { ref } from 'vue'

export default function (url: string) {
  const response = ref([])
  const errors = ref([])
  const fetching = ref<boolean>(false)

  const fetchData = async () => {
    try {
      const res = await fetch(url)
      const json = await res.json()
      response.value = json
    } catch (error: any) {
      errors.value = error
    } finally {
      fetching.value = false
    }
  }

  return {
    response,
    fetching,
    fetchData,
  }
}
