import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BalanceTable from "./BalanceTable";
//import MonthSelect from "./MonthSelect";
//import SavingsGoal from "./SavingsGoal";

import { Grid, Button, TextField } from "@mui/material";
export default function () {

    const userId = sessionStorage.getItem("userToken");

    const currentBOM = () => {
        const current = new Date();
        return new Date(current.getFullYear(), current.getMonth(), 1);
    };

    const currentEOM = () => {
        const current = new Date();
        return new Date(current.getFullYear(), current.getMonth() + 1, 0);
    };

    const [activity, setActivity] = useState([]);
    const [currentBalance, setCurrentBalance] = useState(0.0);
    const [startBalance, setStartBalance] = useState(0.0);
    const [startDate, setStartDate] = useState(currentBOM());
    const [endDate, setEndDate] = useState(currentEOM());

    const calculateCurrentBalance = (activity) => {
        const dateTime = new Date();

        //const currentActivity = activity.filter(
            //(rec) => rec.filterDate.getTime() <= dateTime.getTime()
        //);

        setCurrentBalance(
            currentActivity
                .map((rec) => rec.amount)
                .reduce((total, current) => total + current)
        );
    };

    /*const calculateStartBalance = (activity) => {
        const currentActivity = activity.filter(
            (rec) => rec.filterDate.getTime() < startDate.getTime()
        );

        const amounts = currentActivity.map((rec) => rec.amount);

        if (amounts.length === 0) {
            setStartBalance(0.0);
        } else {
            setStartBalance(amounts.reduce((total, current) => total + current));
        }
    };

    const calculateCurrentMonthStartBalance = (activity) => {
        const currentActivity = activity.filter(
            (rec) => rec.filterDate.getTime() < new Date().getTime()
        );

        const amounts = currentActivity.map((rec) => rec.amount);

        if (amounts.length === 0) {
            return 0;
        }
        return amounts.reduce((total, current) => total + current);
    };*/

    useEffect(() => {
        fetch("http://localhost:8080/users/" + userId + "/statements", {
            method: "GET",
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    return null;
                }
            })
            /*then((res) => {
                res.forEach((row) => {
                    row.filterDate = new Date(row.date);
                });
                setActivity(res);
                calculateCurrentBalance(res);
                calculateStartBalance(res);
            });*/
    }, []);

    //useEffect(() => {
        //calculateStartBalance(activity);
    //}, [startDate, endDate]);

    return (<><div>
        <form>
            <Grid container rowSpacing={1}>
                <h2>Balance Estimator</h2>
                <Grid item xs={12}>
                    <h3>Current Balance</h3>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        variant="outlined"
                        placeholder="Amount"
                    ></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        variant="outlined"
                        placeholder="Date"
                    ></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        variant="outlined"
                        placeholder="Description"
                    ></TextField>
                </Grid>
                <Grid item xs={12}>
                    <label>
                        <input
                            type="radio"
                            name="up check"
                            value="Planned" />
                        Planned
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="up check"
                            value="Unplanned" />
                        Unplanned
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    </div>
        <Box sx={{ width: "100%" }}>
                <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                    <BalanceTable
                        activity={activity}
                        startBalance={startBalance}
                        startDate={startDate}
                        endDate={endDate}
                        addDel={true}
                    />
            </Box>
        </Box></>   )

}
