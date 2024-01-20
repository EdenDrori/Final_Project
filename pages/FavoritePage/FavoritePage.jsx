import axios from "axios";
import { useEffect, useState } from "react";
import ItemComponent from "../../components/ItemComponent";
import { Container, Grid, Typography } from "@mui/material";
import nextKey from "generate-my-key";
import { useSelector } from "react-redux";
import likeItemNormalization from "../itemsPage/likeItemNormalization";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const FavoritePage = () => {
  const navigate = useNavigate();
  const [dataFromServer, setDataFromServer] = useState([]);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  useEffect(() => {
    axios
      .get("/items")
      .then(({ data }) => {
        if (userData) data = likeItemNormalization(data, userData._id);
        setDataFromServer(data.filter((item) => item.likes == true));
      })
      .catch((err) => {
        toast("Looks like there is problem with the server..", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  const handleLikeSuccess = (_id) => {
    setDataFromServer((current) => {
      const newData = current.filter((x) => x._id !== _id);
      return newData;
    });
  };
  const handleViewItem = async (_id) => {
    navigate(`${ROUTES.ITEM}/${_id}`);
  };

  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", mb: 1, padding: "10px", pb: "0px" }}
      >
        Your Favorites Items
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "3%" }}>
        Curate a collection of your favorite business cards. Easily access and
        stay connected with the profiles that matter most to you. Streamline
        your networking experience.
      </Typography>
      <Grid container spacing={2}>
        {dataFromServer.map((item) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <ItemComponent
              _id={item._id}
              title={item.title}
              brand={item.brand}
              price={`${item.price} $ `}
              size={item.size}
              phone={item.phone}
              //address={`${item.address.city}, ${item.address.street} ${item.address.houseNumber}`}
              img={item.image.url}
              alt={item.image.alt}
              //description={item.description}
              status={item.status}
              //date={item.createdAt}
              //itemNumber={item.itemNumber}
              like={item.likes}
              onViewItem={handleViewItem}
              //onDeleteItem={handleDeleteItem}
              //onEditItem={handleEditItem}
              //onLikeItem={handleLikeItem}
              onLikeSuccess={handleLikeSuccess}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default FavoritePage;
