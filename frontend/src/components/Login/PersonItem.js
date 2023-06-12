import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../agent.js'
import {
    AppBar,
    Badge,
    Box,
    Button,
    Card, CardMedia,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    CardActions,
    Collapse,
    Modal

} from '@material-ui/core';

const ItemInfo = ({ item, route, showButton }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const handleImageError = (e) => {
        e.target.src =
            "https://www.ecreativeim.com/blog/wp-content/uploads/2011/05/image-not-found.jpg";
    };

    const handleChange = () => {
        navigate(route, {
            state: {
                name: item.name,
                price: item.price,
                remark: item.remark,
                sort: item.sort,
                count: item.count,
                transaction: item.transaction,
                image: item.image,
                id: item.id
            }
        });
    }
    const handleImageClick = () => {
        setModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setModalOpen(false);
      };

    return (
        <Box
            style={{
                padding: 14,
                border: "1px solid grey",
                borderRadius: 4,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
        >
            <img
                src={item.image}
                alt="Product"
                style={{
                    maxHeight: 200,
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: 4,
                    cursor: "pointer",
                }}
                onClick={handleImageClick}
                onError={(e)=>{e.target.src=agent.Good.convertImageUrl(item.image)}}
            />

            <Modal open={modalOpen} onClose={handleCloseModal}>
                <img
                    src={item.image}
                    alt="Product"
                    style={{
                        maxHeight: "80vh",
                        maxWidth: "80vw",
                        margin: "auto",
                        alignItems :"center",
                    }}
                    onError={(e)=>{e.target.src=agent.Good.convertImageUrl(item.image)}}
                />
            </Modal>

            <Typography variant="h6" style={{ marginTop: 10 }}>
                {item.name}
            </Typography>
            <Typography variant="subtitle1" style={{ color: "#FF5722", fontWeight: "bold" }}>
                Price: {item.price}
            </Typography>
            <Typography variant="body1" style={{ marginTop: 10 }}>
                {item.remark}
            </Typography>
            <Typography variant="body2" style={{ marginTop: 10 }}>
                Category: {item.sort}
            </Typography>
            <Collapse in={showButton}>
                <CardActions>
                    <Button size="small" color="primary" variant="contained" onClick={handleChange} >修改</Button>
                </CardActions>
            </Collapse>
        </Box>

    )
}

const BuyingItems = ({ items }) => {
    return (
        <Box mt={3}>
            <Typography variant="h4" style={{ textAlign: 'center', color: 'Highlight' }}>求购</Typography>
            <hr />
            {items.length > 0 ? (
                <Grid container spacing={3}>
                    {items.map(item => (
                        <Grid item xs={11} key={item.id}>
                            <ItemInfo item={item} route='/ChangeWanted' showButton={true} />
                        </Grid>
                    ))}
                </Grid>
            ) : <Typography style={{ textAlign: 'center', fontSize: 20, color: 'Highlight' }}>空空如也</Typography>
            }
        </Box>
    );
};

const SellingItems = ({ items }) => {
    return (
        <Box mt={3}>
            <Typography variant="h4" style={{ textAlign: 'center', color: 'Highlight' }}>出售</Typography>

            <hr />
            {items.length > 0 ? (
                <Grid container spacing={3}>
                    {items.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <ItemInfo item={item} route='/ChangeSale' showButton={true} />
                        </Grid>
                    ))}
                </Grid>
            ) : <Typography style={{ textAlign: 'center', fontSize: 20, color: 'Highlight' }}>空空如也</Typography>
            }
        </Box>
    );
};

