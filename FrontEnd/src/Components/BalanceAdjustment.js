import React from "react";

import { Grid, Button, TextField } from "@mui/material";
export default function () {
    return (<div>
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
                        placeholder="Reason"
                    ></TextField>
                </Grid>
                <Grid item xs={12}>
                    <label>
                        <input
                            type="radio"
                            name="up check"
                            value="Planned"
                        />
                        Planned
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="up check"
                            value="Unplanned"
                        />
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
    </div>)
}
