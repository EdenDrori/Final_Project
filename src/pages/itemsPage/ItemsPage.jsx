import { useEffect, useState } from "react";
import { Box, Container, Grid, Link, Typography, Button } from "@mui/material";
import nextKey from "generate-my-key";
import ItemComponent from "../../components/ItemComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import likeItemNormalization from "./likeItemNormalization";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ItemsPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const [initialFilteredData, setInitialFilteredData] = useState([]);
  const [refreshState, setRefreshState] = useState("");
  const navigate = useNavigate();
  
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  useEffect(() => {
    // setTimeout(() => {
    //   setRefreshState("1");
    // }, 1000);
    axios
      .get("/items")
      .then(({ data }) => {
        console.log("data", data);
        if (userData) data = likeItemNormalization(data, userData._id);
        console.log("userData", userData);
        setInitialDataFromServer(data);
        setDataFromServer(data);
      })
      .catch((err) => {
        toast("Can't get the items from server", {
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

  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initialDataFromServer.filter((item) => item.title.startsWith(filter))
    );
  }, [query, initialDataFromServer]);

  const handleDeleteItem = async (_id) => {
    try {
      const { data } = await axios.delete("/items/" + _id);
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((item) => item._id != _id)
      );
    } catch (err) {
      toast("You can only delete your items", {
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
  const handleEditItem = async (_id) => {
    try {
      const { data } = await axios.get("/items/" + _id);
      if (data.user_id == userData._id || userData.isAdmin) {
        navigate(`${ROUTES.EDITITEM}/${_id}`);
      } else {
        toast("You can only edit your items", {
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
    } catch (err) {
      toast("There's a problem with the edit request from server", {
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
      setInitialDataFromServer(
        initialDataFromServer.map((item) =>
          item._id == _id ? { ...item, likes: !item.likes } : item
        )
      );
    } catch (err) {
      toast("There's a problem with the likes request from server", {
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
  const handleViewItem = async (_id) => {
    navigate(`${ROUTES.ITEM}/${_id}`);
  };

  const handleAllItems = () => {
    navigate(ROUTES.ITEMS);
  };
  const handleLikeSuccess = (_id) => {
    setInitialDataFromServer(
      initialDataFromServer.map((item) =>
        item._id == _id ? { ...item, likes: !item.likes } : item
      )
    );
  };
  const handleCategoryButton = (e) => {
    console.log(initialDataFromServer);
    if (!initialDataFromServer.length) return;
    const category = e.target.value;
    navigate(`${ROUTES.ITEMS}?filter=${category}`);
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initialDataFromServer.filter((item) => item.title.startsWith(filter))
    );
  };

 
  // const handleDressesFilter = () => {
  //   console.log(initialDataFromServer);
  //   if (!initialDataFromServer.length) return;
  //   setDataFromServer(
  //     initialDataFromServer.filter((item) => item.title.startsWith("Dress"))
  //   );
  // };
  // const handleBeltsFilter = () => {
  //   console.log(initialDataFromServer);
  //   if (!initialDataFromServer.length) return;
  //   setInitialDataFromServer(
  //     initialDataFromServer.filter((item) => item.title.startsWith("Belt"))
  //   );
  // };

  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {dataFromServer.map((item) => (
              <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={4}>
                <ItemComponent
                  _id={item._id}
                  title={item.title}
                  brand={item.brand}
                  price={`${item.price.value}  ${item.price.currency}`}
                  size={item.size}
                  status={item.status}
                  phone={item.phone}
                  address={`${item.address.city}, ${item.address.street} ${item.address.houseNumber}`}
                  img={item.image.url}
                  alt={item.image.alt}
                  description={item.description}
                  date={item.createdAt}
                  bizNumber={item.bizNumber}
                  like={item.likes}
                  itemNumber={item.itemNumber}
                  //onDeleteItem={handleDeleteItem}
                  //onEditItem={handleEditItem}
                  onLikeItem={handleLikeItem}
                  onLikeSuccess={handleLikeSuccess}
                  onViewItem={handleViewItem}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //alignItems: "center",
              //justifyContent: "center",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="Belt"
              onClick={handleCategoryButton}
            >
              Belts
            </Button>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="Dress"
              onClick={handleCategoryButton}
            >
              Dresses
            </Button>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="Bag"
              onClick={handleCategoryButton}
            >
              Bags
            </Button>
          </Box>
        </Grid>
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
        onClick={handleAllItems}
      >
        Back to all items
      </Button>
      {/* <div className="App">
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} />
        <img src={file} />
      </div> */}
    </Container>
  );
};

export default ItemsPage;
