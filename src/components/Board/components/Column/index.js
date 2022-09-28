import { forwardRef, useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'
import { pickPropOut } from '@services/utils'
import InfiniteScroll from 'react-infinite-scroll-component'

const ColumnEmptyPlaceholder = forwardRef((props, ref) => (
  <div ref={ref} style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />
))

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder)

function Column({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  onCardNew,
  allowAddCard,
}) {
  const [data, setData] = useState({ itemsCount: 0, hasMore: true })
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(false)
    setData({ itemsCount: 20, hasMore: true })
    setTimeout(() => {
      setShow(true)
    }, 100)
  }, [children.cards])

  const loadMore = () => {
    if (data.itemsCount >= children.cards.length) {
      setData({ ...data, hasMore: false })
      return
    }
    setTimeout(() => {
      setData({ hasMore: true, itemsCount: data.itemsCount + 20 })
    }, 50)
  }
  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided) => {
        const draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style')
        return (
          <div
            id='scrollableDiv'
            ref={columnProvided.innerRef}
            {...draggablePropsWithoutStyle}
            style={{
              height: '100%',
              overflowY: 'auto',
              minHeight: '28px',
              display: 'inline-block',
              verticalAlign: 'top',
              ...columnProvided.draggableProps.style,
            }}
            className='react-kanban-column'
            data-testid={`column-${children.id}`}
          >
            <div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>

            {allowAddCard && <CardAdder column={children} onConfirm={onCardNew} />}
            <DroppableColumn key={String(children.id)} droppableId={String(children.id)}>
              {show && children.cards.length ? (
                <InfiniteScroll
                  dataLength={data.itemsCount}
                  scrollableTarget='scrollableDiv'
                  next={loadMore}
                  height={600}
                  hasMore={data.hasMore}
                  loader={<div />}
                  endMessage={null}
                >
                  {children.cards.slice(0, data.itemsCount).map((card, index) => (
                    <Card
                      key={card.id}
                      index={index}
                      renderCard={(dragging) => renderCard(children, card, dragging)}
                      disableCardDrag={disableCardDrag}
                    >
                      {card}
                    </Card>
                  ))}
                </InfiniteScroll>
              ) : (
                <div className='react-kanban-card-skeleton' />
              )}
            </DroppableColumn>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Column
