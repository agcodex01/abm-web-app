export const BILLER_TYPE = {
  ALL: 'ALL',
  ELECTRICITY: 'ELECTRICITY',
  INTERNET: 'INTERNET',
  WATER: 'WATER'
}

export function getBillerTypes () {
  return [
    BILLER_TYPE.ALL,
    BILLER_TYPE.ELECTRICITY,
    BILLER_TYPE.INTERNET,
    BILLER_TYPE.WATER
  ]
}
