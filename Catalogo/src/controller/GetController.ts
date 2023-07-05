import axios from "axios";

export async function fetchCategories() {
  try {
    const response = await axios.get("http://localhost:4003/categoria");
    return response.data;
  } catch (error) {
    console.error(error);
    return []; // Em caso de erro, retorna um array vazio
  }
}
