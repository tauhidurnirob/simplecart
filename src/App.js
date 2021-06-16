import './App.css';
import classes from './cart.module.css';

import {useItems} from './SweetState/SweetState';
import { useState, useEffect } from 'react';

import db from './Dexie/db';

function App() {
  const [state, actions] = useItems();

  useEffect(()=> {
    db.items.toArray().then((items) => {
      actions.setStore(items);
    }).catch((error)=> {
      alert ("Ooops: " + error);
    });
  },[actions, state.items.length])

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const items = state.items;

  const nameOnChange = (e) => {
    setName(e.target.value);
  }
  const quantityOnChange = (e) => {
    setQuantity(e.target.value);
  }
  const priceOnChange = (e) => {
    setPrice(e.target.value)
  }

  const addClicked = async ()=> {
    if(name !== '' && quantity !== null && price !== null) {
      await db.items.add({
        name: name,
        quantity: quantity,
        price: price
      }).then(()=> {
        actions.setItems({
          name: name,
          quantity: quantity,
          price: price
        })
      }).catch((error)=> {
        alert ("Ooops: " + error);
      });

      setName('');
      setQuantity('');
      setPrice('');
    }
    else window.alert('One or more fields are empty')
  }
  const removeClicked = async (id) => {
    await db.items.delete(id).then(()=> {
      actions.removeItems(id);
    }).catch((error)=> {
      alert ("Ooops: " + error);
    });
  }

  return (
    <div className="App">
      <div className={classes.cart}>
        <div className={classes.head}>
          <div className={classes.opt}>
            <h4>Item Name:</h4>
            <input type="text" onChange={nameOnChange} value={name} />
          </div>
          <div className={classes.opt}>
            <h4>Quantity:</h4>
            <input type="number" onChange={quantityOnChange} value={quantity} />
          </div>
          <div className={classes.opt}>
            <h4>Item Price:</h4>
            <input type="number" onChange={priceOnChange} value={price} />
            <button className={classes.add_btn} onClick={addClicked}>ADD</button>
          </div>
        </div>

        <h1>CART ITEMS:</h1>
        <div className={classes.items}>
          <div className={classes.top}>
            <div className={classes.opt}>
              <h3>NAME</h3>
            </div>
            <div className={classes.opt}>
              <h3>QUANTITY</h3>
            </div>
            <div className={classes.opt}>
              <h3>PRICE</h3>
            </div>
            <div className={classes.opt}>
              <h3>SUBTOTAL</h3>
            </div>
          </div>

          {
            items.map((m,index) => {
              return(
                <div className={classes.item} key={index}>
                  <div className={classes.opt}>
                    <h3>{m.name}</h3>
                  </div>
                  <div className={classes.opt}>
                    <h3>{m.quantity}</h3>
                  </div>
                  <div className={classes.opt}>
                    <h3>${m.price}</h3>
                  </div>
                  <div className={classes.opt}>
                    <h3>${m.quantity * m.price}</h3>
                    <button className={classes.remove_btn} onClick={()=>removeClicked(m.id)} >REMOVE</button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
