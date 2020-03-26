
//makes the button with click function

document.querySelector('button').addEventListener('click', async () => {
    
    //get images
    
    let text = document.querySelector('#search').value;
    let numberOfImages = document.querySelector('#numberOfImages').value;
    let data = await getImages(text, numberOfImages);



    updateUi(data);


})

//api key and url, key is required, text pulls the text search from flickr api

async function getImages(text, numberOfImages){
    
    const apiKey = '19d3e6e0acfe9c438f368e2c2bab1c5d';
    const baseUrl = 'https://api.flickr.com/services/rest';
    let method = 'flickr.photos.search';
    
    //api_key need to be in exact format from flickr
    let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&per_page=${numberOfImages}&format=json&nojsoncallback=1`;

    let resp = await fetch(url);
    let data = await resp.json();
    
    return data.photos;
}

//function update Ui 
function updateUi(data){
    //to clear search
    document.querySelector('#photos').innerHTML = '';

    data.photo.forEach(img => {
        console.log(img);
        
       let el = document.createElement('img');
       el.setAttribute('src', imgUrl(img, 'q'));
      
       el.addEventListener('click', () => {
           enlarge(img);
       });
       
       
       document.querySelector('#photos').appendChild(el);
    });

    const images = document.querySelectorAll('img');

images.forEach(image => {
   
    image.addEventListener('click', e => {
        lightbox.classList.add('active')
        const img = document.createElement('img')
        img.src = image.src
        lightbox.appendChild(img)

    })
})

}



//enlarge, o means original size
function enlarge(img){
    imgUrl(img, 'o')

}

//farms the image
function imgUrl(img, size){

    return `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${size}.jpg`

}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);





  













