import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { Input, Button, Typography, Spin, Modal, Tag } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { getGood, recommend } from './api/service';
const { Title } = Typography;

export default function Home() {
  const router = useRouter()
  const [goods, setGoods] = useState([]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [res, setRes] = useState({
    goods: [],
    center: "",
    time: "",
    cost: ""
  })
  const handleCancel = (e) => {
    setIsModalOpen(false)
  }
  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)
    let result = await fetch('http://localhost:80/recommend',{
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json' //设置请求头
        },
        method: 'POST',
        body: JSON.stringify({
          keywords: goods.map(item => item.name)
        })
    })
    let res = await result.json() //必须通过此方法才可返回数据
    setLoading(false)
    setIsModalOpen(true)
    setRes(res)
  }
  const handleAddClick = async () => {
    setLoading(true)
    let good = await getGood({ link })
    goods.push(good[0])
    let newGoods = goods.slice(0)
    setGoods(newGoods)
    setLoading(false)
    setLink("")
  }
  const onInputChange = (e) => {
    console.log(e.target.value)
    setLink(e.target.value)
  }
  return (
    <Spin spinning={loading}>
      <div className="container">
        <Head>
          <title>FastCollent</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1 className="title">
            Welcome to <a>FastCollect!</a>
          </h1>

          <p className="description">
            Pasta the link below to get your wanted goods!
          </p>

          <div className='searchBar'>
            <Input
              className='searchInput'
              placeholder="Pasta link here!"
              value={link}
              onChange={onInputChange}
            />
            <Button type="primary" shape="round" size="large" icon={<PlusOutlined />} className='searchButton' onClick={handleAddClick}>
              ADD
            </Button>
          </div>
          <div className="grid">
            <div className='goods-list-title'>
              <div className='goods-list-title-left' style={{ marginTop: 5 + 'px' }}>
                <Title level={4}>Goods</Title>
              </div>
              <div className='goods-list-title-right'>
                <Button type="primary" shape="link" size="large" onClick={handleClick}>
                  Recommend<ArrowRightOutlined />
                </Button>
              </div>
            </div>
            <div className='card-content'>
            {
              goods.map(good => (
                <div className="card">
                  <div className="card-left">
                    <img src={good.img} alt="Vercel" height="150" width="150" />
                  </div>
                  <div className="card-right">
                    <h3>{good.name}</h3>
                    {
                      good.keywords.map(keyword => (
                        <Tag>
                          {keyword}
                        </Tag>
                      ))
                    }
                  </div>
                </div>
              ))
            }
            </div>
          </div>
          <Modal
            title={"Center: " + res.center}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <div className='goods-list-title'>
                <div className='goods-list-title-left'>
                  <h3>{"Time: " + res.time + " Day"}</h3>
                </div>
                <div className='goods-list-title-right'>
                  <h3>{"Money: " + res.cost + " CNY"}</h3>
                </div>
              </div>
            ]}
            width={800}
          >
            <div className='modal'>
            {
              res.goods.map(good => (
                <a href={"https:"+good[4]} target="_blank">
                  <div className="card-modal">
                      <div className="card-left">
                        <img src={"https:"+good[3]} alt="Vercel" height="150" width="150" />
                      </div>
                      <div className="card-right">
                        <h3>{good[1]}</h3>
                        <h4>{"Location: "+ good[2]}</h4>
                        <h4>{"Money: " + good[0] + " CNY"}</h4>
                      </div>
                  </div>
                </a>
              ))
            }
            </div>
          </Modal>
        </main>
        <style jsx>{`
          .container {
            background-color: #f7f7f7;
            width:100%;

            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            width:50%;
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }
          .modal {
            max-height: 60vh;
            overflow-y: scroll;
          }
          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }
          
          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }
          .tag{
            border: 1px solid #eaeaea;
            border-radius: 10px;
          }
          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .searchBar{
            width: 90%
          }
          .goods-list-title{
            display: flex;
            width: 91%;
          }
          .goods-list-title-left{
            display: flex;
            justify-content: flex-start;
          }
          .goods-list-title-right{
            display: flex;
            flex:1;           
            justify-content: flex-end;
          }
          .card-content{
            max-height: 60vh;
            min-width: 100%;
            overflow-y: scroll;
          }
          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            background-color: white;
            margin-top: 3rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
            min-width:100%;
            box-shadow: 0 12px 5px -10px rgba(0,0,0,0.1), 0 0 4px 0 rgba(0,0,0,0.1);
          }

          .card {
            min-height: 200px;
            margin: 0.5rem;
            flex-basis: 90%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            min-width:95%;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
          .card-modal {
            min-height: 200px;
            margin: 0.5rem;
            flex-basis: 90%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
          .card-modal:hover,
          .card-modal:focus,
          .card-modal:active {
            color: #0070f3;
            border-color: #0070f3;
          }
          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }
          .card-left{
            float: left;
            width: 150px;
          }
          .card-right{
            margin-left: 170px;
          }
          .card h3 {
            margin: 0 0 1.5rem 0;
            font-size: 1.2rem;
            word-wrap: break-word;
          }

          .card p {
            margin: 0;
            font-size: 1.2rem;
            line-height: 1.2;
          }

          .logo {
            height: 1em;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style>
      </div>
      
    </Spin>

  )
}
