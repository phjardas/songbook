import { Tooltip, type TooltipProps } from '@mui/material';

export default function NoprintTooltip(props: TooltipProps) {
  return <Tooltip slotProps={{ popper: { sx: { '@media print': { display: 'none' } } } }} {...props} />;
}
