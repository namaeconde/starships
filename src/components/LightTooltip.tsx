import { color } from '../theme';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: color.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: 1,
    fontSize: 11,
  },
}));

export default LightTooltip