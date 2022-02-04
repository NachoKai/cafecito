export default () => {
  const queryStr = window.location.search;
  const queryArr = queryStr.replace("?", "").split("&");
  const queryParams = [];

  for (let q = 0, qArrLength = queryArr.length; q < qArrLength; q++) {
    const qArr = queryArr[q].split("=");
    queryParams[qArr[0]] = qArr[1];
  }

  return queryParams;
};
