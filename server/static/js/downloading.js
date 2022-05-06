const downloadButton = document.getElementById("download-button");
const downloadingFile = document.getElementById("downloading-file");
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

downloadButton.addEventListener("click", (e) => {
  let req = new XMLHttpRequest();
  req.responseType = "blob";
  req.addEventListener("progress", ({ loaded, total }) => {
    console.log("Download progress", loaded, total);
    let newLoaded = Math.floor(loaded / 1000) / 1000;
    let newTotal = Math.floor(total / 1000) / 1000;
    downloadingFile.textContent = `${newLoaded}/${newTotal} MB Downloaded`;
  });

  req.onload = async function (event) {
    let blob = req.response;
    let fileName = req.getResponseHeader("filename");
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    // await sleep(20000);
    link.download = fileName;
    link.click();
  };

  req.open("GET", "/download", true);
  req.send();
});

function fileDownload() {
  const a = document.createElement("a");
  a.href = `/filedownload`;
  a.click();
}
