const apiKey = "2WcXt7YxB0xmsxkjDqLXucs5oXv";
const queryId = "120013";
const data = {
  queryParameters: {

  },
};

const headers = {
  "X-API-KEY": apiKey,
  "Content-Type": "application/json",
};

async function executeQuery(queryId) {
  return await fetch(
    'https://api.chainbase.com/api/v1/query/${queryId}/execute',
    { method: "POST", headers, body: JSON.stringify(data) }
  )
    .then((response) => response.json())
    .then((data) => data.data[0].executionId);
}

async function checkStatus(executionId) {
  return await fetch(
    'https://api.chainbase.com/api/v1/execution/${executionId}/status',
    { headers }
  )
    .then((response) => response.json())
    .then((data) => data.data[0]);
}

async function getResults(executionId) {
  return await fetch(
    'https://api.chainbase.com/api/v1/execution/${executionId}/results',
    { headers }
  ).then((response) => response.json());
}

async function main() {
  const executionId = await executeQuery(queryId);
  let status;
  do {
    const statusResponse = await checkStatus(executionId);
    status = statusResponse.status;
    const progress = statusResponse.progress;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(${status} ${progress} %);
  } while (status !== "FINISHED" && status !== "FAILED");

  const results = await getResults(executionId);
  console.log(results);
}

main();