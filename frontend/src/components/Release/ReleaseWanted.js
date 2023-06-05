import React, { useState } from "react";
import agent from '../../agent.js';
import { Container } from "react-bootstrap";
import { Card, CardActions, CardContent, TextField, Typography, Button, InputLabel, MenuItem, Select, FormControl, Grid } from "@material-ui/core";


const ReleaseWanted = () => {
    const [name, setName] = useState('');
    const [boolName, setBoolName] = useState(false);
    const [price, setPrice] = useState(0);
    const [boolPrice, setBoolPrice] = useState(false);
    const [sort, setSort] = useState(1);
    const [boolSort, setBoolSort] = useState(false);
    const [count, setCount] = useState(0);
    const [boolCount, setBoolCount] = useState(false);
    const [remark, setRemark] = useState('');
    const [transaction, setTransaction] = useState(1);
    const [boolTransaction, setBoolTransaction] = useState(false);
    const [image, setImage] = useState('');
    const [boolImage, setBoolImage] = useState(false);

    async function handleSubmit() {
        if (boolName && boolPrice && boolSort && boolCount && boolTransaction && boolImage) {
            agent.GoodWanted.addGoodWanted(name, price, sort, count, remark, transaction, image);
        }
    }

    return (
        <Container style={{ marginTop: "20px", marginLeft: "15vw", marginRight: "15vw" }} maxWidth="sm">
            <Card style={{ display: 'flex', justifyContent: 'center' }}>
                <CardContent style={{ width: '30vw' }}>
                    <Grid container wrap="nowrap" spacing={3} direction="column">
                        <Grid item>
                            <Typography variant="h6">
                                发布求购信息
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                fullWidth
                                error={!boolName}
                                helperText={boolName ? "" : '商品名称不能为空'}
                                label="商品名称"
                                placeholder="请输入商品名称"
                                value={name}
                                variant="filled"
                                onChange={(event) => {
                                    var v = event.target.value;
                                    setName(v);
                                    if (v === '') {
                                        setBoolName(false);
                                    } else {
                                        setBoolName(true);
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                fullWidth
                                error={!boolPrice}
                                helperText={boolPrice ? "" : '商品价格不能为0'}
                                label="价格"
                                placeholder="请输入商品价格"
                                value={price}
                                variant="filled"
                                onChange={(event) => {
                                    var v = event.target.value;
                                    setPrice(v);
                                    if (v === 0) {
                                        setBoolPrice(false);
                                    } else {
                                        setBoolPrice(true);
                                    }

                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                fullWidth
                                label="数量"
                                placeholder="请输入商品数量"
                                value={count}
                                variant="filled"
                                onChange={(event) => { setCount(event.target.value) }}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel>类别</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={sort}
                                    label="sort"
                                    variant="filled"
                                    onChange={(event) => { setSort(event.target.value) }}
                                >
                                    <MenuItem value={1}>电子产品</MenuItem>
                                    <MenuItem value={2}>书籍</MenuItem>
                                    <MenuItem value={3}>服饰</MenuItem>
                                    <MenuItem value={4}>票类</MenuItem>
                                    <MenuItem value={5}>食品</MenuItem>
                                    <MenuItem value={6}>日用品</MenuItem>
                                    <MenuItem value={7}>其他</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="详情"
                                placeholder="输入商品描述"
                                multiline
                                fullWidth
                                maxRows={4}
                                value={remark}
                                variant="filled"
                                onChange={(event) => { setRemark(event.target.value) }}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel>交易方式</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={transaction}
                                    variant="filled"
                                    label="transaction"
                                    onChange={(event) => { setTransaction(event.target.value) }}
                                >
                                    <MenuItem value={1}>邮寄</MenuItem>
                                    <MenuItem value={2}>自提</MenuItem>
                                    <MenuItem value={3}>当面交易</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                fullWidth
                                label="图片"
                                placeholder="请输入商品图片链接"
                                value={image}
                                variant="filled"
                                onChange={(event) => { setImage(event.target.value) }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" variant="contained" onClick={handleSubmit}>提交</Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default ReleaseWanted;