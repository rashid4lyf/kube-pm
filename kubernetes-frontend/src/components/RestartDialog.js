import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";

function RestartDialog(props) {

    const {onClose, selectedValue, open} = props;

    const handleClose = (e) => {
        onClose(e.currentTarget.value, selectedValue);
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                <Typography align="center" fontSize={16} fontWeight={"600"}>Confirm Deployment
                    Restart</Typography></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Please confirm you wish to restart {selectedValue} deployment?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color={"error"} value={"cancel"}>Cancel</Button>
                <Button onClick={handleClose} color={"success"} value={"confirm"}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RestartDialog;