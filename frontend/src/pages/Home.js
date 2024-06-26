import React, { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  //UseState refers to data or properities that need to be tracking in an Application
  const [tasks, setTasks] = useState([]);
  const [accomplish, setAccomplish] = useState("");
  //UseEffectto just connected to our API (or) Fetch data from server side!
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:3001/tasks")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Unable to fetch tasks", err);
      });
  };
  //When you submit the todo_form and you make the POST request it doesn't reload the page here...
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/tasks", { accomplish }).then(() => {
      setAccomplish("");
      fetchTasks();
    });
  };
  //DELETE the tasks
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        fetchTasks();
      })
      .catch((err) => {
        console.log("unable to deleted the tasks", err);
      });
  };

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl">Todo-App</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <br />
          <label>Task:</label>
          <br />
          <input
            className="w-[300px] h-[60px] border border-black p-3"
            value={accomplish}
            placeholder="Enter Here..."
            onChange={(e) => setAccomplish(e.target.value)}
          ></input>
          <br />
          <br />
          <button
            className="w-[300px] h-[60px] border border-black hover:bg-sky-500 hover:text-white"
            type="submit "
          >
            Submit
          </button>
        </form>
        <br />
        <br />
        <hr className="border border-black" />
        <br />
        <br />

        <h2 className="text-2xl">Todo_List:</h2>
        <br />
        <br />
        <div>
          {tasks.map((task) => (
            <div key={task._id}>
              <li>
                {task.accomplish}
                <button
                  className="translate-x-[48px] text-black p-10px"
                  onClick={() => handleDelete(task._id)}
                >
                  ❌
                </button>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
