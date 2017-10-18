var miniatures = document.getElementById('miniatures');
function handleFileSelect(evt) {
miniatures.innerHTML= "";
var files = evt.target.files;
for (var i = 0, f; f = files[i]; i++) {
  if (!f.type.match('image.*')) {
      continue;
  }
  var reader = new FileReader();
  reader.onload = (function (theFile) {
    return function (e) {
      var miniature = document.createElement('caption');
      miniature.className ="all-20 miniature";
      miniature.innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
      miniatures.insertBefore(miniature, null);
      };
  })(f);
  reader.readAsDataURL(f);
  }
}
document.getElementById('dropZone').addEventListener('change', handleFileSelect, false);
