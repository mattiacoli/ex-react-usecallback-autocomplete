function debounce(callback, delay) {
  let timer;

  return (value) => {
    clearTimeout(timer),
      timer = setTimeout(() => {
        callback(value)
      }, delay)
  }
}

import { useCallback, useEffect, useState } from 'react'


function App() {

  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])

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
              <a
                key={product.id}
                className="dropdown-item"
                href="#"
              >
                {product.name}
              </a>
            ))}
          </div>


        }

      </div>

    </>
  )
}

export default App
