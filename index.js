const containerProducto = document.getElementById("containerProducto");
const producto = document.getElementById("producto");
const categoriasCards = document.getElementById("categoriasCards");
const verCategoria = document.getElementById("verCategoria");
const verCategoriaContainer = document.getElementById("verCategoriaContainer");

const cartita1 = document.getElementById("card1");
const cartita2 = document.getElementById("card2");
const cartita3 = document.getElementById("card3");
const cartita4 = document.getElementById("card4");

const pcard1 = document.createElement("p");
const pcard2 = document.createElement("p");
const pcard3 = document.createElement("p");
const pcard4 = document.createElement("p");

let pCardTextContent = new Array();

const getProducts = async (done) => {
  try {
    const result = fetch("https://fakestoreapi.com/products");
    result
      .then((response) => response.json())
      .then((data) => {
        done(data);
        return data;
      });
  } catch (error) {
    console.log(error);
  }
};

const imagenRandom = (data) => {
  let random = Math.round(Math.random() * 20);

  const img = document.createElement("img");
  img.src = data[random].image;
  img.classList.add("productoDestacado");

  const h3 = document.createElement("h3");
  h3.textContent = data[random].title;
  h3.classList.add("titleProductoDestacado");

  const p = document.createElement("p");
  p.textContent = data[random].description;
  p.classList.add("descriptionProductoDestacado");

  const div = document.createElement("div");
  const divImg = document.createElement("div");
  const divTitle = document.createElement("div");
  const btn = document.createElement("btn");

  div.appendChild(divImg);
  divImg.appendChild(img);
  divImg.appendChild(divTitle);
  divTitle.appendChild(h3);
  divTitle.appendChild(p);
  divTitle.appendChild(btn);

  divImg.classList.add("divProductoDestacado");
  divTitle.classList.add("divTitle");
  btn.classList.add("btnProductoDestacado");
  btn.textContent = "Comprar";

  containerProducto.appendChild(div);
};

const imagenCategorias = (data) => {
  const card1 = document.createElement("img");
  const card2 = document.createElement("img");
  const card3 = document.createElement("img");
  const card4 = document.createElement("img");

  card1.src = data[1].image;
  pcard1.textContent = data[0].category;
  card1.classList.add("imageCard");
  pcard1.classList.add("pCard");
  cartita1.appendChild(card1);
  cartita1.appendChild(pcard1);
  pCardTextContent[0] = pcard1.textContent;

  card2.src = data[4].image;
  pcard2.textContent = data[4].category;
  card2.classList.add("imageCard");
  pcard2.classList.add("pCard");
  cartita2.appendChild(card2);
  cartita2.appendChild(pcard2);
  pCardTextContent[1] = pcard2.textContent;

  card3.src = data[8].image;
  pcard3.textContent = data[8].category;
  card3.classList.add("imageCard");
  pcard3.classList.add("pCard");
  cartita3.appendChild(card3);
  cartita3.appendChild(pcard3);
  pCardTextContent[2] = pcard3.textContent;

  card4.src = data[15].image;
  pcard4.textContent = data[14].category;
  card4.classList.add("imageCard");
  pcard4.classList.add("pCard");
  cartita4.appendChild(card4);
  cartita4.appendChild(pcard4);
  pCardTextContent[3] = pcard4.textContent;
};

getProducts((data) => {
  console.log(data);
  imagenRandom(data);
  imagenCategorias(data);
});

const mostrarProductoCategorias = (
  cartaCategoria,
  nombreCategoria,
  posicionCategoria
) => {
  cartaCategoria.addEventListener("click", function () {
    producto.style.display = "none";
    categoriasCards.style.display = "none";
    verCategoria.style.display = "flex";

    getProducts((data) => {
      let productosAMostrar = data.filter(funcion);
      function funcion(data) {
        if (data.category === nombreCategoria[posicionCategoria]) {
          return data.category;
        }
        console.log(data.category);
        console.log(nombreCategoria[posicionCategoria]);
      }
      console.log(productosAMostrar);
      const productosAMostrarHTML = productosAMostrar.map((data) => {
        const div = document.createElement("div");
        const divBtns = document.createElement("div");
        const img = document.createElement("img");
        const price = document.createElement("p");
        const btnVerMas = document.createElement("btn");
        const btnComprar = document.createElement("btn");

        img.src = data.image;
        price.textContent = data.price;
        btnComprar.textContent = "Comprar";
        btnVerMas.textContent = "Ver mas";
        btnVerMas.setAttribute("id", data.id);
        //btnVerMas.setAttribute("onClick", "verMasProducto");
        img.classList.add("imageCard");
        price.classList.add("pCard");
        btnVerMas.classList.add("verCategoriaVerMas");
        btnComprar.classList.add("verCategoriaComprar");
        divBtns.classList.add("verCategoriaBtns");

        price.innerText += " $";

        verCategoriaContainer.appendChild(div);
        div.classList.add("card");
        div.appendChild(img);
        div.appendChild(price);
        div.appendChild(divBtns);
        divBtns.appendChild(btnComprar);
        divBtns.appendChild(btnVerMas);

        btnVerMas.addEventListener("click", () => {
          verMasProducto(data.id, data);
        });
      });
      productosAMostrarHTML;
    });
  });
};

const verMasProducto = (prodId, data) => {
  const item = data.find((prod) => prod.id === prodId);
};

mostrarProductoCategorias(cartita1, pCardTextContent, 0);
mostrarProductoCategorias(cartita2, pCardTextContent, 1);
mostrarProductoCategorias(cartita3, pCardTextContent, 2);
mostrarProductoCategorias(cartita4, pCardTextContent, 3);
