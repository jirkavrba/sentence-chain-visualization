import styled from "styled-components";
import { AbsoluteFill, Img } from "remotion";
import { MessageSource } from "../SentenceChain"

export interface MessageProps {
  source: MessageSource,
  index: number
}

const Message: React.FC<MessageProps> = ({ source: { username, avatar, content }, index }: MessageProps) => {

  const Container = styled.div`
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    padding: 30px;
  `;

  const Header = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  `;

  const Username = styled.h1`
    color: #000000;
    font-family: 'Arial', sans-serif;
    font-size: 50px;
    margin-left: 30px;
  `;

  const Content = styled.p`
    color: #555555;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    font-size: 60px;
    max-width: 80%;
    text-align: center;
  `;

  const colors = [
    "#EF4444",
    "#F59E0B",
    "#84CC16",
    "#10B981",
    "#06B6D4",
    "#6366F1",
    "#D946EF"
  ];

  const start = colors[index % colors.length];
  const end = colors[(index + 1) % colors.length];
  const words = content.trim().split(/(\s+|[,.])/);

  const renderWord = (word: string, index: number, total: number) => {
    if (index === 0) {
      return <span style={{color: start}}>{word[0].toUpperCase()}{word.substring(1)}</span>
    }

    if (index === total - 1) {
      return <span style={{color: end}}>{word}</span>
    }

    return <span>{word}</span>
  };

  return (
    <AbsoluteFill>
      <Container>
        <Header>
          <Img src={avatar} style={{ width: 100, height: 100, borderRadius: "50%" }} />
          <Username>{username}</Username>
        </Header>
        <Content>
          {words.map((word, i) => renderWord(word, i, words.length))}
        </Content>
      </Container>
    </AbsoluteFill>
  );
}

export default Message;