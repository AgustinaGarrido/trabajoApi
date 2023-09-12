document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const pokemonIdInput = document.getElementById("pokemonId");
    const container = document.getElementById("pokemon-container"); 
    let pokemonCard = null; 

    searchButton.addEventListener("click", () => {
        const pokemonId = pokemonIdInput.value;

        if (pokemonCard) {
            container.removeChild(pokemonCard);
        }

        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

        /* llamamos a la api */
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    /* Capturamos error */
                    const errorText = document.createElement("p");
                    errorText.textContent = "No se encontró ningún Pokémon con ese número.";
                    container.appendChild(errorText);
                    throw new Error("No se encontró ningún Pokémon con ese número.");
                }
                return response.json();
            })
            /* se crea la card */
            .then(data => {
                
                pokemonCard = document.createElement("div");
                pokemonCard.classList.add("pokemon-card");

                const pokemonImage = document.createElement("img");
                pokemonImage.src = data.sprites.front_default;
                pokemonImage.alt = `Imagen de ${data.name}`;
                pokemonImage.classList.add("pokemonImage")
                pokemonCard.appendChild(pokemonImage);

                const pokemonName = document.createElement("h2");
                pokemonName.textContent = data.name;
                pokemonName.classList.add("pokemonName")
                pokemonCard.appendChild(pokemonName);

                const pokemonWeight = document.createElement("p");
                pokemonWeight.innerHTML = `<strong>Peso:</strong> ${data.weight} kg`;
                pokemonWeight.classList.add("pokemonDescription")
                pokemonCard.appendChild(pokemonWeight);

                const pokemonHeight = document.createElement("p");
                pokemonHeight.innerHTML = `<strong>Altura:</strong> ${data.height} m`;
                pokemonHeight.classList.add("pokemonDescription")
                pokemonCard.appendChild(pokemonHeight);

                
                container.appendChild(pokemonCard);
            })

            .catch(error => {
                console.error("Error al obtener información del Pokémon:", error);
            });
    });
});

