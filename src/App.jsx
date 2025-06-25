function debounce(callback, delay) {
  let timer;

  return (value) => {
    clearTimeout(timer),
      timer = setTimeout(() => {
        callback(value)
      }, delay)
  }
}

import { useCallback, useState } from 'react'


function App() {

  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleSearch = useCallback(
    debounce((query) => {
      fetch(`http://localhost:3333/products?search=${query}`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error))
        .finally(console.log(products)
        )
    }, 1000), []
  )

  const handleSelection = (p) => {
    fetch(`http://localhost:3333/products/${p.id}}`)
      .then(res => res.json())
      .then(data => setSelectedProduct(data))
      .catch(error => console.error(error))
      .finally(setQuery(''))
  }

  return (
    <>
      <div className="container mt-4">

        <input
          type="text"
          className='form-control'
          value={query}
          onChange={(e) => {
            handleSearch(e.target.value);
            setQuery(e.target.value)
          }}
          placeholder='Cerca...'
        />


        {query &&
          <div className="dropdown-menu show w-100 ">
            {products.map(product => (
              <div
                key={product.id}
                className="dropdown-item"
                onClick={() => {
                  handleSelection(product);
                  setQuery('')
                }}
              >
                {product.name}
              </div>
            ))}
          </div>
        }

        {selectedProduct &&
          <div className="card mt-4 p-3">
            <img src={selectedProduct.image} className="card-img-top" alt={selectedProduct.name} />
            <div className="card-body">
              <h5 className="card-title">{selectedProduct.name}</h5>
              <p className="card-text">Brand: {selectedProduct.brand}</p>
              <p className="card-text">Price: ${selectedProduct.price}</p>
            </div>
          </div>
        }

      </div >

    </>
  )
}

export default App
