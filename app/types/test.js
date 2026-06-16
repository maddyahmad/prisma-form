import { useState, useMemo } from 'react';

const cart = [
    { id: 1, name: "Laptop", price: 50000, qty: 1 },
    { id: 2, name: "Phone", price: 20000, qty: 2 }
];

const dummyItem = { id: 3, name: "Charger", price: 200, qty: 2 }

const App = () => {
    const [items, setItems] = useState(cart);

    const addItem = (addedItem) => {
        const isItemExist = items.find((item) => item.id === addedItem.id)
        if (isItemExist) {
            console.log('Item exist')
            return;
        }
        const updatedCart = items.push(addedItem)
        setItems(updatedCart)
    }

    const removeItem = (addedItem) => {
        const isItemExist = items.find((item) => item.id == addedItem.id)
        if (!isItemExist) {
            console.log('Item doesnot exist')
            return;
        }
        if (isItemExist.qty == 1) {
            const remainingItems = items.filter((item) => item.id !== addedItem.id)
            setItems(remainingItems)
        }
        else {
            const remainingItems = items.filter((item) => item.id !== addedItem.id)
            const updatedArr = remainingItems.push({ ...addedItem, qty: addedItem.qty - 1 })
            setItems(updatedArr)
        }
    }

    const totalPrice = useMemo(() => items.reduce((sum, item) => {
        return sum + item.price
    }, 0), [items])


    return (
        <div>
            <h2>Total Items: {items.length}</h2>
            <h2>Total Price: {totalPrice}</h2>
            <div>
                <button onClick={() => addItem({ ...dummyItem, id: items.length + 1 })}>Add Item</button>
            </div>
            {items.map((item) => {
                return (
                    <div key={item.id} onClick={() => removeItem(item)}>
                        <h4>Name: {item.name}</h4>
                        <h4>Price: {item.price}Rs</h4>
                        <h4>Quantity: {item.qty}</h4>
                    </div>
                )
            }
            )}
        </div>
    )
}