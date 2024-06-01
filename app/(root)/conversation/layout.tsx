import ItemList from '@/components/shared/item-list/ItemList'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationLayout = ({children}: Props) => {
  return (
    <><ItemList title='Conversation'>Conversation Page</ItemList>
    {children}</>
  )
}

export default ConversationLayout