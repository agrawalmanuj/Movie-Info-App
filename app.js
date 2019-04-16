
var form = document.getElementById("search");
var input;
//var p='https://www.omdbapi.com/?s='+input+'&apikey=8adce94e';
var yid,ykey='not';
var screen;

screen= screen.height;
screen=screen/2;
var p;
form.addEventListener('submit',movielist);


function movielist(e){

	e.preventDefault();

	input = document.getElementById("searcht").value;
	
	$.ajax({
			
		url: 'https://www.omdbapi.com/?s='+input+'&apikey=8adce94e',
		
	})
	.done(addmovie);
	
	
}

function addmovie(data){

//console.log(data.Search[0].Title);
console.log(data);

if(data.Response=='False')
{
	document.getElementById("movie").innerHTML=data.Error+' Please Cheack spelling';
}
var output='';
var q=data.Search;
var i;

//console.log(q.length);
for(i=0;i<q.length;i++)
{
	if(data.Search[i].Poster!="N/A"){
	output+=`<div class="col-md-3">

		<div class= "card text-center" style="height:400px;margin-bottom:40px;">
		
		

		<img src="${data.Search[i].Poster}" class="card-img-top img-fluid" style="height:200px;width:100%;padding-top:10px;padding-right:10px;padding-left:10px;">
		<div class="card-body">
		<h5 class="card-title text-white">${data.Search[i].Title}</h5>

		<a class="btn btn-primary" href="#" onclick="moviesel('${data.Search[i].imdbID}')">Movie Details</a>
		</div>		

		</div>

		</div>`;
	}
}

document.getElementById("movie").innerHTML=output;
}


function moviesel(id)
{
	//console.log(id);
	sessionStorage.setItem('movieid',id);
	window.location='movie2.html';
	//return false;
}

function getmovie(){
	var movieid=sessionStorage.getItem('movieid');

	p=movieid;

	//var movie2 = document.getElementById("searcht").value;
	
	$.ajax({
		
		url: 'https://www.omdbapi.com/?i='+movieid+'&apikey=8adce94e',
		
	})
	.done(addmovie3);


}
function addmovie3(data2)
{	



	var url = 'https://api.themoviedb.org/3/search/movie?query='+data2.Title+'&api_key=610b1cd4997b5379ffb5073c8b9f918a';
	var xhr = new XMLHttpRequest();
	 xhr.open('GET',url,false);

	 xhr.onload=function(){
          if(this.status === 200)
          {    
               var names=JSON.parse( this.responseText );
               
               var j =names.results.length;
               var k;
               for(k=0;k<j;k++)
               {
               	if(names.results[k].title === data2.Title)
               	{
               		yid = names.results[k].id;

               		break;
               	}
               }

          }
         
     }
     xhr.send();

     //console.log(yid);


     var keyurl = 'http://api.themoviedb.org/3/movie/'+yid+'/videos?api_key=610b1cd4997b5379ffb5073c8b9f918a';
     var keyxhr = new XMLHttpRequest();
     keyxhr.open('GET',keyurl,false);

     keyxhr.onload=function(){
          if(this.status === 200)
          {    
               var keynames=JSON.parse( this.responseText );
               ykey=keynames.results[0].key;

          }
         
     }
     keyxhr.send();

     console.log(ykey);


     var yaddress = 'https://www.youtube.com/watch?v='+ykey+'';

	var op='';
	if(ykey==='not')
	{
		



		op+=`
	
	<div class="row py-3 px-3">

	<div class="col-md-4">
		
		<img src="${data2.Poster}" class="img-fluid">

	</div>

	<div class="col-md-8">
		
<h2 class="text-white">${data2.Title}</h2>

<ul class="list-group">

	<li class="list-group-item">
		<b>Genre: </b> ${data2.Genre}
		
	</li>

	<li class="list-group-item">
		<b>Released: </b> ${data2.Released}
	</li>

	<li class="list-group-item">
		<b>Rated: </b> ${data2.Rated}
	</li>

	<li class="list-group-item">
		<b>imdbRating: </b> ${data2.imdbRating}
	</li>

	<li class="list-group-item">
		<b>Director: </b> ${data2.Director}
	</li>

	<li class="list-group-item">
		<b>Writer: </b> ${data2.Writer}
	</li>

	<li class="list-group-item">
		<b>Actors: </b> ${data2.Actors}
	</li>
	
</ul>

	</div>
	

<div class="py-4 px-3 ">
<div class="container py-2">
<div class="row">
<div class="col-md-12">
<h3 class="text-white">Plot</h3>
${data2.Plot}
<br><br>
<a class="btn btn-primary text-white" href="https://www.imdb.com/title/${p}/">View IMDB</a>
<a class="btn btn-secondary text-white" href="movie.html">Go Back To Search</a>
</div>
</div>
</div>
</div>`




	}
	
	else{
	op+=`
	<iframe  width="auto" height="${screen}" src="https://www.youtube.com/embed/${ykey}?rel=0" frameborder="1" allow="autoplay; encrypted-media" allowfullscreen style="border:5px solid white;"></iframe>
	<div class="row py-3 px-3">

	<div class="col-md-4">
		
		<img src="${data2.Poster}" class="img-fluid">

	</div>

	<div class="col-md-8">
		
<h2 class="text-white">${data2.Title}</h2>

<ul class="list-group">

	<li class="list-group-item">
		<b>Genre: </b> ${data2.Genre}
		<a class="btn btn-danger text-white" href="${yaddress}" style="margin-left:100px;"> Youtube </a>
		
	</li>

	<li class="list-group-item">
		<b>Released: </b> ${data2.Released}
	</li>

	<li class="list-group-item">
		<b>Rated: </b> ${data2.Rated}
	</li>

	<li class="list-group-item">
		<b>imdbRating: </b> ${data2.imdbRating}
	</li>

	<li class="list-group-item">
		<b>Director: </b> ${data2.Director}
	</li>

	<li class="list-group-item">
		<b>Writer: </b> ${data2.Writer}
	</li>

	<li class="list-group-item">
		<b>Actors: </b> ${data2.Actors}
	</li>
	
</ul>

	</div>
	

<div class="py-4 px-3 ">
<div class="container py-2">
<div class="row">
<div class="col-md-12">
<h3 class="text-white">Plot</h3>
${data2.Plot}
<br><br>
<a class="btn btn-primary text-white" href="https://www.imdb.com/title/${p}/">View IMDB</a>
<a class="btn btn-secondary text-white" href="movie.html">Go Back To Search</a>
</div>
</div>
</div>
</div>`
}

document.getElementById("movie5").innerHTML=op;


}
