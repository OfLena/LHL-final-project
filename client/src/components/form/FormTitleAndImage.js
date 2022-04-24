import { Grid, TextField, Button } from "@mui/material";


import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";




export default function FormTitleAndImage (props) {

  const {editForm, imageSetter, previewImage, setRecipe, editRecipe, setEditRecipe} = props

  return (
    <div>


    <Grid item xs={12} sm={12}>
    <TextField
      fullWidth
      required
      id="title"
      label="Title"
      name="title"
      placeholder="Title"
      // FOR EDIT
      value={editForm ? editRecipe.title : null}
      onChange={(e) => editForm?
        setEditRecipe((prev) => ({...prev, title: e.target.value }))
        :
        setRecipe((prev) => ({ ...prev, title: e.target.value }))
      }
    />
    </Grid>

    <Grid item xs={12} sm={12}>
    
      <input
        className="choose-file"
        accept="image/*"
        type="file"
        id="image_url"
        label="Image URL"
        name="image_url"
      
        onChange={(e) =>
          setRecipe(
            (prev) => ({ ...prev, image_url: e.target.files[0].name }),
            imageSetter(e.target.files[0])
          )
        }
        hidden
      />
     
      
     <label 
     className ="upload-button"
     htmlFor="image_url">
        <Button component="span"
        startIcon={<AddPhotoAlternate />}
        variant="outlined"
        color="yellow" >
        Upload an Image
        </Button>
      </label> 

    
     

    </Grid>

  <Grid item xs={12} sm={12} >
    <div className="image-preview">
      <img  id="image-prev" src={previewImage.image} alt="image-preview" className={previewImage.isTextVisible}/>{previewImage.isTextVisible === 'image-preview__image' ? 'Preview your Image' : null}
    </div>
  </Grid>

  </div>
  )
   
}


