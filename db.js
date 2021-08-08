import { BILLER_TYPE } from 'src/store/types/billers'

const db = {
  units: () => [
    {
      id: '118857d6-fcbf-4c93-8412-e18d3dba0450',
      name: 'Unit 1',
      address_id: ''
    },
    {
      id: '118857d6-fcbf-4c93-8412-e18d3dba0451',
      name: 'Unit 2',
      address_id: ''
    },
    {
      id: '118857d6-fcbf-4c93-8412-e18d3dba0452',
      name: 'Unit 3',
      address_id: ''
    },
    {
      id: '118857d6-fcbf-4c93-8412-e18d3dba0453',
      name: 'Unit 4',
      address_id: ''
    },
    {
      id: '118857d6-fcbf-4c93-8412-e18d3dba0454',
      name: 'Unit 5',
      type: ''
    }
  ],
  billers: () => [
    {
      id: '818857d6-fcbf-4c93-8412-e18d3dba0450',
      name: 'MCWD',
      type: BILLER_TYPE.WATER
    },
    {
      id: '818857d6-fcbf-4c93-8412-e18d3dba0451',
      name: 'MERALCO',
      type: BILLER_TYPE.ELECTRICITY
    },
    {
      id: '188857d6-fcbf-4c93-8412-e18d3dba0452',
      name: 'CVECO',
      type: BILLER_TYPE.ELECTRICITY
    },
    {
      id: '818857d6-fcbf-4c93-8412-e18d3dba0453',
      name: 'LEYECO',
      type: BILLER_TYPE.ELECTRICITY
    },
    {
      id: '188857d6-fcbf-4c93-8412-e18d3dba0454',
      name: 'PLDT',
      type: BILLER_TYPE.INTERNET
    }
  ],
  transactions: () => [
    {
      id: '118857d6-fcbf-4c93-8412-e18d3dba0430',
      unit: 'Unit 3',
      type: BILLER_TYPE.WATER,
      account_id: '012345567',
      biller: 'ANOTHER WATER',
      address: 'Nasipit Rd. Talamaban Cebu',
      actions: ''
    },
    {
      id: '118857d6-fcbf-4c93-8412-e18d3dba0435',
      unit: 'Unit 1',
      type: BILLER_TYPE.WATER,
      account_id: '012345567',
      biller: 'MCWD',
      address: 'Nasipit Rd. Talamaban Cebu',
      actions: ''
    },
    {
      id: '218857d6-fcbf-4c93-8412-e18d3dba0435',
      unit: 'Unit 2',
      type: BILLER_TYPE.ELECTRICITY,
      account_id: '012345567',
      biller: 'CVECO',
      address: 'Nasipit Rd. Talamaban Cebu',
      actions: ' '
    },
    {
      id: '318857d6-fcbf-4c93-8412-e18d3dba0435',
      unit: 'Unit 3',
      type: BILLER_TYPE.INTERNET,
      account_id: '012345567',
      biller: 'PLDT',
      address: 'Nasipit Rd. Talamaban Cebu',
      actions: ' '
    }
  ],
  collections: () => []
}

export default db
