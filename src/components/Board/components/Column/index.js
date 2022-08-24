import { forwardRef, useState } from 'react'
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
  const [itemsCount, setItemsCount] = useState(20)
  const [hasMore, setHasMore] = useState(true)
  const loadMore = () => {
    if (itemsCount >= children.cards.length) {
      setHasMore(false)
      return
    }
    setTimeout(() => {
      setItemsCount(itemsCount + 20)
    }, 100)
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
              {children.cards.length ? (
                <InfiniteScroll
                  dataLength={itemsCount}
                  scrollableTarget='scrollableDiv'
                  next={loadMore}
                  height={600}
                  hasMore={hasMore}
                  loader={null}
                  endMessage={null}
                >
                  {children.cards.slice(0, itemsCount).map((card, index) => (
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
