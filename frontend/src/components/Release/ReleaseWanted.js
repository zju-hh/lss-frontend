import React, { useState } from "react";
import agent from '../../agent.js';
import { Container } from "react-bootstrap";
import { Card, CardActions, CardContent, TextField, Typography, Button, InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";


const ReleaseWanted = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [sort, setSort] = useState(1);
    const [count, setCount] = useState(0);
    const [remark, setRemark] = useState('');
    const [transaction, setTransaction] = useState(1);
    const [image, setImage] = useState('');

    async function handleSubmit() {
        agent.GoodWanted.addGoodWanted(name, price, sort, count, remark, transaction, image);
    }

    return (
        <Container style={{ marginTop: "20px" }} maxWidth="sm">
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        发布求购信息
                    </Typography>
                    <TextField
                        required
                        label="商品名称"
                        placeholder="请输入商品名称"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
                    <br />
                    <TextField
                        required
                        label="价格"
                        placeholder="请输入商品价格"
                        value={price}
                        onChange={(event) => { setPrice(event.target.value) }}
                    />
                    <br />
                    <TextField
                        required
                        label="数量"
                        placeholder="请输入商品数量"
                        value={count}
                        onChange={(event) => { setCount(event.target.value) }}
                    />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel>类别</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={sort}
                            label="sort"
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
                    <br />
                    <TextField
                        label="详情"
                        placeholder="输入商品描述"
                        value={remark}
                        onChange={(event) => { setRemark(event.target.value) }}
                    />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel>交易方式</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={transaction}
                            label="transaction"
                            onChange={(event) => { setTransaction(event.target.value) }}
                        >
                            <MenuItem value={1}>邮寄</MenuItem>
                            <MenuItem value={2}>自提</MenuItem>
                            <MenuItem value={3}>当面交易</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <TextField
                        required
                        label="图片"
                        placeholder="请输入商品图片链接"
                        value={image}
                        onChange={(event) => { setImage(event.target.value) }}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleSubmit}>提交</Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default ReleaseWanted;