import { useState, useEffect } from "react";

const List = (props) => {
  const [theme, setTheme] = useState("light");
  const [newItem, setNewItem] = useState("");

  const [updateItemName, setUpdateItemName] = useState("");
  const [editItemIndex, setEditItemIndex] = useState("");
  const [showEditInput, setShowEditInput] = useState(false);

  const [editItem, setEditItem] = useState({});

  const [items, setItems] = useState([]);

  const Item = (props) => {
    const { items } = props;
    const handleClick = (index) => {
      const newArray = [...items];
      newArray[index].done = !newArray[index].done;
      setItems(newArray);
    };
    return (
      <>
        <table style={{ width: "100%" }}>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "50%" }}>Name</th>
            <th style={{ width: "45%" }}>Action</th>
          </tr>
          {items.map((item, index) => {
            return (
              <tr>
                <td>
                  <input
                    onClick={() => {
                      handleClick(index);
                    }}
                    type="checkbox"
                    checked={item.done}
                  />
                </td>
                <td>
                  {editItem.id === item.id ? (
                    <div>
                      <input
                        type="text"
                        // autoFocus
                        value={editItem.name}
                        onChange={(e) => {
                          setEditItem({ ...editItem, name: e.target.value });
                        }}
                      />

                      <button
                        onClick={() => {
                          ////
                          const newAry = [...items];
                          newAry[index].name = editItem.name;
                          setItems(newAry);
                          setEditItem({});
                        }}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <label
                      onClick={() => {
                        handleClick(index);
                      }}
                      style={{
                        textDecoration: item.done ? "line-through" : "none"
                      }}
                    >
                      {item.name}
                    </label>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      // setEditItemIndex(index);
                      setEditItem(item);
                    }}
                    style={{ backgroundColor: "lightblue" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Sure?")) {
                        toDoDelete(index);
                      }
                    }}
                    style={{ backgroundColor: "red" }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </>
    );

    // return items.map((item, index) => {
    //   return (
    //     <div>
    //       <div
    //         onClick={() => {
    //           handleClick(index);
    //         }}
    //       >
    //         <input type="checkbox" checked={item.done} />
    //         <label
    //           style={{
    //             textDecoration: item.done ? "line-through" : "none"
    //           }}
    //         >
    //           {item.name}
    //         </label>
    //       </div>
    //       <button
    //         onClick={() => {
    //           setEditItemIndex(index);
    //         }}
    //         style={{ backgroundColor: "lightblue" }}
    //       >
    //         Edit
    //       </button>
    //       <button
    //         onClick={() => {
    //           if (confirm("Sure?")) {
    //             toDoDelete(index);
    //           }
    //         }}
    //         style={{ backgroundColor: "red" }}
    //       >
    //         X
    //       </button>
    //     </div>
    //   );
    // });
  };

  useEffect(() => {
    console.log(editItemIndex);

    if (editItemIndex !== "") {
      setShowEditInput(true);

      const findVal = items[editItemIndex].name;

      setUpdateItemName(findVal);
    } else {
      setShowEditInput(false);
    }
  }, [editItemIndex]);

  const addToTodo = () => {
    const obj = { name: newItem, done: false, id: 52625 };
    // setItems([...items, obj]);
    items.push(obj);
    setNewItem("");
  };

  const changeItemName = (event) => {
    setUpdateItemName(event.target.value);
  };

  const updateTodo = () => {
    const itemIndex = editItemIndex;
    const prevItems = [...items];
    prevItems[itemIndex].name = updateItemName;
    setItems(prevItems);
    setEditItemIndex("");
  };

  const addNewItem = (event) => {
    setNewItem(event.target.value);
  };

  const toDoDelete = (i) => {
    const updatedItems = items.filter((item, index) => index !== i);
    setItems(updatedItems);
  };
  return (
    <div>
      {/* <button
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {" "}
        {theme === "light" ? "Set Dark" : "Set Light"}
      </button> */}

      <input
        type="text"
        value={newItem}
        name="new_item"
        onChange={addNewItem}
      />
      <button type="button" onClick={addToTodo}>
        Add to Todo
      </button>
      {showEditInput ? (
        <>
          <input
            type="text"
            value={updateItemName}
            name="new_item"
            onChange={changeItemName}
          />
          <button type="button" onClick={updateTodo}>
            Update Todo
          </button>
        </>
      ) : (
        ""
      )}
      <br />
      <br />
      <div
        style={{ backgroundColor: theme === "light" ? "lightgray" : "blue" }}
      >
        {<Item items={items} />}
      </div>
    </div>
  );
};

export default List;
