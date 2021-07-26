import { api } from '../boot/axios'

export function getUnits () {
  return api.get('/units')
}
