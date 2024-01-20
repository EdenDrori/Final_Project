import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import nextKey from "generate-my-key";
import ItemComponent from "../../components/ItemComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import likeItemNormalization from "../itemsPage/likeItemNormalization";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import shoePhoto from "../../assets/shoe.jpg";
import clothPhoto from "../../assets/cloth.jpg";
import accsesorisePhoto from "../../assets/accsesorise.jpg";
import blackBackground from "../../assets/darkBackground.jpg";
import blackLeaves from "../../assets/blackLeaves.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FilterCategory from "./FilterCategory";
const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);

  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();

  // useEffect(() => {
  //   if (!initialDataFromServer.length) return;
  //   const filter = query.filter ? query.filter : "";
  //   setDataFromServer(
  //     initialDataFromServer.filter((item) => item.title.startsWith(filter))
  //   );
  // }, [query, initialDataFromServer]);

  //to make the background all of the site:
  // useEffect(() => {
  //   // Apply global styles to the body
  //   document.body.style.margin = "0";
  //   document.body.style.padding = "0";
  //   document.body.style.backgroundColor = `url(${blackBackground})`;
  //   document.body.style.backgroundSize = "cover";

  // }, []);

  const handleSignup = () => {
    navigate(ROUTES.REGISTER);
  };
  const handleReadMore = () => {
    navigate(ROUTES.ABOUT);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${accsesorisePhoto})`,

        backgroundSize: "cover",
        padding: 0,
        margin: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Container
        sx={{ paddingBottom: "60px", backgroundColor: "background.default" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                textAlign: "center",
                marginTop: "10%",
                fontFamily: "serif",
              }}
            >
              Connect, Network, Grow
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                marginBottom: "7%",
                fontWeight: "100",
              }}
            >
              Welcome to My Site, where professionals and businesses come
              together to connect, network, and grow. Explore a diverse array of
              business cards, interact with others, and create your own presence
              in our thriving community. Join now and start making meaningful
              connections.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ArrowDownwardIcon fontSize="large" />
            </Box>
          </div>
        </div>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: "3%" }}
        >
          Our Business Cards
        </Typography>
        <FilterCategory />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "8%",
            marginBottom: "8%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginBottom: "1%",
              marginTop: "3%",
              fontWeight: "500",
            }}
          >
            Create now new account!
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: "1%", fontWeight: "100",paddingLeft:"1%",paddingRight:"1%" }}
          >
            You can like your favorite items and post your oun items for sell
          </Typography>
          <Button
            sx={{
              width: "20vw",
              border: "2px solid rgba(0, 0, 0, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              marginBottom: "3%",
              whiteSpace: "nowrap",
            }}
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </Box>
        <Grid container sx={{marginBottom:"6%"}}>
          <Grid
            item
            xs={0}
            md={4}
            lg={4}
            sx={{
              height: "60vh",
              backgroundImage: `url(${blackLeaves})`,
              backgroundSize: "cover",
            }}
          ></Grid>
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: "1%",
                fontWeight: "100",
                backgroundColor: "sectionBackground.default",
                marginLeft: "5%",
                paddingRight: "2%",
                paddingLeft: "2%",
                "@media (max-width:900px)": {
                  textAlign: "center",
                  marginLeft: "0",
                },
              }}
            >
              Welcome to our Vintage Emporium! 🌟
              <br /> Discover the charm of yesteryear at our one-of-a-kind
              vintage shop, where nostalgia meets sustainable style. Immerse
              yourself in a curated collection of timeless treasures, from
              classic clothing to unique accessories. At our vintage haven, we
              believe in the power of second chances. Each piece has a story to
              tell, waiting for a new chapter with you. By embracing vintage
              fashion, you're not just adding to your wardrobe; you're
              contributing to a more sustainable future. Join us in the journey
              to revive and appreciate the beauty of bygone eras. Whether you're
              here to find a hidden gem or share one of your own, our vintage
              community welcomes you. Let's make a difference, one vintage piece
              at a time. Explore, Rediscover, and Save the Planet in Style! 🌿
            </Typography>
            <Button
              sx={{
                width: "20vw",
                border: "2px solid rgba(0, 0, 0, 0.15)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                marginBottom: "3%",
              }}
              onClick={handleReadMore}
            >
              Read more
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: "sectionBackground.default",
            paddingY: 4,
            marginBottom: "25px",
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Customer Service
                </Typography>
                <Link href="#" sx={{ display: "block" }}>
                  Help
                </Link>
                <Link href="#" sx={{ display: "block" }}>
                  Track Order
                </Link>
                <Link href="#" sx={{ display: "block" }}>
                  Returns & Exchanges
                </Link>
                <Link href="#" sx={{ display: "block" }}>
                  FAQs
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Quick Links
                </Typography>
                <Link href="#" sx={{ display: "block" }}>
                  Find a Store
                </Link>
                <Link href="#" sx={{ display: "block" }}>
                  Size Guide
                </Link>
                <Link href="#" sx={{ display: "block" }}>
                  Gift Cards
                </Link>
                <Link href="#" sx={{ display: "block" }}>
                  Student Discount
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Connect with Us
                </Typography>
                <IconButton>
                  <Link href="#" color="inherit">
                    <FacebookIcon />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link href="#" color="inherit">
                    <TwitterIcon />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link href="#" color="inherit">
                    <InstagramIcon />
                  </Link>
                </IconButton>
                <IconButton>
                  <Link href="#" color="inherit">
                    <PinterestIcon />
                  </Link>
                </IconButton>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* 
      <Box sx={{ backgroundColor: "#f7f7f7", paddingY: 4 }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Customer Service
              </Typography>
              <Typography>Help</Typography>
              <Typography>Track Order</Typography>
              <Typography>Returns & Exchanges</Typography>
              <Typography>FAQs</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Quick Links
              </Typography>
              <Typography>Find a Store</Typography>
              <Typography>Size Guide</Typography>
              <Typography>Gift Cards</Typography>
              <Typography>Student Discount</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Connect with Us
              </Typography>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
              <IconButton>
                <PinterestIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box> */}
      </Container>
    </Box>
  );
};

export default HomePage;
