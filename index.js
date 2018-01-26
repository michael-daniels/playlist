//https://lit-fortress-6467.herokuapp.com/object

fetch ('http://localhost:3000/db').then(function(response){
  return response.json()
}).then(function(data) {

  let dataLength = data.results.length;

  for (let i = 0; i < 3; i++) {

    let randomIdx = Math.floor(Math.random() * (dataLength));
    console.log(randomIdx)
    let splashSinglePic = `
    <img class="splash-single-pic" src="images/${data.results[randomIdx].cover_art}" />
    `
    document.getElementById('picColumn').innerHTML += splashSinglePic;

  }

}).catch(function(err){
  new Error(err)
});
