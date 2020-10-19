$(function() {
  $('button').click(function(event){
    event.preventDefault()

    var pokeId = $('#pokeId').val()
    var pokedex = {
      "url": `https://pokeapi.co/api/v2/pokemon/${pokeId}`,
      "method": "GET"
    };
  
    $.ajax(pokedex).done(function (response) {
      $('#name').text(response.name)
      $('img').attr('src', response.sprites['front_default'])
      $('#weight').text(`Peso: ${response.weight} kg.`)
      createChart(response)
    });  
  })
})

function createChart(data) {
  var cleanData = data.stats.map(function(info){
    return { label:info.stat.name, y: info.base_stat }
  })

  var chart = new CanvasJS.Chart("chartContainer", {

		title:{
			text: "Estadísticas base del Pokemón"              
    },
    axisX:{
      title : "Estadísticas",
      titleFontSize: 20
      },
      axisY:{
      title : "Puntos",
      titleFontSize: 20
      },
      
		data: [              
		{
		
			type: "column",
			dataPoints: cleanData
		}
		]
	});
	chart.render();
}
