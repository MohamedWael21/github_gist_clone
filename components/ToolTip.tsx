import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
  text: string;
  position?: "right" | "left" | "bottom" | "top";
}
const ToolTip = ({ children, text, position = "bottom" }: Props) => {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={position}
          className="bg-neutral-700 text-white rounded-lg"
        >
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default ToolTip;
