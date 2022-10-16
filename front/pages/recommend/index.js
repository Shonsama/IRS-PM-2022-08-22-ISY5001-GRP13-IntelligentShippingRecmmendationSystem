import { Input, Button, Typography } from 'antd';
import { recommend } from './api/service';
import { useRoute } from 'next/router'
const { Title } = Typography;

const Recommend = ({ data }) => {
    let centrial_point = data.centrial_point
    let day = data.day
    let goods = data.goods

    return (
        <div className="container">
            <main>
                <div className='goods-list-title'>
                    <div className='goods-list-title-left' style={{marginTop: 5+'px'}}>
                    <Title level={2}>Centrial Point: {centrial_point}</Title>
                    </div>
                    <div className='goods-list-title-right'>
                    </div>
                </div>
                <div className="grid">
                    {
                        goods.map(good=>(
                            <div className="card">
                                <a href={good.url} >
                                    <div className="card-left">
                                    <img src={good.imgUrl} alt="Vercel" height="150" width="150"/>
                                    </div>
                                    <div className="card-right">
                                    <h3>{good.name}</h3>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                </div>
                <div  className="footer-bar">
                    <Title level={2}>Transparent Time: {day} Day</Title>
                </div>
            </main>
            
            <style jsx>{`
                .container {
                    background-color: #f7f7f7;
                    min-height: 100vh;
                    padding: 1.5rem 0.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                main {
                    background-color: white;
                    border: none;
                    box-shadow: 0 12px 5px -10px rgba(0,0,0,0.1), 0 0 4px 0 rgba(0,0,0,0.1);
                    width:55%;
                    padding: 0 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
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
                    margin-top: 1rem;
                    display: flex;
                    width: 100%;
                    padding-left: 30px;
                    border-bottom: 1px solid #eaeaea;
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
                    height: 77vh;
                    overflow-y: scroll;
                    align-items: flex-start;
                    justify-content: center;
                    flex-wrap: wrap;
                    max-width: 800px;
                    margin-top: 0.5rem;
                }
                .footer-bar{
                    bottom: 0px;
                    width:54.5%;
                    padding-left: 28px;
                    padding-top: 10px;
                    border-top: 1px solid #eaeaea;
                    position:absolute;
                    height: 10vh;
                }
                .card {
                    margin: 0.5rem;
                    flex-basis: 95%;
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
export async function getStaticProps() {
    const route = useRoute()
    const data = recommend(route.query)
    return {
      props: {
        data,
      },
    }
}
export default Recommend