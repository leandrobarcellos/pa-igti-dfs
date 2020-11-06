import React, {useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {AppStyle} from "../core/AppStyle";
import {Button} from "@material-ui/core";

type Action = (e: any) => void;
export default function TransitionsModal(props: {
    confirmAction?: Action;
    confirmLabel?: string;
    cancelAction?: Action;
    cancelLabel?: string;
    title: string;
    message: string;
    open: boolean;
}) {

    const classes = AppStyle.useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = (e: any) => {
        if (props.confirmAction)
            props.confirmAction(e);
        handleClose();
    }

    const handleCancel = (e: any) => {
        if (props.cancelAction)
            props.cancelAction(e);
        handleClose();
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div>
                    <div className={classes.modalPaper}>
                        <h2 id="transition-modal-title">{props.title}</h2>
                        <p id="transition-modal-description">{props.message}</p>
                    </div>
                    {props.confirmAction ? <Button onClick={handleConfirm}>
                        {props.confirmLabel}
                    </Button> : <></>}
                    {props.cancelAction ? <Button onClick={handleCancel}>
                        {props.cancelLabel}
                    </Button> : <></>}
                </div>
            </Fade>
        </Modal>
    );
}
