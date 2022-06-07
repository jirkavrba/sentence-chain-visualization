import styled from "styled-components";
import {AbsoluteFill, Sequence, Series} from "remotion";
import Message from "./SentenceChain/Message";

export interface MessageSource {
  username: string,
  avatar: string,
  content: string
}

export interface SentenceChainProps {
  messages: Array<MessageSource>
}

const SentenceChain: React.FC<SentenceChainProps> = ({messages}: SentenceChainProps) => {

  const Footer = styled.footer`
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    color: #aaaaaa;
    font-family: monospace;
    font-size: 20px;
  `;

  return <>
    <AbsoluteFill style={{backgroundColor: "#ffffff"}}>
      <Series>
      {messages.map((message, i) => 
        <Series.Sequence durationInFrames={message.content.length * 2}>
          <Message key={i} source={message} index={i} duration={message.content.length * 2}/>
        </Series.Sequence>
      )}
      </Series>
      <Footer>Rendered on {new Date().getDate()}. {new Date().getMonth()}. {new Date().getFullYear()}</Footer>
    </AbsoluteFill>
  </>
}

export default SentenceChain;