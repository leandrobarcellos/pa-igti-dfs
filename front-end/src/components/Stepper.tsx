import React, {useEffect} from 'react';
import {makeStyles, Theme, createStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {StepIconProps} from '@material-ui/core/StepIcon';

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props: StepIconProps) {
    const classes = useQontoStepIconStyles();
    const {active, completed} = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed}/> : <div className={classes.circle}/>}
        </div>
    );
}

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const {active, completed} = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <SettingsIcon/>,
        2: <GroupAddIcon/>,
        3: <VideoLabelIcon/>,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

function getConfiguredSteps(steps: []) {
    return [...steps];
}


export default function CustomizedSteppers(props: any) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getConfiguredSteps(props.steps);
    let stepReg: any;

    useEffect(() => {
    }, []);

    const makeStepReg = () => {
        if (!stepReg) {
            stepReg = {} as any;
            for (let s in props.children) {
                stepReg[s] = {
                    title: props.steps && props.steps.length > s? props.steps[s]: "No Title Defined",
                    content: props.children[s]
                };

            }
        }
    }

    makeStepReg();

    const onNext = (step: number) => {
        if(!isLastStep()){
            props.onNext(step);
        } else{
            props.onFinish(step);
        }
    }
    const onPrevious = (step: number) => {
        props.onPrevious(step);
    }

    const getStepContent = (step: number) => {
        let content = stepReg[step].content;
        if(!content) {
            content = 'Unknown step';
        }
        return content;
    }

    const handleNext = () => {
        let step = activeStep? activeStep: 0;
        onNext(step);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        onPrevious(activeStep);
    };

    const handleReset = (e: any) => {
        setActiveStep(0);
        props.onReset(e);
    };

    let isLastStep = function () {
        return activeStep === steps.length - 1;
    };

    return (
        <div className={classes.root}>

            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector/>}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Todos os passos foram concluídos.
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reiniciar
                        </Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div style={{marginTop: "30px", paddingBottom: "30px"}}>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Voltar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {isLastStep() ? 'Terminar' : 'Próximo'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
