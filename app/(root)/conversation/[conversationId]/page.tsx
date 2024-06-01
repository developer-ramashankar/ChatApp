import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import React from 'react'

type Props = {}

const ConversationPerson = (props: Props) => {
  return (
    <ConversationContainer><ConversationFallback/></ConversationContainer>
  )
}

export default ConversationPerson