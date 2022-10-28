
## SECTION 1 : PROJECT TITLE

## FastCollect -- Intelligent shopping recommendation system




---

## SECTION 2 : EXECUTIVE SUMMARY / PAPER ABSTRACT

In 2021, the number of newly registered cross-border e-commerce enterprises in China reached an all-time high of 1,486(from:https://cj.sina.com.cn/articles/view/1949671172/74359f040010141at). This means that there are more and more online orders from overseas in China. On the other hand, through the observation of classmates around us, we found that many people still use Taobao for shopping even after they have left China. Even though there are shopping sites like Shopee or Lazada in Singapore, Chinese students are still used to using Taobao. There are many reasons for this. For example, Taobao has a Chinese interface, the habit of using Taobao for many years in China, and it is easier to find the goods you want on Taobao.

But as more overseas buyers appear, there is an obvious problem. Unlike shopping in China, overseas buyers need to receive their goods by air or sea. However, no matter which mode of transportation is chosen, the uncertainty of transportation time is a big pain point for overseas customers.The existence of this problem is not conducive to the development of the international trade market.

A healthy and sustainable international trade market requires a robust logistics system to solve the problems aforementioned. A Logistics system refers to the organic assembly composed of two or more logistics functional units, with the purpose of completing logistics services. The "input" of the logistics system is the labor, equipment, materials and resources of procurement, transportation, storage, and distribution processing. Thus, one of our main idea of doing this project is to optimize the existing logistic system of China to Singapore.

The optimization of logistic systems can be divided into several separate parts which include policy optimization, warehouse distribution optimization, or logistics and transportation modeling. Policy optimization refers to reducing entry and exit procedures at Customs. Generally, the cargo will be stuck in customs for a few days even a few months during the epidemic. Warehouse distribution optimization strategy refers to scientifically choosing the location of warehouses, and ensuring the cargo storage capacity and types of goods every warehouse storage align with local market needs. 

Under the realistic conditions that policy is determined by goverments and warehouse distribution is determined by logistic coperation, we introdeuc a more practical optimization methods for the customers: to select the commodities whose dispatch locationes are close to each other and close to location of consolidation. Hence, we propose a state-of-the-art method to design an intelligent shipping recommendation system to automatically collect information and make decisions. 

Using the techniques imparted to us in lectures, our project team first set out to build a knowledge base as a local file of transport centers in china and their transport time and fee from them to Singapore via searching reports on Internet and time cost of transport from every city in china to these transport centers via Amap API. While building the system, aim to reach the goal of easy to use and use to deploy, we decided to utilize the framework like react to build the user interface and make sure the business logic is simple enough, flask which is based on python to build backend API and no database to make the backend easy to deploy, web crawler based on python to get the significant information from amazon and Taobao extract the feature of data by semantic analysis. The highlight of the system is the recommendation function, which we use Genetic Algorithm implemented by python to get the most optimized selection of goods and transport center to reach the goal of the lowest price and least transport time.

Our project team hopes that with our solution, individual customers could have a better overseas shopping experience and cross-border e-commerce merchants in Singapore could minimize the cost of time and money spent on transportation.

---

## SECTION 3 : CREDITS / PROJECT CONTRIBUTION

| Official Full Name | Student ID (MTech Applicable) | Work Items (Who Did What)                                    | Email (Optional)      |
| :----------------- | :---------------------------: | :----------------------------------------------------------- | :-------------------- |
| Shu Wanyang        |           A0261754B           | Data Acquisition – crawl by Amap API to get the time cost of every city in China to every transport center in China, System architecture design – system/data flow design, system modules design, User Interface development – get good info pages and recommend page, Backend API: POST and GET API of getWeb and recommend, Data cleaning: filter the unsuitable goods from the result of web crawler of taobao, Debug & troubleshooting, Project management, Project report writing | e0983148@u.nus.edu    |
| Yan Jiahuan         |           A0261968M           | Data Acquisition – information of alternative commodities,  Data Processing – process location, identification number, price data, Recommendation system modeling, Genetic Algorithm programming, Debug & troubleshooting, Project management, Project report writing | E0983362@u.nus.edu |
| Xiao Changwei            |           A0226757U           | Project idea generation, Data Processing – Web crawler design and API interface, Capture user requirements, Network server setup – Cloud storage database, Data acquisition - China's prefecture-level city information and wharf information, Project management, Debug & troubleshooting, Project report writing | E0641610@u.nus.edu     |

---

## SECTION 4 : VIDEO OF SYSTEM MODELLING & USE CASE DEMO

[promotion video with use demo](https://www.bilibili.com/video/BV1A14y1L73w/?vd_source=8a13e6a42379e18b5470371239594a54)

[technique video for system architecture and implementaion]()

---

## SECTION 5 : USER GUIDE

Please refer to [user guide](https://github.com/Shonsama/FastCollect/blob/main/ProjectReport/userGuide.md)

---

## SECTION 6 : PROJECT REPORT / PAPER

Refer to project report at Github Folder: [PROJECT REPORT](https://github.com/Shonsama/FastCollect/blob/main/ProjectReport/IRS_Practice_Module_Project_Report.pdf)