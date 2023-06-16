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
    Modal,
    IconButton

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
                display: "flex",
                alignItems: "center",
                padding: 14,
                border: "1px solid #f2f2f2",
                borderRadius: 4,
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                background: "white",
            }}
        >
            <div style={{ flex: 1 }}>
                <Typography variant="h6" style={{ marginBottom: 10, fontFamily: "Helvetica Neue", fontWeight: "bold" }}>
                    {item.name}
                </Typography>
                <Typography variant="subtitle1" style={{ color: "#0070c9", fontWeight: "bold" }}>
                    Price: {item.price}
                </Typography>
                <Typography variant="body1" style={{ marginTop: 10, fontFamily: "Helvetica Neue" }}>
                    {item.remark}
                </Typography>
                <Typography variant="body2" style={{ marginTop: 10, color: "grey", fontFamily: "Helvetica Neue" }}>
                    Category: {item.sort}
                </Typography>
                <Collapse in={showButton}>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained" style={{ background: "#0070c9", fontFamily: "Helvetica Neue" }} onClick={handleChange}>
                            修改
                        </Button>
                    </CardActions>
                </Collapse>
            </div>
            <div style={{ flex: "none", marginLeft: 20 }}>
                <img
                    src={item.image}
                    alt="Product"
                    style={{
                        maxHeight: 150,
                        maxWidth: 150,
                        objectFit: "cover",
                        borderRadius: 8,
                        cursor: "pointer",
                    }}
                    onClick={handleImageClick}
                    onError={(e) => {
                        e.target.src = agent.Good.convertImageUrl(item.image);
                    }}
                />
            </div>

            <Modal open={modalOpen} onClose={handleCloseModal}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        width: "100vw",
                        transition: "ease-in-out",
                    }}
                >
                    <img
                        src={item.image}
                        alt="Product"
                        style={{
                            maxHeight: "80vh",
                            maxWidth: "80vw",
                        }}
                        onError={(e) => {
                            e.target.src = agent.Good.convertImageUrl(item.image);
                        }}
                    />
                </div>
            </Modal>
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


    const deleteSellItem = async (item) => {
        await agent.Profile.deleteSell(item.id)
        alert("成功删除售卖！")
    }
    return (
        <Box mt={3}>
            <Typography variant="h4" style={{ textAlign: 'center', color: 'Highlight' }}>出售</Typography>

            <hr />
            {items.length > 0 ? (
                <Grid container spacing={3}>
                    {items.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <ItemInfo item={item} route='/ChangeSale' showButton={true} />
                            <IconButton style={{ marginLeft: 14 }} onClick={() =>deleteSellItem(item)}>
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </IconButton>
                        </Grid>

                    ))}

                </Grid>
            ) : <Typography style={{ textAlign: 'center', fontSize: 20, color: 'Highlight' }}>空空如也</Typography>
            }
        </Box>
    );
};

const CartItems = ({ items, dic }) => {

    const calculateTotalPrice = () => {
        var totalPrice = 0
        for (const item of items) {
            totalPrice += dic[item.qid].price
        }
        return totalPrice
    }

    const deleteCartItem = async (item) => {
        await Promise.all([agent.Profile.deleteCart(item.uid, item.qid)])
        alert("成功删除购物车！")
    }
    return (
        <Box mt={3}>
            <Typography variant="h4" style={{ textAlign: 'center', color: 'Highlight' }}>购物车</Typography>
            <hr />
            {items.length > 0 ? (
                <Grid container spacing={2}>
                    {items.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <Card style={{ padding: 14, borderRadius: 11, border: "none", background: "#f0f0f0" }}>
                                {dic[item.qid] != null ? (
                                    <div style={{ display: "flex" }}>
                                        <div style={{ flex: 1 }}>
                                            <img
                                                src={dic[item.qid].image}
                                                alt="Product"
                                                style={{
                                                    maxHeight: 150,
                                                    maxWidth: 150,
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                    cursor: "pointer",
                                                }}
                                                onError={(e) => {
                                                    e.target.src = agent.Good.convertImageUrl(dic[item.qid].image);
                                                }} />
                                        </div>
                                        <div style={{ flex: 2, paddingLeft: 14 }}>
                                            <Typography variant="h6" style={{ fontFamily: "Helvetica Neue", fontWeight: "bold" }}>
                                                {dic[item.qid].name}
                                            </Typography>
                                            <Typography variant="subtitle1" style={{ color: "#0070c9", fontWeight: "bold" }}>
                                                Price: {dic[item.qid].price}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginTop: 10, color: "grey", fontFamily: "Helvetica Neue" }}>
                                                Quantity: {item.quantity}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginTop: 10, fontFamily: "Helvetica Neue" }}>
                                                Address: {item.address}
                                            </Typography>
                                        </div>
                                        <IconButton style={{ marginLeft: 14 }} onClick={() =>deleteCartItem(item)}>
                                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </IconButton>
                                    </div>
                                ) : (
                                    <Typography style={{ textAlign: "center", fontSize: 20, color: "Highlight", minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        商品不存在！
                                    </Typography>
                                )}
                            </Card>
                        </Grid>

                    ))}
                    <hr />
                    <div style={{ flex: 1, textAlign: "right" }}>
                        <Typography variant="h6" style={{ fontFamily: "Helvetica Neue", fontWeight: "bold" }}>
                            Total:
                        </Typography>
                        <Typography variant="h6" style={{ color: "#0070c9", fontWeight: "bold" }}>
                            {calculateTotalPrice()}
                        </Typography>
                    </div>
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

        console.log(maxDisplayCnt, sellPageOff, sellingItems.length == maxDisplayCnt)

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
                            <TabPanel value={NavPos} index={1}>
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                    <Button variant="contained" color="primary" onClick={SellPageDown} disabled={sellPageOff === 0} style={{ marginRight: '10px', padding: '18px' }}>
                                        后退
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={SellPageUp} disabled={sellingItems.length < maxDisplayCnt} style={{ marginLeft: '10px', padding: '18px' }}>
                                        前进
                                    </Button>
                                </div>
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