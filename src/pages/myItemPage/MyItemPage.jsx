import { Container, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import nextKey from "generate-my-key";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import likeItemNormalization from "../itemsPage/likeItemNormalization";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ItemComponent from "../../components/ItemComponent";

const MyItemPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [myItemHeader, setMyItemHeader] = useState(
    "Effortlessly manage, like, edit, or delete your business items. Elevate your professional presence and connections with ease."
  );
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios.get("/items/my-items").then(({ data }) => {
        console.log(data);
        const isItems = data.message;
        if (isItems) {
          //console.log(data.message);
          setMyItemHeader("No items yet, add new item easily now ");
          return;
        }
        if (userData) data = likeItemNormalization(data, userData._id);
        setDataFromServer(data);
      });
    } catch (e) {
      console.log(e, "errorrrrr");
    }
  }, []);
  const handleEditItem = (_id) => {
    navigate(`${ROUTES.EDITITEM}/${_id}`);
  };
  const handleAddItem = () => {
    navigate(ROUTES.ADDITEM);
  };
  const handleDeleteItem = async (_id) => {
    try {
      const { data } = await axios.delete("/items/" + _id);
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((item) => item._id != _id)
      );
    } catch (err) {
      toast("There's a problem at deleting the item from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLikeItem = async (_id) => {
    try {
      const { data } = await axios.patch("/items/" + _id);
    } catch (err) {
      toast("There's a problem at liking the item from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLikeSuccess = (_id) => {
    setDataFromServer(
      dataFromServer.map((item) =>
        item._id == _id ? { ...item, likes: !item.likes } : item
      )
    );
  };
   const handleViewItem = async (_id) => {
     navigate(`${ROUTES.ITEM}/${_id}`);
   };
  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Typography
        variant="h2"
        sx={{
          mb: 1,
          padding: "10px",
          pb: "0px",
          textAlign: "center",
          fontSize: { xs: "2.5rem", md: "4rem" },
        }}
      >
        Your items
      </Typography>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "10%" }}
      >
        {myItemHeader}
      </Typography>
      <Grid container spacing={2}>
        {dataFromServer.map((item) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <ItemComponent
              _id={item._id}
              title={item.title}
              brand={item.brand}
              price={`${item.price.value}  ${item.price.currency}`}
              size={item.size}
              phone={item.phone}
              address={`${item.address.city}, ${item.address.street} ${item.address.houseNumber}`}
              img={item.image.url}
              alt={item.image.alt}
              description={item.description}
              status={item.status}
              date={item.createdAt}
              itemNumber={item.itemNumber}
              like={item.likes}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
              onLikeItem={handleLikeItem}
              onLikeSuccess={handleLikeSuccess}
              onViewItem={handleViewItem}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          width: "30%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={handleAddItem}
      >
        Add your item
      </Button>
    </Container>
  );
};

export default MyItemPage;
