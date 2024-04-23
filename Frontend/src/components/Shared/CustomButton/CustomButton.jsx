import { Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const CustomButton = (props) => {
  return (
    <Button 
      disabled={props.disabled} 
      style={{
        marginLeft: '10px', 
        border: props.border, 
        backgroundColor: props.bgColor, 
        boxShadow: props.isShadow
      }} 
      variant="contained" 
      onClick={props.onClick}
    >
      <div className='layout-row' style={{ display: 'flex', alignItems: 'center' }}>
        {props.isLoading && <CircularProgress size="12px" sx={{ color: 'white', marginRight: '10px' }} />}
        {props.icon && <div style={{ display: 'flex', marginRight: props.marginRight ?? '5px' }} className='icon'>{props.icon}</div>}
        {props.text && <Typography sx={{ color: props.textColor ?? 'white', textTransform: 'none', fontSize: props.fontSize ?? '15px', textDecoration: props.textDecoration ?? "" }}>{props.text}</Typography>}
      </div>
    </Button>
  );
};

export default CustomButton;
