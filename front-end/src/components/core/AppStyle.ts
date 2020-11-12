import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


export class AppStyle {
    static readonly useStyles = makeStyles((theme: Theme) =>
        createStyles({
            link: {
              cursor: "pointer"
            },
            table: {
                minWidth: 650,
            },
            actionIcon: {
                cursor: "pointer"
            },
            actionColumn: {
                width: 5
            },
            loginCard: {
                maxWidth: '100%',
                ['@media (min-width: 500px)']: {maxWidth: '25%'},
            },
            transferList: {
                ['@media (min-width: 500px)']: {
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignItems: "center"
                }
            },
            transferButton: {
                ['@media (min-width: 300px)']: {
                    width: '15px',
                }
            },
            root: {
                width: '100%',
                margin: 'auto',
            },
            button: {
                marginRight: theme.spacing(1),
                margin: theme.spacing(0.5, 0),
                marginTop: 15
            },
            instructions: {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: "100%",
                width: "100%",
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
            selectClass: {
                minWidth: "100%",
                width: "100%",
            },
            paper: {
                ['@media (min-width: 280px)']: {
                    width: 240
                },
                ['@media (min-width: 320px)']: {
                    width: 280
                },
                ['@media (min-width: 360px)']: {
                    width: 320
                },
                ['@media (min-width: 375px)']: {
                    width: 335
                },
                ['@media (min-width: 450px)']: {
                    width: 280
                },
                width: 300,
                height: 230,
                overflow: 'auto',
            },
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            modalPaper: {
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },
        }),
    );

}
