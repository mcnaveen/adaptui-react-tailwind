import { runIfFn } from "@chakra-ui/utils";

import {
  ActiveStatusIcon,
  AwayStatusIcon,
  SleepStatusIcon,
  TimelessIcon,
  TypingLargeStatusIcon,
  TypingSmallStatusIcon,
} from "../icons";
import { useTheme } from "../theme";
import { passProps, tcm } from "../utils";

import { AvatarUIProps } from "./AvatarProps";

export const AvatarDefaultStatusIndicators = (props: AvatarUIProps) => {
  const { size, status, parentsBackground } = props;

  const theme = useTheme("avatar");
  const className = tcm(
    theme.statusIndicators[status].common,
    theme.statusIndicators[status].size[size],
    ...parentsBackground,
  );

  return passProps(runIfFn(<StatusIndicators {...props} />), { className });
};

export type StatusIndicatorsProps = AvatarUIProps & {
  className?: string;
};

export const StatusIndicators: React.FC<StatusIndicatorsProps> = props => {
  const { status, size, className } = props;

  if (status === "active") return <ActiveStatusIcon className={className} />;
  if (status === "sleep") return <SleepStatusIcon className={className} />;
  if (status === "away") return <AwayStatusIcon className={className} />;

  if (status === "typing")
    return ["xs", "sm", "md"].includes(size) ? (
      <TypingSmallStatusIcon className={className} />
    ) : (
      <TypingLargeStatusIcon className={className} />
    );

  if (status === "org") return <TimelessIcon />;

  return null;
};
