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
const imageSrc1 = 'WhatsApp Image 2022-08-25 at 7.09.59 PM.jpeg'
const imageSrc2 = 'bayelsa_march.png';
let container = document.getElementById('container');
let containerCtx = container.getContext('2d');

const reader = new FileReader();
const img = new Image();

//bg image


const uploadImage = (e) => {
  reader.onload = () => {
    img.onload = function() {
      containerCtx.drawImage(img, 220, 222, 115, 115)
      const img2 = new Image();
      img2.src = imageSrc2;
      img2.onload = function() {
        containerCtx.globalAlpha = 1.0;
        containerCtx.drawImage(img2, 0, 0, 400, 400)
}
    }
    img.src = reader.result;
    console.log(reader.result);
  };
  reader.readAsDataURL(e.target.files[0]);
};

// const img3 = new Image();
// img3.src = imageSrc1;
// img3.onload = function() {
//   containerCtx.drawImage(img3, 220, 222, 100, 100)
// }






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
