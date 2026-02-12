import { useState } from "react"

function Cart() {
    const ProductName = "IPhone13"
    const price = 60000
    const [count, setCount] = useState(1)
    function AddProduct() {
        setCount(count + 1)
    }
    
    function RemoveProduct() {
        if(count <= 1){
            alert("Product Never Negitave")
            return
        }
        setCount(count - 1)
    }


    return (
        <>

            <div className="container d-flex justify-content-center mt-5">
                <div className="card product-card shadow-lg">
                    <div className="card-body text-center">

                        <h5 className="text-muted mb-2">Product</h5>
                        <h2 className="card-title fw-bold mb-4">
                            📱 {ProductName}
                        </h2>

                        {/* Quantity Controls */}
                        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                            <button
                                className="btn btn-outline-danger btn-lg"
                                onClick={RemoveProduct}
                            >
                                −
                            </button>

                            <span className="count-display">{count}</span>

                            <button
                                className="btn btn-outline-success btn-lg"
                                onClick={AddProduct}
                            >
                                +
                            </button>
                        </div>

                        {/* Action */}
                        <button className="btn btn-primary  " onClick={ () =>alert("Bakend leaen Express Buddy")}>
                            Buy Now
                        </button>

                    </div>
                </div>
            </div>


        </>

    )
}

export default Cart