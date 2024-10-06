import { Oval } from "react-loader-spinner";

interface Props {
  size?: "small" | "medium" | "big";
}

const Spinner = ({ size = "small" }: Props) => {
  let width: number = 32;
  let height: number = 32;

  if (size === "small") {
    width = 32;
    height = 32;
  } else if (size === "medium") {
    width = 96;
    height = 96;
  } else if (size === "big") {
    width = 288;
    height = 288;
  }

  return (
    <Oval
      width={width}
      height={height}
      color="#2980b9"
      secondaryColor="#8fc5ea"
    />
  );
};

export default Spinner;
