import { useMemo } from "react";
import { useAllGetProduct } from "./useProduct";
import { useAllGetSales } from "./userSales"
import { useAllGetUser } from "./useUser";


export const useDashboard = () => {

    const token = localStorage.getItem("accessToken");

    
    const {data: salesList=[]} = useAllGetSales();
    const {data: productList=[]} = useAllGetProduct();
    const {data: userList=[]} = useAllGetUser();
    console.log("sales", salesList);
    console.log("users", userList);
    console.log("products", productList);

    console.log(Array.isArray(salesList));
    console.log(Array.isArray(userList));
    console.log(Array.isArray(productList));

    // 핵심 성과 지표
    const kpi = useMemo(() => {

        // 총 매출액
        console.log("BEFORE REDUCE:", salesList);
        const totalSalesAmount = salesList.reduce((sum, item) => {
            return sum + Number(item?.total_price || 0);
        }, 0);

        // 판매건수
        const totalOrderCount = salesList.length;
        // 판매수량
        const totalQuantity = salesList.reduce((sum, item) => (
            sum + Number(item.quantity)
        ), 0)
        // 고객 수
        const customerCount = userList.length
        // 상품 수
        console.log(productList);
        const productCount = productList.length

        return {
            totalOrderCount, totalQuantity, totalSalesAmount, customerCount, productCount
        }

    }, [salesList, productList, userList ])

    // 고객 랭킹
    const userRanking = useMemo(() => {
        const obj = {}

        salesList.forEach(item => {
            obj[item.user_id] = (obj[item.user_id] || 0) + 1
        });

        console.log(userList);

        const userRankingObj = Object.entries(obj).map(([userId, count ]) =>{
            const user = userList.find(user=> String(user.id) === String(userId))
            return {
                username: user?.username || "unknown",
                count
            }           
        })
        .sort((a,b) => b.count - a.count) // 내림차순
        .slice(0, 10) // 10명 랭킹 출력
    
    return userRankingObj

    }, [salesList, userList])

    // 상품 랭킹
    const productRanking = useMemo(() => {
        const obj = {}

        salesList.forEach(item => {
            obj[item.product_id] = (obj[item.product_id] || 0) + 1
        });

        const productRankingObj = Object.entries(obj).map(([productId, quantity ]) =>{
            const product = productList.find(product=> String(product.id) === String(productId))
            return {
                name: product?.product_name || "unknown",
                quantity
            }           
        })
        .sort((a,b) => b.quantity - a.quantity) // 내림차순
        .slice(0, 10) // 10명 랭킹 출력
    
    return productRankingObj
        
    }, [salesList, productList])


    return {
        kpi, userRanking, productRanking
    }
}