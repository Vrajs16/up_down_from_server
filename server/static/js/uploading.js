const form = document.querySelector("form");
const fileInput = form.querySelector(".file-input");
const progressArea = document.querySelector(".progress-area");
const uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = async ({ target }) => {
  fileInput.disabled = true;
  const formData = new FormData();
  for (const file of target.files) {
    formData.set("file", file);
    let fileName = file.name;
    if (fileName.length > 12) {
      fileName =
        fileName.substr(0, 12) +
        "... " +
        fileName.substr(fileName.lastIndexOf("."));
    }
    await uploadFile(fileName, file.size, formData);
  }
  fileInput.disabled = false;
};

function uploadFile(name, size, data) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.responseType = "json";
    request.addEventListener("progress", ({ loaded, total }) => {
      // console.log("Download progress", loaded, total);
    });
    request.upload.addEventListener("progress", ({ loaded, total }) => {
      console.log(`${name} Upload progress`, loaded, total);
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
      if (loaded == total) {
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
      }
    });
    request.addEventListener("load", () => {
      if (request.status == 200) {
        resolve(request.response);
      } else {
        reject(request.status);
      }
    });

    // Open and send the request
    request.open("post", "/");
    request.send(data);
  });
}
