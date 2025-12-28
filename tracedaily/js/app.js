// App bootstrap
document.addEventListener("DOMContentLoaded", () => {
  registerServiceWorker();
  console.log("TraceDaily bootstrapped");
});

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("Service Worker registered");
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
}
