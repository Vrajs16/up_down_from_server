const form = document.querySelector("form");
const fileInput = form.querySelector(".file-input");
const progressArea = document.querySelector(".progress-area");
const uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    if (fileName.length > 12) {
      fileName =
        fileName.substr(0, 12) +
        "... " +
        fileName.substr(fileName.lastIndexOf("."));
    }
    uploadFile(fileName, file.size);
  }
};

function uploadFile(name, size) {
  let data = new FormData(form);
  var request = new XMLHttpRequest();
  request.responseType = "json";
  request.upload.addEventListener("progress", ({ loaded, total }) => {
    console.log("progress", loaded, total);
    let fileLoaded = Math.floor((loaded / total) * 100);
    let progressHTML = `<li class="row">
                            <i class="fas fa-file-alt"></i>
                            <div class="content">
                              <div class="details">
                                <span class="name">${name} • Uploading</span>
                                <span class="percent">${fileLoaded}%</span>
                              </div>
                              <div class="progress-bar">
                                <div class="progress" style="width:${fileLoaded}%"></div>
                              </div>
                            </div>
                        </li>`;
    progressArea.innerHTML = progressHTML;
  });

  request.addEventListener("load", (e) => {
    if (request.status == 200) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                                <div class="content">
                                  <i class="fas fa-file-alt"></i>
                                  <div class="details">
                                    <span class="name">${name} • Uploaded</span>
                                    <span class="size">${
                                      Math.floor(size / 1000) / 1000
                                    } MB</span>
                                  </div>
                                </div>
                                <i class="fa fa-check"></i>
                              </li>`;
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
      console.log(`${request.response.message}`, "success");
    } else {
      console.log(`${request.response.message}`, "error");
    }
  });

  // Open and send the request
  request.open("post", "/");
  request.send(data);
}
