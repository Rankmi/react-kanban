import { render } from 'react-dom'
import Board from '../src'
import getUrlParams from './services/getUrlParams'
import '../src/styles.scss'

const aux2 = (cards) => {
  const result = []
  for (let index = 1; index <= cards; index++) {
    result.push({
      id: index,
      title: `Card title ${index}`,
      description: 'Card content',
      column: Math.floor(Math.random() * (4 - 1) + 1),
    })
  }

  return [
    {
      id: 1,
      title: 'Column 1',
      cards: result.filter(({ column }) => column === 1),
    },
    {
      id: 2,
      title: 'Column 2',
      cards: result.filter(({ column }) => column === 2),
    },
    {
      id: 3,
      title: 'Column 3',
      cards: result.filter(({ column }) => column === 3),
    },
  ]
}

const board = {
  columns: [
    {
      id: '0206c8d7-4d48-4d97-b867-86fc2d21074d',
      title: 'Column Backlog',
      cards: [
        {
          id: '0206c8d7-4d48-4d97-b867-86fc2d21075d',
          title: 'Card title 1',
          description: 'Card content',
        },
        {
          id: 2,
          title: 'Card title 2',
          description: 'Card content',
        },
        {
          id: 3,
          title: 'Card title 3',
          description: 'Card content',
        },
        {
          id: 4,
          title: 'Card title 4',
          description: 'Card content',
        },
        {
          id: 5,
          title: 'Card title 5',
          description: 'Card content',
        },
        {
          id: 6,
          title: 'Card title 6',
          description: 'Card content',
        },
        {
          id: 7,
          title: 'Card title 7',
          description: 'Card content',
        },
        {
          id: 8,
          title: 'Card title 8',
          description: 'Card content',
        },
      ],
    },
    {
      id: 2,
      title: 'Column Doing',
      cards: [
        {
          id: 9,
          title: 'Card title 9',
          description: 'Card content',
        },
      ],
    },
  ],
}

render(
  <Board
    {...getUrlParams()}
    onColumnRemove={console.log}
    onColumnRename={console.log}
    onCardRemove={console.log}
    initialBoard={{ columns: aux2(500) }}
  />,
  document.getElementById('app')
)
