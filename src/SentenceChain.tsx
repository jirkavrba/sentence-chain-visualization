import Message from "./SentenceChain/Message"

export interface MessageSource {
  username: string,
  avatar: string,
  content: string
}

export interface SentenceChainProps {
  messages: Array<MessageSource>
}

const SentenceChain: React.FC<SentenceChainProps> = ({messages}: SentenceChainProps) => {
  return <>
    <div>
      {messages.map((message, i) => <Message key={i} source={message}/>)}
    </div>
  </>
}

export default SentenceChain;