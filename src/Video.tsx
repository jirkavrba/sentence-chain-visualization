import { useEffect, useState } from 'react'
import { Composition, continueRender, delayRender } from 'remotion';
import SentenceChain, { MessageSource } from './SentenceChain';

export const RemotionVideo: React.FC = () => {

	const [messages, setMessages] = useState<Array<MessageSource> | undefined>();
	const [handle] = useState(() => delayRender());

	useEffect(() => {
		import("../_messages.json").then(messages => {
			setMessages(Array.from(messages));
			continueRender(handle);
		})
	}, []);

	return (
		<>
			<Composition
				id="sentence-chain"
				component={SentenceChain}
				durationInFrames={(messages?.length ?? 1) * 30}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{ messages: messages ?? [] }}
			/>
		</>
	);
};
