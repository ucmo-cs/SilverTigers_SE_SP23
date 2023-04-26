import { toLocalDate } from "../Util/DateUtil";

export function calculateCurrentBalance(activity) {
  const dateTime = new Date();

  const currentActivity = activity.filter(
    (rec) => rec.filterDate.getTime() <= dateTime.getTime()
  );
  if (currentActivity.length === 0) {
    return 0.0;
  }
  return currentActivity
    .map((rec) => rec.amount)
    .reduce((total, current) => total + current);
}

export function calculateStartBalance(activity, startDate) {
  const currentActivity = activity.filter(
    (rec) => rec.filterDate.getTime() < startDate.getTime()
  );

  const amounts = currentActivity.map((rec) => rec.amount);

  if (amounts.length === 0) {
    return 0.0;
  } else {
    return amounts.reduce((total, current) => total + current);
  }
}

/**
 *
 * @param {*} userToken The user id
 * @param {*} aggregate Function with parameter for activity to call after API returns activity
 */
export function getUserActivity(userToken, aggregate) {
  fetch("http://localhost:8080/users/" + userToken + "/statements", {
    method: "GET",
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then((activity) => {
      activity.forEach((row) => {
        row.filterDate = toLocalDate(row.date);
      });
      aggregate(activity);
    });
}

export function getCurrentBalance(userToken, setCurrentBalance) {
  const aggregate = (activity) =>
    setCurrentBalance(calculateCurrentBalance(activity));
  getUserActivity(userToken, aggregate);
}

export function setupUserActivity(
  userToken,
  startDate,
  setActivity,
  currentBalanceDispatch,
  startBalanceDispatch
) {
  const aggregate = (activity) => {
    setActivity(activity);
    currentBalanceDispatch({ activity });
    startBalanceDispatch({ activity, startDate });
  };
  getUserActivity(userToken, aggregate);
}

export function deleteUserActivity(ids, activity) {
  fetch("http://localhost:8080/statements", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  }).then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  });

  let reducedActivity = activity;

  ids.forEach((id) => {
    let statementIdx = activity.findIndex((statement) => statement.id === id);
    if (statementIdx !== -1) {
      reducedActivity.splice(statementIdx, 1);
    }
  });

  return reducedActivity;
}

export function addStatement(
  userToken,
  statement,
  activity,
  setActivity,
  currentBalanceDispatch
) {
  fetch("http://localhost:8080/users/" + userToken + "/statement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statement),
  })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      } else {
        return null;
      }
    })
    .then((statement) => {
      if (statement === null) {
        alert("unable to submit expense");
        return;
      }
      statement.filterDate = toLocalDate(statement.date);
      let newActivity = activity.concat(statement);

      setActivity(newActivity);
      currentBalanceDispatch({ activity: newActivity });
    });
}

export function getUserSavingsGoal(usertoken, setSavingsGoal) {
  fetch("http://localhost:8080/bankuser/" + usertoken + "/savingsGoal", {
    method: "GET",
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then((res) => {
      setSavingsGoal(res);
    });
}

export function updateUserSavingsGoal(
  userToken,
  newSavingsGoal,
  setSavingsGoal
) {
  fetch("http://localhost:8080/bankuser/" + userToken + "/savingsGoal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ savingsGoal: newSavingsGoal }),
  })
    .then((res) => {
      if (res.status === 200) {
        return newSavingsGoal;
      } else {
        return -1;
      }
    })
    .then((res) => {
      if (res !== -1) {
        setSavingsGoal(res);
      }
    });
}
