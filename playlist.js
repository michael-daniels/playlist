let dataArray;
let selectedArray = [];

document.getElementById('clearTracks').addEventListener('click', function() {
  document.getElementById('playlistTextArea').innerHTML = ""
  selectedArray = [];
})
document.getElementById('submitBin').addEventListener('click', function() {
  document.getElementById('playlistTextArea').innerHTML = ""
  selectedArray = [];
})

fetch ('https://lit-fortress-6467.herokuapp.com/object').then(function(response2){
  return response2.json()
}).then(function(data2) {

  dataArray = data2.results;
  let dataLength2 = data2.results.length;


  for (let j = 0; j < dataLength2; j++) {
    let objectID = data2.results[j].id;
    let objectIdx = j;
    let scrollingSinglePic = `
    <div class="scrolling-item"><img id="album${objectID}" class="scrolling-images" src="images/${data2.results[j].cover_art}" onclick="getImageInfo(${objectID}, ${objectIdx})" /></div>
    `
    document.getElementById('scrollingDivInner').innerHTML += scrollingSinglePic;

  }


}).catch(function(err){
  new Error(err)
});



function getImageInfo(theID, objectIdx) {

  document.getElementById('submitBin').innerHTML = "submit bin";

  console.log(dataArray[objectIdx])
  selectedArray.push(dataArray[objectIdx]);


  document.getElementById('playlistTextArea').innerHTML += `
${dataArray[objectIdx].artist}: ${dataArray[objectIdx].title}`
}

document.getElementById('submitBin').addEventListener('click', function() {

  if (selectedArray !== []) {

    console.log(selectedArray)

    fetch('https://lit-fortress-6467.herokuapp.com/post', {
      method: 'post',
      body: JSON.stringify(selectedArray)
    }).then(function(response) {
      return response; // .json()
    }).then(function(data) {
      console.log(data);
      document.getElementById('submitBin').innerHTML = "playlist submitted"
    });

  }


})
