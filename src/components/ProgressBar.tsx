import { Progress } from "@/components/ui/progress";

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  return <Progress value={value} className="h-2" />;
}
