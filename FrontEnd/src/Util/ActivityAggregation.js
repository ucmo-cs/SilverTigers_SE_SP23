export function calculateCurrentBalance(activity) {
  const dateTime = new Date();

  const currentActivity = activity.filter(
    (rec) => rec.filterDate.getTime() <= dateTime.getTime()
  );

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

export function setupUserActivity(
  userToken,
  startDate,
  setActivity,
  currentBalanceDispatch,
  startBalanceDispatch
) {
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
        row.filterDate = new Date(row.date);
      });
      setActivity(activity);
      currentBalanceDispatch({ activity });
      startBalanceDispatch({ activity, startDate });
    });
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
