import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'Nichts',
      tasks: [
        {
          description: 'HAHAHAH',
          name: 'Hier',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
