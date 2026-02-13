function addIngredient() {
    const div = document.createElement("div");
    div.className = "ingredient";
    div.innerHTML = `
      <input placeholder="Name">
      <input type="number" placeholder="Quantity">
      <input placeholder="Unit">
      <button class="remove-btn" onclick="removeIngredient(this)">Remove</button>
    `;
    document.getElementById("ingredients").appendChild(div);
  }
  
  function removeIngredient(button) {
    button.parentElement.remove();
  }
  
  function submitRecipe() {
    const title = document.getElementById("title").value;
    const servings = parseInt(document.getElementById("servings").value);
    const description = document.getElementById("description").value;
    const instructions = document.getElementById("instructions").value;
  
    const ingredientDivs = document.querySelectorAll(".ingredient");
    const ingredients = Array.from(ingredientDivs).map(div => {
      const inputs = div.querySelectorAll("input");
      return { name: inputs[0].value, quantity: parseFloat(inputs[1].value), unit: inputs[2].value };
    });
  
    fetch("https://recipeblog2-0.onrender.com/api/recipes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, servings, description, instructions, ingredients })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("response").textContent = JSON.stringify(data, null, 2);
    })
    .catch(err => {
      document.getElementById("response").textContent = "Error: " + err;
    });
  }