import { Grid, TextField, Button } from "@mui/material";


import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";

// //video_link



export default function FormTitleAndImage (props) {

  
    const {editForm, imageSetter, previewImage, setRecipe, editRecipe, setEditRecipe, recipe} = props


  const parseYoutubeUrl = function (url) {
    
    const regex1 = /\=(.*)/
    const embedCode = url.match(regex1)[1]
    
      editForm ?
      setEditRecipe((prev) => ({...prev, video_link: embedCode }))
      :
      setRecipe((prev) => ({ ...prev, video_link: embedCode }))

  }

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
    <TextField
      fullWidth
      id="video_link"
      label="Video URL"
      name="title"
      placeholder="Video URL"
      // FOR EDIT
      value={editForm ? editRecipe.video_link : null}
      onChange={(e) => parseYoutubeUrl(e.target.value)}
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
          style={{ width: "100%", padding: "16px", marginBottom: '15px' }}
        startIcon={<AddPhotoAlternate />}
        variant="contained"
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


