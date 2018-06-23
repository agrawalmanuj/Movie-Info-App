var form = document.getElementById("search");
var input;
//var p='https://www.omdbapi.com/?s='+input+'&apikey=8adce94e';
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
//console.log(data);
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
	//console.log(data2.Actors);
	/*Genre
	Released
	Rated
	imdbRating
	Director
	Writer
	Actors*/
	var op='';

	op+=`<div class="row py-3 px-3">

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

document.getElementById("movie5").innerHTML=op;


}
