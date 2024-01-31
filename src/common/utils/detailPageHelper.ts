export default {
  set: () => {
    console.log("history", location.pathname + location.search);
    sessionStorage.setItem("detail-page", location.pathname + location.search);
  },
  getBackUrl: () => {
    return sessionStorage.getItem("detail-page");
  },
};
