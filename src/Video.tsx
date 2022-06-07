import { useEffect, useState } from 'react'
import { Composition, continueRender, delayRender } from 'remotion';
import SentenceChain, { MessageSource } from './SentenceChain';

export const RemotionVideo: React.FC = () => {

	const [messages, setMessages] = useState<Array<MessageSource> | undefined>();
	const [duration, setDuration] = useState<number>(1);
	const [handle] = useState(() => delayRender());

	useEffect(() => {
		import("../_messages.json").then(messages => {
			const converted = Array.from(messages)
				.map(message => ({...message, content: message.content.replace(/<(a:)?:.*:\d+>/, "") }))
				.filter(message => message.content.trim().length !== 0)
				.slice(0, 100);
				
			const duration = converted.reduce((sum, message) => sum + message.content.length, 0);

			setMessages(converted);
			setDuration(duration);
			continueRender(handle);
		})
	}, [handle]);

	return (
		<>
			<Composition
				id="sentence-chain"
				component={SentenceChain}
				durationInFrames={duration}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{ messages: messages ?? [] }}
			/>
		</>
	);
};
