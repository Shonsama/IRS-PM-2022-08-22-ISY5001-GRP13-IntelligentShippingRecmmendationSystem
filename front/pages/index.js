import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { getGood } from './api/service';
const { Title } = Typography;

export default function Home() {
  const router = useRouter()
  const [goods, setGoods] = useState([]);
  let link = ""

  const handleClick = (e) => {
    e.preventDefault()
    router.push({
			path: '/recommand',
			query: {
				goods: this.goods,
			}
		})
  }
  const handleAddClick = () => {
    let good = getGood(link)
    goods.add(good)
    setGoods(goods)
  }
  return (
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
            value = {link}
          />

          <Button type="primary" shape="round" size="large" icon={<PlusOutlined />} className='searchButton' onClick={handleAddClick}>
            ADD
          </Button>
        </div>
        <div className="grid">
          <div className='goods-list-title'>
            <div className='goods-list-title-left' style={{marginTop: 5+'px'}}>
              <Title level={4}>Goods</Title>
            </div>
            <div className='goods-list-title-right'>
              <Button type="primary" shape="link" size="large"  onClick={handleClick}>
                Recommend<ArrowRightOutlined />
              </Button>
            </div>
          </div>
          {
            goods.map(good=>(
              <a href={good.url} className="card">
                <div className="card-left">
                  <img src={good.imgUrl} alt="Vercel" height="150" width="150"/>
                </div>
                <div className="card-right">
                  <h3>{good.name}</h3>
                </div>
              </a>
            ))
          }
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
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
          width: 90%;
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
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
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

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        input.ant-input.searchInput{
          width: 85%;
          border-radius: 25px;
          line-height: 2.5;
          padding: 4px 20px;
        }
        button.ant-btn.ant-btn-round.ant-btn-primary.ant-btn-lg.searchButton{
          margin-left: 8px;
          height: 45px;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
