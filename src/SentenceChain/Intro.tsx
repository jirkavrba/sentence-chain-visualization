import { Gif } from "@remotion/gif";
import { AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

const Intro: React.FC = () => {

  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 240, 250], [1, 1, 0]);

  return <AbsoluteFill style={{backgroundColor: "#75b0e3", display: "flex", flexFlow: "colum nowrap", alignItems: "center", justifyContent: "center", opacity}}>
    <Gif src="https://cdn.discordapp.com/icons/683633975838769192/a_a78fc28e67c79d44579ced43c779116c.gif?size=256" width={256} height={256} />
  </AbsoluteFill>
};

export default Intro;