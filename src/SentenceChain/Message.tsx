import { Img } from "remotion";
import { MessageSource } from "../SentenceChain"

export interface MessageProps {
  source: MessageSource
}

const Message: React.FC<MessageProps> = ({source: {username, avatar, content}}: MessageProps) => {
  return <>
    <Img src={avatar} />
    <h1>{username}</h1>
    <p>{content}</p>
  </>
}

export default Message;