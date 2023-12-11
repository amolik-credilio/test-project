import { getCurrentInstance } from 'vue'

export default function useRouter() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  return vm.proxy.$router
}
