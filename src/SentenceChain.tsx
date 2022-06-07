import {AbsoluteFill, Sequence} from 'remotion'
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
    <AbsoluteFill style={{backgroundColor: "#ffffff"}}>
      {messages.map((message, i) => 
        <Sequence from={i * 30} durationInFrames={30}>
          <Message key={i} source={message} index={i}/>
        </Sequence>
      )}
    </AbsoluteFill>
  </>
}

export default SentenceChain;