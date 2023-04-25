var btn = document.getElementById("submit")

btn.addEventListener("click", function() {
    const url = document.getElementById("url").value
    const error = document.getElementById("error")

    if(url !== "") {
        error.innerHTML = ""
        document.getElementById("url").classList.remove("error")
        const shortered = document.getElementById("shortered")
        fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then((response) => response.json())
        .then((data) => {
          // Verifica se há erro no objeto de resposta JSON
          if (data.error) {
            throw new Error(data.error);
          }
    
          // Processa a resposta do fetch
          document.querySelector(".results").style.display = "flex";
          shortered.innerHTML = data.result.short_link;
          document.getElementById("shortered1").innerHTML = data.result.short_link;
          shortered.setAttribute("href", data.result.full_short_link);
          document.getElementById("link").innerHTML = data.result.original_link;
          document.getElementById("copy").style.display = "block";
          document.getElementById("copied").style.display = "none";
        })
        .catch((error) => {
          // Captura o erro do fetch ou erro no objeto de resposta JSON
          console.error(error);
          alert(`${error.message}`);
        });
    } else {
        error.innerHTML = 'Please add a link'
        document.getElementById("url").classList.add("error")
    }
})

const copyButton = document.getElementById("copy");

// Adicione um ouvinte de evento ao botão de cópia
copyButton.addEventListener("click", () => {
  // Selecione o campo de texto a ser copiado
  const shortLink = document.getElementById("shortered1");

  // Selecionar o conteúdo do campo de texto
  shortLink.select();

  navigator.clipboard.writeText(shortLink.value).then(() => {
    document.getElementById('copy').style.display = "none"
    document.getElementById('copied').style.display = "block"
  })
});