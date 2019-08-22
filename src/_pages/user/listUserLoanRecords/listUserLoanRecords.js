import React from 'react'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center'
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    table: {
        minWidth: 650,
        width: '100%',
    },
    progress: {
        margin: theme.spacing(2),
    },
    cardLabel: {
        border: '1px dashed',
        borderColor: 'green',
        textAlign: 'center'
    },
}))

var loanRequestInfo = {
    weid: '',
    amount: '',
    rate: '',
    expiredDate: '',
    createdTime: '',
}

function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    )
}

// 用户借贷记录列表
export function ListUserLoanRecords(props) {

    const createData = (weid, amount, rate, duration, createdTime) => {
        return { weid, amount, rate, duration, createdTime }
    }

    // const rows = [
    //     createData(`did:weid:1:0xa4a3be6469d4d59747c3f5da320af37c045a3441`, 10000, '0.4%', '三个月', '2019-08-01'),
    //     createData(`did:weid:1:0x02d37251f31f2dc205abef81d2c674de425f1781`, 20000, '0.5%', '三个月', '2019-08-02'),
    //     createData(`did:weid:1:0x5ef98d1c967f869f8f2c19eadfabd847b346e21c`, 50000, '0.6%', '六个月', '2019-08-03'),
    // ]

    const classes = useStyles()

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = (row) => {
        setOpen(true)
        loanRequestInfo = row
    }

    const handleClose = () => {
        setOpen(false)
    }

    let rows = []
    props.listUserLoanRecordsAsync("did:weid:1:0x73e0d1d0f3d87b1385d104a470f2fa0ab46dbc49")
    if (props.listUserLoanRecords !== undefined) {
        rows = props.listUserLoanRecords
    }

    return (
        <div>
            <h2 className={classes.title}>借贷记录列表</h2>
            <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">借贷日期</TableCell>
                                <TableCell align="center">借贷金额</TableCell>
                                <TableCell align="center">日利率</TableCell>
                                <TableCell align="center">还款期限</TableCell>
                                <TableCell align="center">还款日期</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow>
                                    <TableCell align="center">
                                        {row.createdTime}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.amount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.dailyRate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.durationMonth}个月
                                    </TableCell>
                                    <TableCell align="center">
                                    {row.status === 1 ? "未还款" : row.status === 3 ? <div style={{ color: 'red' }}>已超时</div> : row.status === 5? <div style={{ color: 'red' }}>已入黑名单</div>: "未还款"}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="primary" onClick={() => handleClickOpen && handleClickOpen(row)}>查看记录</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperComponent={PaperComponent}
                        aria-labelledby="draggable-dialog-title"
                        maxWidth={100}
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            <Typography align="center" variant="h6">借贷记录详情</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3}>数字身份</TableCell>
                                    <TableCell align="right">
                                        <Typography className={classes.cardLabel}>
                                            <div style={{ color: 'green' }}>{loanRequestInfo.weid}</div>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>借贷金额</TableCell>
                                    <TableCell align="right">{loanRequestInfo.amount}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>日利率</TableCell>
                                    <TableCell align="right">{loanRequestInfo.dailyRate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>借贷日期</TableCell>
                                    <TableCell align="right">{loanRequestInfo.effectiveTime}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>还款期限</TableCell>
                                    <TableCell align="right">{loanRequestInfo.durationMonth}个月</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>最晚还款日期</TableCell>
                                    <TableCell align="right">{loanRequestInfo.endTime}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>应还金额</TableCell>
                                    <TableCell align="right">10323.5</TableCell>
                                </TableRow>
                            </TableBody>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="secondary" align="right">
                                还款
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Container>
        </div>
    )

}