import React, { useMemo, useState } from 'react'
import { useAllGetProduct, useDeleteProduct, usePostRegisterProduct, usePutUpdateProduct } from '../../store/hooks/useProduct'
import { AgGridReact } from 'ag-grid-react';
import ProductModal from './ProductModal';

const ProductTable = () => {

    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(null);
    const {data: productList=[], isLoading, error} = useAllGetProduct();
    const registerMutation = usePostRegisterProduct();
    const updateMutation = usePutUpdateProduct();
    const deleteMutation = useDeleteProduct();

    const handleRegister = () => {
        setNewProduct(null)
        setOpen(true)
    }

    const handleUpdate = (item) => {
        setNewProduct(item)
        setOpen(true)
    }

    const handleDelete = async(id) => {
        if(window.confirm("삭제 하시겠습니까?")){
            await deleteMutation.mutateAsync(id)
        }
    }


    const columnDefs = useMemo(()=> (
    [ 
        {field: "product_name", headerName: "상품명", flex: 1},
        {field: "color", headerName: "색상", flex: 1},
        {field: "price", headerName: "원가", flex: 1},
        {field: "sales_price", headerName: "판매가", flex: 1},
        {field: "product_category_code", headerName: "카테고리 코드", flex: 1},
        {headerName: "상품 관리",
            cellRenderer : (params) => (
                <div>
                    <button onClick={() => handleUpdate(params.data)}>수정</button>
                    <button onClick={() => handleDelete(params.data.id)}>삭제</button>
                </div>
            ),
            flex: 1},
    ]
    ), [])

    if(isLoading) return <h3>Loading</h3>
    if (error) return <h3>{error.message}</h3>

  return (
    <>
    <div>
        <div>상품 관리</div>
        <button onClick={handleRegister}>상품 등록</button>
    </div>
    <div className='ag-theme-alpine' style={{height: "800px", width: "100%"}}>
      <AgGridReact 
        theme="legacy" 
        rowData={productList} 
        columnDefs={columnDefs} 
        pagination={true} 
        paginationPageSize={25} 
        paginationPageSizeSelector={false} 
        animateRows={true} 
        getRowId={(params) => String(params.data.id)}/>
    </div>

    <ProductModal
        open={open}
        setOpen={setOpen}
        initialValues={newProduct}
        onSubmit={ async (productObj) => {

            if(newProduct) {
                await updateMutation.mutateAsync({...productObj, id: newProduct.id})
            }else {
                await registerMutation.mutateAsync(productObj)
            }
        }}
    >
    </ProductModal>
    
    </>
  )
}

export default ProductTable