const CartItems = ({ items, dic }) => {
    return (
        <Box mt={3}>
            <Typography variant="h4" style={{ textAlign: 'center', color: 'Highlight' }}>购物车</Typography>
            <hr />
            {items.length > 0 ? (
                <Grid container spacing={2}>
                    {items.map(item => (
                        <Grid item xs={12} key={item.id} >
                            <Card style={{ padding: 14, borderRadius: 11, border: 'none', background: '#f0f0f0' }}>
                                {dic[item.qid] != null ?
                                    <ItemInfo item={dic[item.qid]} showButton={false} />
                                    :
                                    <Typography style={{ textAlign: 'center', alignContent: 'center', fontSize: 20, color: 'Highlight', minHeight: 100, verticalAlign: 'middle' }}>商品不存在！</Typography>
                                }
                                <Box  >
                                    <Typography variant="subtitle1">数量：{item.quantity}</Typography>
                                    <Typography variant="subtitle1">收货地址：{item.address}</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : <Typography style={{ textAlign: 'center', fontSize: 20, color: 'Highlight' }}>空空如也</Typography>
            }
        </Box>
    );
};


const PersonItem = () => {
    const [buyingItems, setBuyingItems] = useState([]);
    const [sellingItems, setSellingItems] = useState([]);
    const [sellPageOff, setSellPageOff] = useState(0);
    const maxDisplayCnt = 10;
    const [cartItems, setCartItems] = useState([]);
    const [goodsDict, setGoodsDict] = useState({});
    const [NavPos, setNavPos] = useState(0);


    const handleChange = (event, newValue) => {
        setNavPos(newValue);
    };

    const SellPageUp = () => {

        console.log(maxDisplayCnt , sellPageOff,sellingItems.length==maxDisplayCnt)

        if (sellingItems.length == maxDisplayCnt) {
            setSellPageOff((sellPageOff + maxDisplayCnt));
        }
        

    }

    const SellPageDown = () => {

        setSellPageOff((Math.max(0, sellPageOff - maxDisplayCnt)));


    }

    const fetchData = async () => {
        const [buys, sells, carts] = await Promise.all([
            agent.Profile.getBuy(),
            agent.Profile.getPartSell(maxDisplayCnt, sellPageOff),
            agent.Profile.getCart()
        ]);


        console.log(sells, carts, buys)
        setBuyingItems(buys);
        setSellingItems(sells);
        setCartItems(carts);


        const goodsDict = {};
        for (const item of carts) {
            //注意这个有个qid
            const id = item.qid;
            if (id in goodsDict) continue
            const goodDetail = await agent.Good.getGoodDetail(id);
            goodsDict[id] = goodDetail;
        }
        setGoodsDict(goodsDict);
        
  

    };

    useEffect(() => {
        fetchData();
    }, [sellPageOff]);


    return (
        <div>
            <Container style={{ marginTop: "20px" }}>
                <Box >
                    <Grid container spacing={3}>
                        <Grid item  >
                            <List component="nav" >
                                <ListItem
                                    button
                                    style={{ padding: 14, margin: 11, borderRadius: 11, width: 200 }}
                                    selected={NavPos === 0}
                                    onClick={() => handleChange(null, 0)}
                                >
                                    <ListItemText primary="个人求购的商品" />
                                    <Badge color="primary" badgeContent={buyingItems.length} style={{ margin: 11 }} />
                                </ListItem>
                                <ListItem
                                    button
                                    style={{ padding: 14, margin: 11, borderRadius: 11, width: 200 }}
                                    selected={NavPos === 1}
                                    onClick={() => handleChange(null, 1)}
                                >
                                    <ListItemText primary="个人出售的商品" />
                                    <Badge color="primary" badgeContent={sellingItems.length} style={{ margin: 11 }} />
                                </ListItem>
                                <ListItem
                                    button
                                    style={{ padding: 14, margin: 11, borderRadius: 11, width: 200 }}
                                    selected={NavPos === 2}
                                    onClick={() => handleChange(null, 2)}
                                >
                                    <ListItemText primary="购物车" style={{ textAlign: 'left' }} />
                                    <Badge color="primary" badgeContent={cartItems.length} style={{ margin: 11 }} />
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item xs={7} md={6} >

                            <TabPanel value={NavPos} index={0}>
                                <BuyingItems items={buyingItems} />
                            </TabPanel>
                            <TabPanel value={NavPos} index={1}>
                                <SellingItems items={sellingItems} />
                            </TabPanel>
                            <TabPanel value={NavPos} index={2}>
                                <CartItems items={cartItems} dic={goodsDict} />
                            </TabPanel>
                            < TabPanel value={NavPos} index={1}>
                                <Button variant="contained" color="primary" onClick={SellPageDown} disabled={sellPageOff==0}>后退</Button>
                                <Button variant="contained" color="primary" onClick={SellPageUp} disabled={sellingItems.length<maxDisplayCnt} >前进</Button>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};
const TabPanel = ({ children, value, index }) => {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box    >
                    {children}
                </Box>
            )}
        </div>
    );
};

export default PersonItem;