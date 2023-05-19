const pageRoot = document.documentElement; // the root html element
const pageBody = document.body;
const selectFileBtn = document.getElementById("selected-origial-image");
const originalImgHolder = document.getElementById("original-img-holder");
const enhancedImgHolder = document.getElementById("enhanced-img-holder");
const originalImgWrapper = document.getElementById("original-img-wrapper");
const originalImg = document.getElementById("original-img");
const originalTempText = document.getElementById("original-temp-text");
const submitingBtn = document.getElementById("submiting-btn");
const closeBtn = document.getElementById("close-btn");
const modeToggleBtn = document.getElementById("mode-toggle-btn");
const tempTextMessage_default = originalTempText.innerText;
const tempTextMessage_error =
  "Not supported file to drop here, please drop in images only!";

function setImageSrc(fileinput) {
  const selectedFile = fileinput.files[0];
  if (selectedFile) {
    // difne a varible to be an instance of the js file reader Class
    const fileReader = new FileReader();

    /**
     * Telling the file reader to convert the choosen image to base64 data.
     */
    fileReader.readAsDataURL(selectedFile);

    /**
     * set the src attribute for the html img tag
     */
    fileReader.addEventListener("load", function () {
      originalImg.setAttribute("src", this.result);

      /**
       * adding this class to the html element [that has id of original-img-holder]
       * to show the image &hide the temp-text
       */
      originalImgHolder.classList.add("show-img");
      /**
 * // to activate the magnify effect
 * originalImg.setAttribute("data-magnify-src", this.result);
 *       $(document).ready(function () {
        $("#original-img").magnify({
          src: this.result,
        });
      });


      * 
      */
    });

    setTimeout(() => {
      const preview = originalImgHolder.querySelector(".preview");
      if (originalImg.offsetHeight > originalImgWrapper.offsetHeight) {
        preview.style.alignSelf = "start";
      } else {
        preview.style.alignSelf = null;
      }
    }, 50);
  }
}

function removeImageSrc() {
  originalImgHolder.classList.remove("show-img");
  originalImgWrapper.classList.remove("drag-over");
  originalImg.setAttribute("src", "");
  originalTempText.innerText = tempTextMessage_default;
}

selectFileBtn.addEventListener("change", function () {
  setImageSrc(this);
});

closeBtn.addEventListener("click", function () {
  removeImageSrc();
});

// submitingBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   var imageForm = $("#image-form");
//   console.log("uploaded 1");
//   // if (imageForm) {
//   //   $.ajax({
//   //     type: "POST",
//   //     url: imageForm.attr("action"),
//   //     data: imageForm.serialize(),

//   //     success: function (data) {
//   //       // $(".done-msg")
//   //       //   .text("Thank you, Your Message Was Received!")
//   //       //   .toggleClass("show");
//   //       // setTimeout(function () {
//   //       //   $(".done-msg").text("").toggleClass("show");
//   //       // }, 4000);
//   //       // imageForm[0].reset();
//   //       console.log("uploaded 2");
//   //     },
//   //   });
//   //   return false;
//   // }
// });

/**
 *
 * ===============Drag and drop logic
 *
 */
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

originalImgHolder.addEventListener("dragover", (e) => {
  e.preventDefault();
  originalImgWrapper.classList.add("drag-over");
});

["dragend", "dragleave"].forEach((element) => {
  originalImgHolder.addEventListener(element, () => {
    originalImgWrapper.classList.remove("drag-over");
  });
});

originalImgHolder.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.dataTransfer.files.length && validFileType(e.dataTransfer.files[0])) {
    selectFileBtn.files = e.dataTransfer.files;
    setImageSrc(selectFileBtn);
  } else {
    originalTempText.innerText = tempTextMessage_error;
  }
});

["drop", "dragover"].forEach((element) => {
  enhancedImgHolder.addEventListener(element, (e) => {
    e.preventDefault();
  });
});
