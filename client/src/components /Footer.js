
import "./styles/footer.scss"

import { IconButton, Grid} from "@mui/material";

import  YouTubeIcon  from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer () {
  return (

    <footer>
    <div className="container">
        <div className="left section">
            <h2>About Us</h2>
            <div className="content">
                <p>Potluck is a collabrative Recipe webiste without all the fluff. Hate reading an autobiograpy and trying to navigate through paywalls while searching for dinner? Boy, do we have an app for you!</p>
            <div className="social">
                <IconButton href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><span className="fab fa-facebook-f"><FacebookIcon className="footer-icon"/></span></IconButton>
                <IconButton href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><span className="fab fa-instagram"><InstagramIcon className="footer-icon"/></span></IconButton>
                <IconButton href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><span className="fab fa-instagram"><YouTubeIcon className="footer-icon"/></span></IconButton> 
            </div>
            </div>
        </div>

        <div className="center section">
            <h2>Contact Us</h2>
            <div className="content">
                <div className="place">
                    <span className="fas fa-map-marker-alt"></span>
                    <span className="text"> P.Sherman, 42 Wallaby Way, Sydney, Aus </span>
                </div>
                <div className="phone">
                    <span className="fas fa-phone-alt"></span>
                    <span className="text"> 1-555-555-5555</span>
                </div>
                <div className="email">
                    <span className="fas fa-envelope"></span>
                    <span className="text"> contact@example.com</span>
                </div>
            </div>
        </div>

    </div>
  </footer>
  );
};
  