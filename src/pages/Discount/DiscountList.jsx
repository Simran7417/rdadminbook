import {useNavigate} from 'react-router-dom'
import{Button,Container,Row,Col,Form,Table}from 'react-bootstrap'
import { useEffect, useState } from 'react'
const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios'
function DiscountList(){
    let [discounts,setDiscounts] = useState([])
    const navigate = useNavigate()
    function goToAddDiscount(){
        navigate('/add/discount')

    }
    function getForEdit(id){
         navigate('/edit/discount/' +id)
    }
    useEffect(()=>{
       axios({
        url: apiUrl + '/discounts',
        method: 'get'
       }).then((res) => {
            setDiscounts(res.data.data)
       })
       .catch((err) => {
            alert(err)
       })
    },[])
    return(
       <Container>
        <Row>
            <Col>
               <Form>
                   <Form.Group>
                     <Form.Control type='text' placeholder='type book name to search'></Form.Control>
                   </Form.Group>

                </Form>
                <Button className='mt-5' varient='success' style={{ float:'right'}} onClick={goToAddDiscount}>Add Discount +</Button>


                </Col>
        </Row>
        <Row>
            <h3 className='mt-2 text-center text-danger'>Discount List</h3>
            <Table bordered hover>
               <thead>
                <tr>
                    <th>Discount Name</th>
                     <th>Discount Type</th>
                      <th>Discount Value</th>
                       <th>Book Name</th>
                       <th>Valid Form</th>
                       <th>Valid To</th>
                       <th>Status</th>
                       <th>Actions</th>
                </tr>
               </thead>
               <tbody>
                {
                    discounts.map((discount)=>
                        <tr>
                            <td>{discount.discountName}</td>
                             <td>{discount.discountType}</td>
                              <td>{discount.discountValue}</td>
                               <td>{discount.book.bookTitle}</td>
                             <td>{new Date(discount.validFrom).toLocaleDateString('en-GB')}</td>
                             <td>{new Date(discount.validTo).toLocaleDateString('en-GB')}</td>
                            
                             <td><span style={{backgroundColor: discount.status === "Active" ? "green" : "red",
                             color: "white",
                             padding: "5px 10px",
                             borderRadius: "5px",
                             fontWeight: "bold"
                             }}
                            >
                            {discount.status}
                                    </span>
                                    </td>
                                    <td>
                                        <Button variant= 'danger' size ='sm' onClick={()=>getForEdit(discount._id)}>Edit</Button>
                                    </td>
                        </tr>
                    )
                }
               </tbody>
            </Table>
        </Row>
       </Container>
    )
}
export default DiscountList