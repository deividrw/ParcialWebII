import React, { useState, useEffect } from "react";
import "./styles.css";
import * as Yup from "yup";
import axios from "axios";

function Catalogo() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [catalogData, setCatalogData] = useState([]);

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  const handlePriceChange = (event) => {
    setNewPrice(Number(event.target.value));
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);

    if (newItem && newPrice !== "") {
      handleCadastro();
    }
  };

  const handleAddItem = () => {
    if (newItem && newPrice >= 0 && categoryFilter !== "all") {
      const item = {
        id: Date.now(),
        name: newItem,
        category: categoryFilter,
        price: newPrice,
      };

      setItems([...items, item]);
      setNewItem("");
      setNewPrice("");
      handleCadastro();
    }
  };

  const fetchCatalogData = async () => {
    try {
      const response = await axios.get("http://localhost:4003/getcategoria");
      setCatalogData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4003/delcategoria/${itemId}`);
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
      fetchCatalogData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4003/getcategoria");
        setCatalogData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const schema = Yup.object().shape({
    product: Yup.string().required("O nome do produto é obrigatório."),
    price: Yup.number()
      .required("O preço é obrigatório.")
      .positive("O preço deve ser maior que zero."),
  });

  const handleCadastro = async () => {
    try {
      await schema.validate(
        { product: newItem, price: newPrice },
        { abortEarly: false }
      );

      await axios.post("http://localhost:4003/categoria", {
        category: categoryFilter,
        product: newItem,
        price: newPrice,
      });

      const response = await axios.get("http://localhost:4003/getcategoria");
      setCatalogData(response.data);

      setNewItem("");
      setNewPrice("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log("Validation error:", error.errors);
      } else {
        console.error(error);
      }
    }
  };

  const filteredItems = catalogData.filter((item) => {
    if (categoryFilter === "all") {
      return true;
    } else {
      return item.category === categoryFilter;
    }
  });

  return (
    <div className="container">
      <h1 className="title">Catálogo de Produtos</h1>

      <div className="filters">
        <label htmlFor="category-filter">Filtrar por categoria:</label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="all">Todas as categorias</option>
          <option value="Bebidas">Bebidas</option>
          <option value="naoalcoolicos">Não Alcoólicos</option>
          <option value="porcoes">Porções</option>
          <option value="espetos">Espetos</option>
          {/* Adicione mais opções de categoria conforme necessário */}
        </select>
      </div>

      <div className="add-item">
        <input
          type="text"
          value={newItem}
          onChange={handleInputChange}
          className="item-input"
          placeholder="Nome do produto"
        />
        <input
          type="number"
          value={newPrice}
          onChange={handlePriceChange}
          className="price-input"
          placeholder="Preço"
        />
        <button
          onClick={handleAddItem}
          className="add-button"
          disabled={categoryFilter === "all"}
        >
          Adicionar Produto
        </button>
      </div>
      <h2>Produtos</h2>
      <ul className="product-list">
        {filteredItems.map((item) => (
          <li key={item.id} className="product-item">
            <span className="product-name">{item.product}</span>
            <span className="product-category">Categoria: {item.category}</span>
            <span className="product-price">Preço: R$ {item.price}</span>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="delete-button"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Catalogo;
