// eslint-disable
// this is an auto generated file. This will be overwritten

export const listBenchmarkResultsByTeam = `query ListBenchmarkResultsByTeam(
  $team: String!
  $limit: Int
  $nextToken: String
) {
  listBenchmarkResultsByTeam(
    team: $team
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      team
      epochMilliSeconds
      status
      comment
      score
    }
    nextToken
  }
}
`;
export const getBenchmarkResult = `query GetBenchmarkResult($team: String!) {
  getBenchmarkResult(team: $team) {
    team
    epochMilliSeconds
    status
    comment
    score
  }
}
`;
export const listBenchmarkResults = `query ListBenchmarkResults(
  $team: String
  $filter: ModelBenchmarkResultFilterInput
  $limit: Int
  $nextToken: String
) {
  listBenchmarkResults(
    team: $team
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      team
      epochMilliSeconds
      status
      comment
      score
    }
    nextToken
  }
}
`;
export const getBenchmarkResultHistory = `query GetBenchmarkResultHistory($team: String!, $epochMilliSeconds: Float!) {
  getBenchmarkResultHistory(
    team: $team
    epochMilliSeconds: $epochMilliSeconds
  ) {
    team
    epochMilliSeconds
    status
    comment
    score
  }
}
`;
export const listBenchmarkResultHistorys = `query ListBenchmarkResultHistorys(
  $team: String
  $epochMilliSeconds: ModelFloatKeyConditionInput
  $filter: ModelBenchmarkResultHistoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listBenchmarkResultHistorys(
    team: $team
    epochMilliSeconds: $epochMilliSeconds
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      team
      epochMilliSeconds
      status
      comment
      score
    }
    nextToken
  }
}
`;
