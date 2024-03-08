
const formHero = $("#formHero");
const inputNameHero = $("#inputNameHero");
const geroResult = $("#geroResult");

const getSuperHero = (idHero) => {
    $.ajax({
        url: `https://superheroapi.com/api.php/4905856019427443/${idHero}`,
        method: "GET",
        dataType: "json",
        // Mostrar el spinner antes de enviar la petición
        beforeSend: function () {
            $("#spinner").show();
        },
        // Ocultar el spinner después de recibir la respuesta
        complete: function () {
            $("#spinner").hide();
        },
        success(hero) {
            const heroConvertido = convierteHero(hero);
            pintaInfoHero(heroConvertido);
            pintaGrafico(hero);
        },
        error(err) {
            console.error(err)
        }
    })
}

const convierteHero = (hero) => {
    const heightJoin = hero.appearance.height.join(" - ");
    const weightJoin = hero.appearance.weight.join(" - ");

    const heightIndexOf = heightJoin.indexOf("-")
    const weightIndexOf = heightJoin.indexOf("-")
    const aliasesIndexOf = hero.biography.aliases.indexOf("-")
    const connectionsIndexOf = hero.connections.relatives.indexOf("-")
    const firstAppearanceIndexOf = hero["biography"]["first-appearance"].indexOf("-")
    const occupationIndexOf = hero.work.occupation.indexOf("-")
    const publisherIndexOf = hero.biography.publisher.indexOf("-")

    const height = heightIndexOf == 0 ? "NO REGISTRA INFORMACIÓN" : heightJoin;
    const weight = weightIndexOf == 0 ? "NO REGISTRA INFORMACIÓN" : weightJoin;
    const aliases = aliasesIndexOf == 0 ? "NO REGISTRA INFORMACIÓN" : hero.biography.aliases;
    const connections = connectionsIndexOf == 0 ? "NO REGISTRA INFORMACIÓN" : hero.connections.relatives;
    const firstAppearance = firstAppearanceIndexOf == 0 ? "NO REGISTRA INFORMACIÓN" : hero["biography"]["first-appearance"];
    const occupation = occupationIndexOf == 0 ? "NO REGISTRA INFORMACIÓN" : hero.work.occupation;
    const publisher = publisherIndexOf == 0 ? "NO REGISTRA INFORMACIÓN" : hero.biography.publisher;

    const heroObj = {
        name: hero.name,
        image: hero.image.url,
        height: height,
        weight: weight,
        aliases: aliases,
        connections: connections,
        firstAppearance: firstAppearance,
        occupation: occupation,
        publisher: publisher,
    }

    return heroObj;
}

const pintaInfoHero = (hero) => {
    geroResult.html(`
        <div class="card text-bg-secondary">
            <div class="card-header bg-dark">
                <h2 class="fw-bold text-success text-center">Nombre: ${hero.name}</h2>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-6 border">
                        <div class="text-center py-3">
                            <img src="${hero.image}" width="350"
                                alt="Image Hero">
                        </div>

                        <ul class="list-group list-group-flush text-left  border my-3">
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Publicado por:</span> ${hero.publisher} </li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Ocupación:</span> ${hero.occupation}</li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Primera Aparición:</span> ${hero.firstAppearance}</li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Altura:</span> ${hero.height}</li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Peso: </span> ${hero.weight}</li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Alianzas: </span> ${hero.aliases}</li>
                        </ul>

                    </div>
                    <div class="col-12 col-md-6">
                        <div id="chartContainer" style="height: 370px; width: 100%;"></div>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-dark text-danger ">
                <h5 class="fw-bold">Conexiones: <span class="text-white">${hero.connections}</span> </h5>
            </div>
        </div>
    `);
}

const pintaGrafico = (hero) => {
    const powersArray = Object.entries(hero.powerstats);
    const powers = powersArray.map(power => ({ ...power }))
    const dataPoints = powers.map(objeto => {
        var nuevoObjeto = {
          y: objeto[1],
          label: objeto[0]
        };
        return nuevoObjeto;
    });
    const options = {
        title: {
            text: "Habilidades de poder"
        },
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: dataPoints
        }]
    }
    $("#chartContainer").CanvasJSChart(options);

}

$(document).ready(function () {
    formHero.on("submit", function (e) {
        e.preventDefault();
        const inputNameHeroUser = +inputNameHero.val();
        inputNameHero.removeClass("is-valid is-invalid");
        if (inputNameHeroUser > 0 && inputNameHeroUser <= 731) {
            inputNameHero.addClass("is-valid");
            getSuperHero(inputNameHeroUser);
        } else {
            inputNameHero.addClass("is-invalid");
            geroResult.html("<h4 class='text-center text-danger fw-bold'>NO EXISTE REGISTRO DEL SUPERHERO BUSCADO... :C</h4>");
        }
    })
})