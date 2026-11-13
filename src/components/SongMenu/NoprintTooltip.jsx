import { Tooltip } from '@mui/material';

export default function NoprintTooltip(props) {
  return <Tooltip slotProps={{ popper: { sx: { '@media print': { display: 'none' } } } }} {...props} />;
}
