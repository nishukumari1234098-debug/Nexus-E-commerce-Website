import { useParams } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams()

    return (
        <div>
            <h1>Products Details</h1>
            <p>Showing details for product ID: {id}</p>
        </div>
    )
 }

 export default ProductDetails