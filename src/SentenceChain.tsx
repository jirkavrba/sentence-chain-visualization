import { Audio, Loop} from 'remotion'
import { AbsoluteFill, Series } from "remotion";
import Message from "./SentenceChain/Message";
import Intro from "./SentenceChain/Intro";
import music from "./assets/warm-breeze-extended-version.mp3";

export interface MessageSource {
  username: string,
  avatar: string,
  content: string
}

export interface SentenceChainProps {
  messages: Array<MessageSource>
}

const SentenceChain: React.FC<SentenceChainProps> = ({ messages }: SentenceChainProps) => {
  return <>
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <Loop durationInFrames={3360}>
        <Audio src={music} />
      </Loop>
      <Series>
        <Series.Sequence durationInFrames={250}>
          <Intro />
        </Series.Sequence>
        {messages.map((message, i) =>
          <Series.Sequence key={i} durationInFrames={10 + Math.floor(message.content.length * 2)}>
            <Message source={message} index={i} duration={10 + Math.floor(message.content.length * 2)} />
          </Series.Sequence>
        )}
      </Series>
    </AbsoluteFill>
  </>
}

export default SentenceChain;