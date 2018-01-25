let dataArray;

fetch ('https://lit-fortress-6467.herokuapp.com/object').then(function(response2){
  return response2.json()
}).then(function(data2) {

  dataArray = data2.results;
  let dataLength2 = data2.results.length;


  for (let j = 0; j < dataLength2; j++) {
    let objectID = data2.results[j].id;
    let objectIdx = j;
    console.log(objectID)
    let scrollingSinglePic = `
    <div class="scrolling-item"><img id="album${objectID}" class="scrolling-images" src="images/${data2.results[j].cover_art}" onclick="getImageInfo(${objectID}, ${objectIdx})" /></div>
    `
    document.getElementById('scrollingDivInner').innerHTML += scrollingSinglePic;

  }


}).catch(function(err){
  new Error(err)
});

function getImageInfo(theID, objectIdx) {
  console.log("getImageInfo",theID)
  console.log(dataArray[objectIdx])
  document.getElementById('playlistTextArea').innerHTML += `
${dataArray[objectIdx].artist}: ${dataArray[objectIdx].artist}`
}
