let dataArray;
let selectedArray = [];
let finalPlaylist =[];

document.getElementById('clearTracks').addEventListener('click', function() {
  document.getElementById('playlistTextArea').innerHTML = ""
  selectedArray = [];
})
document.getElementById('submitBin').addEventListener('click', function() {
  document.getElementById('playlistTextArea').innerHTML = ""
  selectedArray = [];
})

fetch ('http://localhost:3000/db').then(function(response2){
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

function removeFromPlaylistBox(songToRemove) {
  console.log(songToRemove)
  let songToBeRemoved = document.getElementById('playlistTextArea').getElementsByTagName('option').value = songToRemove;
  console.log(songToBeRemoved)
}

function addSongToPlaylistBox(songValue) {
  finalPlaylist.push(songValue);
  console.log("Final Playlist to Submit ", finalPlaylist);
  document.getElementById('playlistTextArea').innerHTML +=`
    <option value="${songValue}" onclick="removeFromPlaylistBox('${songValue}')">${songValue}</option>
  `
}

function getImageInfo(theID, objectIdx) {

  document.getElementById('theSelectedAlbumImageDiv').innerHTML = `
  <img class="the-selected-album-image" src="images/${dataArray[objectIdx].cover_art}" />
  `
  document.getElementById('submitBin').innerHTML = "submit bin";

  console.log(dataArray[objectIdx])
  selectedArray.push(dataArray[objectIdx]);


  console.log("SelectedArray", selectedArray)

  for (let i = 0; i < selectedArray.length; i++) {

    document.getElementById('playlistTextAreaLeft').innerHTML = "";

    console.log("the tracks", selectedArray[i].tracklist)
    for (let j = 0; j < selectedArray[i].tracklist.length; j++) {

      console.log(selectedArray[i].tracklist[j])
      document.getElementById('playlistTextAreaLeft').innerHTML += `

      <option value="${selectedArray[i].tracklist[j]}" onclick="addSongToPlaylistBox('${selectedArray[i].tracklist[j]}')">${selectedArray[i].tracklist[j]}</option>
      `
    }

  }

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
