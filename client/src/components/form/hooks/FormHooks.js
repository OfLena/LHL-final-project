import { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function UseFormData(props) {
  const {
    user,
    recipes,
    state,
    setState,
    editForm,
    currentPage,
    setCurrentPage,
  } = props;

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({ user_id: user.id, id: uuidv4() });

  const [ingredientRows, setIngredientRows] = useState(
    [{ ingredient: "", measurement: "" }] || ""
  );

  const [instructionRows, setInstructionRows] = useState(
    [{ instruction: "" }] || ""
  );

  const [image, setImage] = useState("" || {});

  const [previewImage, setPreviewImage] = useState({
    isTextVisible: "image-preview__image",
  });

  // EDIT RECIPE STATE
  const [editRecipe, setEditRecipe] = useState("" || {});

  // ======== USE EFFECTS ===== //

  useEffect(() => {
    const instructionArr = instructionRows.map(
      (instruction) => instruction.instruction
    );
    instructionArr.forEach((message, index) =>
      setRecipe((prev) => ({
        ...prev,
        [`instruction_${index + 1}`]: `${message}`,
      }))
    );
  }, [instructionRows]);

  useEffect(() => {
    const ingredientArr = ingredientRows.map(
      (ingredient) => ingredient.ingredient
    );
    ingredientArr.forEach((message, index) =>
      setRecipe((prev) => ({
        ...prev,
        [`ingredient_${index + 1}`]: `${message}`,
      }))
    );
  }, [ingredientRows]);

  useEffect(() => {
    const measurementArr = ingredientRows.map(
      (measurement) => measurement.measurement
    );
    measurementArr.forEach((message, index) =>
      setRecipe((prev) => ({
        ...prev,
        [`measurement_${index + 1}`]: `${message}`,
      }))
    );
  }, [ingredientRows]);

  useEffect(() => {
    if (editForm && editRecipe) {
      const currentPage = JSON.parse(localStorage.getItem("currentPage"));

      if (currentPage) {
        setCurrentPage(currentPage);
      }
      // EDIT RECIPE - set edit recipe to recipe object
      let thisRecipeArr = state.filtered_recipes;

      // find the specific recipe
      let findThisRecipe = thisRecipeArr.filter((recipe) =>
        recipe.id === currentPage ? recipe : false
      );

      // Filter Out All Key/Value Pairs where the Value is Falsey
      let filteredRecipe = Object.fromEntries(
        Object.entries(findThisRecipe[0]).filter(([_, v]) => v)
      );

      Promise.all([
        setEditRecipe(filteredRecipe),
        setPreviewImage(() => ({
          image: `http://localhost:8080/images/${filteredRecipe.image_url}`,
        })),
      ]);
    }
  }, [editForm, currentPage]);

  // set entire recipe to individual arrays
  const editRecipePair = Object.entries(editRecipe);

  /* FILTERING OUT ONLY INGREDIENTS FROM EDITRECIPEPAIR */
  const ingredientsEdit = editRecipePair.filter((item) =>
    item[0].includes("ingredient") ? item : false
  );

  /* FILTERING OUT ONLY INSTRUCTIONS FROM EDITRECIPEPAIR */
  const instructionsEdit = editRecipePair.filter((item) =>
    item[0].includes("instruction") ? item : false
  );

  /* FILTERING OUT ONLY MEASUREMENTS FROM EDITRECIPEPAIR */
  const measurementsEdit = editRecipePair.filter((item) =>
    item[0].includes("measurement") ? item : false
  );

  // ==================CHECKBOX HANDLERS =================//

  function handleCheckboxChange(state) {
    setRecipe((prev) => ({ ...prev, ...state }));
  }

  // ================= INGREDIENT ROW HANDLERS =================//
  const handleIngredientRowChange = (idx) => (e) => {
    const { name, value } = e.target;
    const newRow = [...ingredientRows];
    newRow[idx][name] = value;
    setIngredientRows(newRow);
  };

  const handleIngredientAddRow = () => {
    const item = {
      ingredient: "",
      measurement: "",
    };
    setIngredientRows([...ingredientRows, item]);
  };

  const handleIngredientRemoveRow = () => {
    setIngredientRows([...ingredientRows].slice(0, -1));
  };

  // ================= INSTRUCTION ROW HANDLERS ================//
  const handleInstructionRowChange = (idx) => (e) => {
    const { name, value } = e.target;
    const newInstructionRow = [...instructionRows];
    newInstructionRow[idx][name] = value;
    setInstructionRows(newInstructionRow);
  };

  const handleInstructionAddRow = () => {
    const item = {
      instruction: "",
    };
    setInstructionRows([...instructionRows, item]);
  };

  const handleInstructionRemoveRow = () => {
    setInstructionRows([...instructionRows].slice(0, -1));
  };

  const imageSetter = (uploadedImage) => {
    setImage(uploadedImage);
    let reader = new FileReader();
    let file = uploadedImage;
    reader.onloadend = () => {
      setPreviewImage({
        image: reader.result,
        isTextVisible: "image-preview__image-filled",
      });
    };
    reader.readAsDataURL(file);
  };

  // ==================AXIOS CALLS =================//

  function postRecipeAndTags() {
    const formData = new FormData();
    formData.append("img", image);

    Promise.all([
      axios.post("http://localhost:8080/recipes", recipe),
      axios.post("http://localhost:8080/recipes/images", formData),
    ])
      .then((res) => {
        recipe.avatar = user.avatar;
        recipe.recipe_user_name = user.user_name;
        setState((prev) => ({
          ...prev,
          filtered_recipes: [...recipes, recipe],
        }));
        navigate("/");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  const postButton = function () {
    return (
      <Button
        sx={{ width: "100%", height: "4rem" }}
        type="button"
        variant="contained"
        color="black"
        className="btn btn-default pull-left"
        onClick={postRecipeAndTags}
      >
        Post your Recipe
      </Button>
    );
  };

  // EDIT FEATURE - UPDATE BUTTON
  function updateRecipe() {
    const formUpdateData = new FormData();
    formUpdateData.append("img", image);
    Promise.all([
      axios.post("http://localhost:8080/recipes/update", editRecipe),
      axios.post("http://localhost:8080/recipes/images", formUpdateData),
    ])
      .then((all) => {
        editRecipe.avatar = user.avatar;
        editRecipe.recipe_user_name = user.user_name;
        editRecipe.image_url = image.name;
        setState((prev) => ({
          ...prev,
          filtered_recipes: addUpdateFav(),
        }));
        navigate(`/profile`);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  // helper function to remove the non-updated recipe and add in the newly updated recipe

  const addUpdateFav = function () {
    let newArrUpdate = recipes.filter((item) => item.id !== currentPage);

    return (newArrUpdate = [...newArrUpdate, editRecipe]);
  };

  const updateButton = function () {
    return (
      <Button
        type="button"
        variant="contained"
        color="black"
        className="btn btn-default pull-left"
        onClick={updateRecipe}
      >
        Update Recipe
      </Button>
    );
  };

  return {
    editRecipe,
    setEditRecipe,
    setRecipe,
    imageSetter,
    previewImage,
    ingredientRows,
    handleIngredientAddRow,
    handleIngredientRemoveRow,
    updateButton,
    postButton,
    recipe,
    handleCheckboxChange,
    handleInstructionAddRow,
    handleInstructionRemoveRow,
    handleInstructionRowChange,
    instructionRows,
    instructionsEdit,
    handleIngredientRowChange,
    ingredientsEdit,
    measurementsEdit,
    image,
  };
}
