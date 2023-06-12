import { Typography, Avatar, Grid, makeStyles, Box, Card, CardContent, CardMedia, Button, TextField, TabPanel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import agent from "../../agent"
import './Details.css';
import { forEach } from "react-bootstrap/ElementChildren"


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F5F5F5',
        padding: theme.spacing(2)
    }
}))

const transENUM = {
    1: "邮寄",
    2: "自提",
    3: "当面交易",
}

const sortENUM = {
    0: "笔记本",
    1: "二手家具",
    2: "二手手机",
    3: "家居日用",
    4: "家用电器",
    5: "乐器/运动",
    6: "门票卡券",
    7: "母婴用品",
    8: "平板电脑",
    9: "手机配件",
    10: "数码产品",
    11: "台式电脑",
    12: "箱包服饰",
    13: "照相机",
    14: "其他"
}

const displayENUM = {
    1: "在售",
    0: "下架",
}

const ItemInfo = ({item}) => {
    return (
        <div className="comment-box">
            <div className="comment-meta">
                <div className="comment-content">{item.content}</div>
                <div className="comment-name">评论用户id：{item.uid}</div>
                <div className="comment-time">评价时间：{item.modify}</div>
            </div>
        </div>
    )
}

const CommentItems = ({items}) => {
    return (
        <Box mt={3}>
            {items.length > 0 ? (
                <Grid container spacing={3}>
                    {items.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <ItemInfo item={item}/>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div className="no-comments">
                    还没有评论哦！
                </div>
            )
            }
        </Box>
    );
};

const CommentForm = ({ onSubmit}) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(comment);
        setComment('');
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea
                        className="comment-input"
                        placeholder="发表评论..."
                        value={comment}
                        onChange={handleChange}
                    />
            <button
                className="comment-submit-button"
                type="submit"
                disabled={!comment}
            >
                发布
            </button>
        </form>
    );
};

function Details () {
    const classes = useStyles()
    const [goodInfo, setGoodInfo] = useState([])
    const [adding, setAdding] = useState(false);
    const [details, setDetails] = useState(false);
    const [imgURL, setImgURL] = useState("");
    const [commentsItems, setCommentsItems] = useState([]);
    const [params] = useSearchParams();
    const qid = params.get('id');
    const fetchData = async () => {
        const [info, comments] = await Promise.all([
            agent.Good.getGoodDetail(qid),
            agent.Good.getGoodComment(qid)
        ])
        // console.log(info.msg)
        setGoodInfo(info)
        setCommentsItems(comments)
        console.log(goodInfo)
        console.log(commentsItems)
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function addGoods() {
        if (navigator.onLine) {
            Promise.all([
                agent.Cart.addToCart(goodInfo.id)
            ]).then(results => {
                const allSucceeded = results.every(result => result.result === 1);
                if (allSucceeded) {
                    alert("加入购物车成功！");
                } else {
                    alert("加入购物车失败！");
                }
                setAdding(false)
            }).catch(error => {
                alert("加入购物车失败！");
            });
        } else {
            alert("网络连接异常，请检查网络设置！");
        }
    }

    const handleSubmitComment = (comment) => {
        console.log(comment);
        if (navigator.onLine) {
            Promise.all([
                agent.Good.addComment(goodInfo.id, comment)
            ]).then(results => {
                const allSucceeded = results.every(result => result.result === 1);
                if (allSucceeded) {
                    alert("评论成功！");
                } else {
                    alert("评论失败");
                }
            }).catch(error => {
                alert("评论失败");
            });
        } else {
            alert("网络连接异常，请检查网络设置！");
        }
        fetchData();
    }


    async function showDetails() {
        setDetails(true);
        const pattern = /\.net\//;
        const dotNetIndex = goodInfo.image.search(pattern);
        if(dotNetIndex !== -1){
            setImgURL("http://10.214.241.122:8080/image/get?fileName=" + goodInfo.image.split(".net/")[1])
        }
        else{
            setImgURL("http://10.214.241.122:8080/image/get?fileName=" + goodInfo.image)
        }
    }

    return (
        <Box className={classes.root} >
            <Grid container spacing={10} >
                <Grid item xs={12} className={classes.textCenter} >
                    <div className="goods-box">
                        <span className="goods-image">
                            <div className="goods-name">{goodInfo.name}</div>
                            <CardMedia
                                component="img"
                                height="350"
                                image={imgURL}
                                style={{}}
                                onError={(e) => {
                                    e.target.src = {imgURL};
                                    // setImgURL("http://10.214.241.122:8080/image/get?fileName=" + goodInfo.image.split(".net/")[1])
                                }}
                            />
                        </span>
                        <span className="goods-desc">
                            <div>
                                {details ?
                                <></>
                                    :
                                    <button className="button" onClick={showDetails}>
                                        显示详情
                                    </button>
                                }
                            </div>
                            <div>
                                {details ?
                                    <>
                                        <span className="goods-desc">
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    商品成色：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {goodInfo.level}成新
                                                </span>
                                            </div>
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    商品描述：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {goodInfo.remark}
                                                </span>
                                            </div>
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    商品类别：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {sortENUM[goodInfo.sort]}
                                                </span>
                                            </div>
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    交易方式：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {transENUM[goodInfo.transaction]}
                                                </span>
                                            </div>
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    商品数量：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {goodInfo.count}
                                                </span>
                                            </div>
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    商品销量：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {goodInfo.sales}
                                                </span>
                                            </div>
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    商品状态：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {displayENUM[goodInfo.display]}
                                                </span>
                                            </div>
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    商品价格：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {goodInfo.price.toFixed(2)}元
                                                </span>
                                            </div>
                                            <div className="goods-desc-box">
                                                <span className="goods-desc-name">
                                                    信息更新时间：
                                                </span>
                                                <span className="goods-desc-data">
                                                    {goodInfo.modify}
                                                </span>
                                            </div>
                                            <button className="button" onClick={addGoods}>
                                                        加入购物车
                                            </button>
                                                            {/*<div>卖家id：{goodInfo.uid}</div>*/}
                                        </span>
                                        {/*<div className="comment">*/}
                                        {/*    <textarea*/}
                                        {/*        id="content_area"*/}
                                        {/*        cols="50"*/}
                                        {/*        rows="8"*/}
                                        {/*        placeholder="请输入评论内容"*/}
                                        {/*    />*/}
                                        {/*    <br />*/}
                                        {/*    <button className="button" onClick={addComments}>*/}
                                        {/*        发表评论*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </div>
                        </span>
                    </div>
                </Grid>
            </Grid>
           <div>
               {details ?
                   <div className="goods-comment">
                       <div className="comment-title">商品评论</div>
                       <CommentForm onSubmit={handleSubmitComment}/>
                       <CommentItems items={commentsItems}/>
                   </div>
                   :
                   <></>
               }
           </div>
        </Box>
    );
}

export default Details
