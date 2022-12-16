const API_KEY = '8638fcfb936d66490bd46b96341d4113'
const base_url = "https://api.themoviedb.org/3"
const image_base_url = "https://image.tmdb.org/t/p/w300"
const banner_base_url = "https://image.tmdb.org/t/p/original/"

//API endpoints - getting information as an object
const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetch2021Movies: `/discover/movie?api_key=${API_KEY}&&primary_release_year=2021`,
    fetch2022Movies: `/discover/movie?api_key=${API_KEY}&&primary_release_year=2022`
}

//Browser Support Code
function ajaxFunction(request, div_id){
    var ajaxRequest;  // The variable that makes Ajax possible!
    
    ajaxRequest = new XMLHttpRequest();
    

    // Create a function that will receive data sent from the server and will update
    // the div section in the same page.
    
    ajaxRequest.onreadystatechange = function(){
        
       if(ajaxRequest.readyState == 4){
          // gzthering the API data and converting it to JSON and then to an Array we can index into
          var json_response = ajaxRequest.responseText;
          var json_response_array = JSON.parse(json_response);
          response_length = json_response_array.results.length;
          for (var i=0; i < response_length; i++){
              backdrop_url = json_response_array.results[i].poster_path;
              full_image_url = image_base_url + backdrop_url;
              

              release = json_response_array.results[i].release_date;
              avg_vote = json_response_array.results[i].vote_average;
              if (!release){
                  release = json_response_array.results[i].first_air_date;
              }

              // checks if the data has an image. If yes, only then display the title under
              if (json_response_array.results[i].title && imageUrlChecker(full_image_url)){
                  response_title = json_response_array.results[i].title;
                  display_image_and_title(full_image_url, i, div_id, response_title, release, avg_vote);
                  
              } else if (json_response_array.results[i].original_title && imageUrlChecker(full_image_url)){
                response_title = json_response_array.results[i].original_title;
                display_image_and_title(full_image_url, i, div_id, response_title, release, avg_vote);
                
              } else if (json_response_array.results[i].original_name && imageUrlChecker(full_image_url)){
                response_title = json_response_array.results[i].original_name;
                display_image_and_title(full_image_url, i, div_id, response_title, release, avg_vote);
                
              } else if (json_response_array.results[i].name && imageUrlChecker(full_image_url)){
                response_title = json_response_array.results[i].name;
                display_image_and_title(full_image_url, i, div_id, response_title, release, avg_vote);
              } 


              
          }

          //console.log(json_response_array);
          //console.log(response_length)
          //console.log(full_image_url);
          
          
       }
    }
    // Now get the value from user and pass it to server script.
         
    queryString ="";
    queryString +=  base_url + request;
    ajaxRequest.open("GET", queryString, true);
    ajaxRequest.send(null);
    
}

// make the banner at the top of the page
function bannerMaker(request, div_id){
    var ajaxRequest;  // The variable that makes Ajax possible!
    
    ajaxRequest = new XMLHttpRequest();
    

    // Create a function that will receive data sent from the server and will update
    // the div section in the same page.
    
    ajaxRequest.onreadystatechange = function(){
        
       if(ajaxRequest.readyState == 4){
          
        var json_response = ajaxRequest.responseText;
        var json_response_array = JSON.parse(json_response);
        response_length = json_response_array.results.length;
        console.log(json_response_array);

        // pick a random movie for the banner
        banner_idx = Math.floor(Math.random() * response_length)
        console.log(banner_idx);
        console.log(json_response_array.results[banner_idx]);
        banner_backdrop_url = json_response_array.results[banner_idx].backdrop_path;
        banner_full_url = banner_base_url + banner_backdrop_url;
        console.log(banner_full_url);

        // creating image for banner
        var banner = document.createElement("img");
        banner.src = banner_full_url;
        banner.id = "banner-image";
        banner.style.maxWidth = '100%';
        banner.style.height = '448px';

        //creating banner title
        banner_title = document.createElement("h2");
        banner_title.innerHTML = json_response_array.results[banner_idx].title;

        //creating banner description
        banner_desc = document.createElement("p");
        banner_desc.innerHTML = json_response_array.results[banner_idx].overview;

        // add new banner elements to the home page
        var element = document.getElementById(div_id);
        element.appendChild(banner);
        element.appendChild(banner_title);
        element.appendChild(banner_desc);
          
       }
    }
    // Now get the value from user and pass it to server script.
         
    queryString ="";

    queryString +=  base_url + request;

    ajaxRequest.open("GET", queryString, true);
    ajaxRequest.send(null);
    
}

// make sure that that the image url is not null
function imageUrlChecker(url){
    //this variable is used to let the display_title function know if the image was displayed. If not, do not display title. 
    image_displayed = false;
    //checks that if the API image data is "null", and does not display the image
    if (url != image_base_url + "null"){
        //display_image_and_title(url, i, div_id, title);
        image_displayed = true;
    }
    return image_displayed;
    
    
}

// display the image and title for each movie for each row
function display_image_and_title(src, i, div_id, movie_title, release, avg_vote) {
    // creating div to put both image and title name in
    var img_info_div = document.createElement("div")
    img_info_div.id = "img" + i + "info";
    img_info_div.classList.add("info")
    

    // created image 
    var img_display = document.createElement("img");
    img_display.src = src;
    img_display.id = "img" + i;
    img_display.classList.add("poster")
    

    // create figcaption tag and writing movie title into it
    var inner_title = document.createElement("figcaption");
    inner_title.innerHTML = movie_title;

    
    // create figcaption tag and writing release date and vote average into it
    //var release_date = document.createElement("figcaption");
    //release_date.innerHTML = release;
    //release_date.classList.add("dates");
    var average_vote = document.createElement("figcaption");
    average_vote.innerHTML = "Rating: " + avg_vote;
    average_vote.classList.add("votes");
    

    // putting image in info div
    img_info_div.appendChild(img_display);
    
    //putting figcaption in info div
    //img_info_div.appendChild(inner_title);

    //putting release date and vote average in info div
    //img_info_div.appendChild(release_date);
    img_info_div.appendChild(average_vote);
    
    // putting info div into category div
    var category_div = document.getElementById(div_id);
    category_div.appendChild(img_info_div);
    
}


// get data, create images, create titles, put them in respective divs
ajaxFunction(requests.fetchTrending, "trending");
ajaxFunction(requests.fetchActionMovies, "action");
ajaxFunction(requests.fetchComedyMovies, "comedy");
ajaxFunction(requests.fetchDocumentaries, "docs");
ajaxFunction(requests.fetchHorrorMovies, "horror");
ajaxFunction(requests.fetchNetflixOriginals, "netflix-originals");
ajaxFunction(requests.fetchRomanceMovies, "romance");
ajaxFunction(requests.fetchTopRated, "top-rated");
bannerMaker(requests.fetch2021Movies, "banner");






