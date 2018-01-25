
fetch ('https://lit-fortress-6467.herokuapp.com/object').then(function(response2){
  return response2.json()
}).then(function(data2) {

  let dataArray = data2.results;
  let dataLength2 = data2.results.length;

  for (let j = 0; j < dataLength2; j++) {

    let scrollingSinglePic = `
    <div class="scrolling-item"><img class="scrolling-images" src="images/${data2.results[j].cover_art}" /></div>
    `
    document.getElementById('scrollingDivInner').innerHTML += scrollingSinglePic;

  }

  console.log(dataArray)

}).catch(function(err){
  new Error(err)
});
