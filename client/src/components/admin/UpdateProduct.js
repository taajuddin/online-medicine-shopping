// import React, { useState, useEffect } from 'react';
// import Layout from '../core/Layout';
// import {connect} from 'react-redux'
// import { Link } from 'react-router-dom';
// import {getCategories } from '../../actions/categories';
// import { updateProduct} from  '../../actions/products';
// import {deleteProduct} from './apiAdmin'

// const UpdateProduct = (props) => {
//     const [values, setValues] = useState({
//         name: props.product?props.product.name:'',
//         description: props.product?props.product.description:'',
//         price: props.product?props.product.price:'',
//         category: '',
//         quantity: props.product?props.product.quantity:'',
//         photo: '',
//         loading: false,
//         error: '',
//         createdProduct: '',
//         redirectToProfile: false,
//         formData: ''
//     });

//     const {
//         name,
//         description,
//         price,
//         category,
//         quantity,
//         loading,
//         error,
//         createdProduct,
//         redirectToProfile,
//         formData
//     } = values;

//     // load categories and set form data
//     // const init = () => {
//     //     props.dispatch(getCategories())
//     //         if (error) {
//     //             setValues({ ...values, error:error });
//     //         } else {
//     //             setValues({
//     //                 ...values,
//     //                 formData: new FormData()
//     //             });
//     //         }
//     //     ;
//     // };

//     // useEffect(() => {
//     //     init();
//     // }, []);

//     const handleChange = name => event => {
//         setValues({...values,formData:new FormData})
//         const value = name === 'photo' ? event.target.files[0] : event.target.value;
//         setValues({ ...values, [name]: value,formData:new FormData });
//     };

//     const clickSubmit = (event,product) => {
//         event.preventDefault();
//         setValues({ ...values, error: '', loading: true });

//         props.dispatch(updateProduct(props.product._id,props.user._id, product))
//             if (error) {
//                 setValues({ ...values, error:error });
//             } else {
//                 setValues({
//                     ...values,
//                     name: '',
//                     description: '',
//                     photo: '',
//                     price: '',
//                     quantity: '',
//                     loading: false,
//                     createdProduct: name
//                 });
//             }
       
//     };
//     const newPostForm = () => (
//         <form className="mb-3" onSubmit={clickSubmit}>
//             <h4>Post Photo</h4>
//             <div className="form-group">
//                 <label className="btn btn-secondary">
//                     <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
//                 </label>
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Name</label>
//                 <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Description</label>
//                 <textarea onChange={handleChange('description')} className="form-control" value={description} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Price</label>
//                 <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Category</label>
//                 <select onChange={handleChange('category')} className="form-control">
//                     <option>Please select</option>
//                     {props.categories &&
//                         props.categories.map((c, i) => (
//                             <option key={i} value={c._id}>
//                                 {c.name}
//                             </option>
//                         ))}
//                 </select>
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Quantity</label>
//                 <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
//             </div>

//             <button className="btn btn-outline-primary">Update product</button>
//         </form>
//     );

//     const showError = () => (
//         <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
//             {error}
//         </div>
//     );

//     const showSuccess = () => (
//         <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
//             <h2>{`${createdProduct}`} is created!</h2>
//         </div>
//     );

//     const showLoading = () =>
//         loading && (
//             <div className="alert alert-success">
//                 <h2>Loading...</h2>
//             </div>
//         );

//     return (
//         <Layout title="Add a new product" description={`G'day ${props.user.name}, ready to add a new product?`}>
//             <div className="row">
//                 <div className="col-md-8 offset-md-2">
//                     {showLoading()}
//                     {showSuccess()}
//                     {showError()}
//                     {newPostForm()}
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// const mapStateToProps=(state,props)=>{
//     const id=props.match.params.productId
//     return {
//         user:state.users,
//         categories:state.categories,
//         product:state.products.find(product=>product._id===id)
//     }
// }



// export default connect(mapStateToProps)(UpdateProduct);





import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = ({ props,user,match }) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const {
        name,
        description,
        price,
        // categories,
        category,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, user._id, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};
const mapStateToProps=(state)=>{
    return {
        user:state.users
    }
}

export default connect(mapStateToProps)(UpdateProduct);