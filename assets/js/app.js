
const formHero = $("#formHero");
const inputNameHero = $("#inputNameHero");
const geroResult = $("#geroResult");

const getSuperHero = (idHero) => {
    $.ajax({
        url: `https://superheroapi.com/api.php/4905856019427443/${idHero}`,
        method: "GET",
        dataType: "json",
        success(hero){
            // console.log(hero.name)
            // console.log(hero.image.url)
            // console.log(hero.biography.publisher)
            // console.log(hero.connections.relatives)
            // console.log(hero.work.occupation)
            // console.log(hero["biography"]["first-appearance"])
            // console.log(hero.appearance.height)
            // console.log(hero.appearance.weight)
            // console.log(hero.biography.aliases)
            pintaInfoHero(hero);
        },
        error(err){
            console.error(err)
        }
    })
}

const pintaInfoHero = (hero) => {

    const height = hero.appearance.height.join(" - ");
    const weight = hero.appearance.weight.join(" - ");

    geroResult.html(`
        <div class="card text-bg-secondary">
            <div class="card-header bg-dark">
                <h2 class="fw-bold text-success text-center">Nombre: ${hero.name}</h2>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-6 border">
                        <div class="text-center py-3">
                            <img src="${hero.image.url}" width="350"
                                alt="Image Hero">
                        </div>

                        <ul class="list-group list-group-flush text-left  border my-3">
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Publicado por:</span> ${hero.biography.publisher} </li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Ocupación:</span> ${hero.work.occupation}</li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Primera Aparición:</span> ${hero["biography"]["first-appearance"]}</li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Altura:</span> ${height}</li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Peso: </span> ${weight}</li>
                            <li class="list-group-item bg-dark text-white"> <span class="text-success fw-bold">Alianzas: </span> ${hero.biography.aliases}</li>
                        </ul>

                    </div>
                    <div class="col-12 col-md-6">
                        <div id="chartContainer" style="height: 370px; width: 100%;"></div>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-dark text-danger ">
                <h5 class="fw-bold">Conexiones: <span class="text-white">${hero.connections.relatives}</span> </h5>
            </div>
        </div>
    `);
}

$(document).ready(function(){
    formHero.on("submit", function(e){
        e.preventDefault();
        const inputNameHeroUser = +inputNameHero.val();

        inputNameHero.removeClass("is-valid is-invalid");
        if(inputNameHeroUser > 0){
            inputNameHero.addClass("is-valid");
            getSuperHero(inputNameHeroUser);
        }else{
            inputNameHero.addClass("is-invalid");
        }
    })
})