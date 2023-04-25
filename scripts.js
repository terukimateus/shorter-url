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
         // criando a div results
          var divResults = document.createElement("div");
          divResults.setAttribute("class", "results");

          // criando o elemento span
          var span = document.createElement("span");
          span.textContent = data.result.original_link
          span.setAttribute("id", "link");

          // criando a div interna
          var divInternal = document.createElement("div");

          // criando o elemento a
          var a = document.createElement("a");
          a.setAttribute("href", data.result.full_short_link);
          a.setAttribute("target", "_blank");
          a.setAttribute("id", "shortered");
          a.textContent = data.result.short_link

          // criando o botão Copy
          var buttonCopy = document.createElement("button");
          buttonCopy.setAttribute("id", "copy");
          buttonCopy.setAttribute("class", "copy");
          buttonCopy.textContent = "Copy";

          // criando o botão Copied
          var buttonCopied = document.createElement("button");
          buttonCopied.setAttribute("id", "copied");
          buttonCopied.setAttribute("class", "copied");
          buttonCopied.textContent = "Copied!";

          // adicionando elementos filhos
          divInternal.appendChild(a);
          divInternal.appendChild(buttonCopy);
          divInternal.appendChild(buttonCopied);

          divResults.appendChild(span);
          divResults.appendChild(divInternal);

          // adicionando a div results ao elemento pai
          var statics = document.getElementById("child");
          var existingChild = statics.childNodes[1]; // segundo filho
          statics.insertBefore(divResults, existingChild);

          const copyButton = document.getElementById("copy");

          // Adicione um ouvinte de evento ao botão de cópia
          copyButton.addEventListener("click", () => {
            // Selecione o campo de texto a ser copiado
            const shortLink = data.result.short_link

            navigator.clipboard.writeText(shortLink).then(() => {
              document.getElementById('copy').style.display = "none"
              document.getElementById('copied').style.display = "block"
            })
          });
        
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