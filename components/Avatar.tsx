import Image from "next/image";

interface Props {
  width: number;
  height: number;
  src: string;
  alt: string;
}
const Avatar = ({ width, height, src, alt }: Props) => {
  return (
    <span className="block rounded-full overflow-hidden border border-neutral-300 h-full w-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
    </span>
  );
};
export default Avatar;
