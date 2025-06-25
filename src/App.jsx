import { useEffect, useState } from 'react'


function App() {

  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3333/products?search=${query}`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [query])

  console.log(products);



  return (
    <>
      <div className="container mt-4">

        <input
          type="text"
          className='form-control'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Cerca ...'
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
