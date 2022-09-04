const $fileInput = $(".file-input");
const $droparea = $(".file-drop-area");
const $delete = $(".item-delete");

$fileInput.on("dragenter focus click", function () {
  $droparea.addClass("is-active");
});

$fileInput.on("dragleave blur drop", function () {
  $droparea.removeClass("is-active");
});

$fileInput.on("change", function () {
  let filesCount = $(this)[0].files.length;
  let $textContainer = $(this).prev();

  if (filesCount === 1) {
    let fileName = $(this).val().split("\\").pop();
    $textContainer.text(fileName);
    $(".item-delete").css("display", "inline-block");
  } else if (filesCount === 0) {
    $textContainer.text("or drop files here");
    $(".item-delete").css("display", "none");
  } else {
    $textContainer.text(filesCount + " files selected");
    $(".item-delete").css("display", "inline-block");
  }
});

$delete.on("click", function () {
  $(".file-input").val(null);
  $(".file-msg").text("or drop files here");
  $(".item-delete").css("display", "none");
});

//image logic
const imageSrc3 = 'BAYELSA FOR OBI TPN WEB.png';

let container = document.getElementById('container');
let containerCtx = container.getContext('2d');

let preview = document.getElementById('preview');
let previewCtx = preview.getContext('2d');

const reader = new FileReader();
const img = new Image();


const img2 = new Image();
img2.src = imageSrc3;
img2.onload = function() {
  previewCtx.drawImage(img2, 0, 0, 400, 400)
}


const uploadImage = (e) => {
  reader.onload = () => {
    img.onload = function() {
      var imageHeight = img.height;
      var imageWidth = img.width;
      console.log('imageHeight = ', imageHeight, 'imageWidth = ', imageWidth);
      if (imageHeight > imageWidth) {
        var ratio = imageHeight / imageWidth;
        imageWidth = 115;
        imageHeight = imageWidth * ratio;
      } else {
        var ratio = imageWidth / imageHeight;
        imageHeight = 115;
        imageWidth = imageHeight * ratio;
      }
      console.log('imageHeight = ', imageHeight, 'imageWidth = ', imageWidth);
      containerCtx.drawImage(img, 227, 31, imageWidth, imageHeight);

      const img2 = new Image();
      img2.src = imageSrc3;
      img2.onload = function() {
        var imageHeight = img2.height;
        var imageWidth = img2.width;
        console.log('w = ', img2.width, 'h = ', img2.height);
        var ratio = imageWidth / imageHeight;
        imageHeight = 400;
        imageWidth = imageHeight * ratio;
        containerCtx.drawImage(img2, 0, 0, imageWidth, imageHeight);
      }
    }
    img.src = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};


const imageLoader = document.getElementById("uploader");
imageLoader.addEventListener("change", uploadImage);

function download() {
  const image = container.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.png";
  link.click();
}

document.querySelector("button").addEventListener("click", download);
