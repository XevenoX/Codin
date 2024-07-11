import React, { useState } from 'react';
import { Typography, TextField, Grid, Tooltip } from '@mui/material';

const EditableText = ({ label, type, value, onChange, multiline = false }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Grid container alignItems="center" spacing={2} onClick={() => setIsEditing(true)} onBlur={() => setIsEditing(false)}>
            <Grid item xs={4} md={3} hidden={type == 1 ? 0 : 1} >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {label}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} mb={'10px'} hidden={type == 0 ? 0 : 1} >
                <Tooltip title="Click to edit content" placement="top" arrow>
                    {isEditing ? (
                        <TextField
                            variant="standard"
                            fullWidth
                            multiline={multiline}
                            autoFocus
                            value={value}
                            onChange={onChange}
                            onBlur={() => setIsEditing(false)}
                        />
                    ) : (
                        <Typography variant="body1" sx={{ cursor: 'text', whiteSpace: 'pre-wrap', color: 'black' }}>{value}</Typography>
                    )}
                </Tooltip>
            </Grid>
            <Grid item xs={8} md={9} hidden={type == 1 ? 0 : 1} >
                <Tooltip title="Click to edit content" placement="top" arrow>
                    {isEditing ? (
                        <TextField
                            variant="standard"
                            fullWidth
                            multiline={multiline}
                            autoFocus
                            value={value}
                            onChange={onChange}
                            onBlur={() => setIsEditing(false)}
                        />
                    ) : (
                        <Typography variant="body1" sx={{ cursor: 'text', whiteSpace: 'pre-wrap', color: 'blue' }}>{value}</Typography>
                    )}
                </Tooltip>
            </Grid>
        </Grid >
    );
};

export default EditableText;