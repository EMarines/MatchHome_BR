<script>
  let todoList = ['Do the groceries']
  let currTodo = "";
  let error = false;

  function addTodo(){
    error=false;
    if(!currTodo){
      error = true;
    }
    todoList = [...todoList, currTodo];
    currTodo = "";
  }

  /**
   * @param {number} index
   */
  function editTodo(index) {
    let newTodoList = todoList.filter((val, i) => {
      return i !==index;
    });
    currTodo = todoList[index];
    todoList = newTodoList;
  }

  /**
   * @param {number} index
   */
  function deleteTodo(index) {
    let newTodoList = todoList.filter((val, i) => {
      return i !==index;
    });
    todoList = newTodoList;
  }
</script>
<div class="mainContainer">
  <div class="headerContainer">
    <h1>Todo List</h1>
    <div class="headerBtn">
      <button><i class="fa-regular fa-floppy-disk"></i><p>Save</p></button> 
      <button><i class="fa-solid fa-right-from-bracket"></i><p>Logout</p></button> 
    </div>
  </div>
  <main>
    {#if todoList.length === 0}
      <p>You have nothing to do!</p>
    {/if}
    {#each todoList as todo, index}
      <div class="todo">
        {index+1}. {todo}
      <div class="actions">
        <i on:click={()=>{editTodo(index)}} on:keydown={()=>{}} class="fa-regular fa-pen-to-square" />
          <i on:click={()=>{deleteTodo(index)}} on:keydown={()=>{}} class="fa-regular fa-trash-can" />
      </div>
      </div>
    {/each}

  </main>
  <div class={"enterTodo " + (error ? "errorBorder" : "")}>
    <input bind:value={currTodo} type="text" placeholder="Enter Todo" />
    <button on:click={addTodo}>ADD</button>
  </div>

</div>

<style>

  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 24px;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .headerBtn {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .headerContainer button {
    background: #003c5b;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 4px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .headerContainer button:hover {
    opacity: 0.7;
  }

  .headerContainer button i {
    font-size: 1.3rem;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .todo {
    border-left: 1px solid cyan;
    padding: 4px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 1.3rem;
  }

  .actions i {
    cursor: pointer;
  }

  .actions i:hover {
    color: coral;
  }

  .enterTodo {
    display: flex;
    align-items: stretch;
    border: 1px solid cyan;
    border-radius: 5px;
    overflow: hidden;
  }

  .errorBorder {
    border-color: coral !important;
  }

  .enterTodo input {
    background: transparent;
    border: none;
    padding: 14px;
    color: white;
    flex: 1;
  }

  .enterTodo input:focus {
    outline: none;
  }

  .enterTodo button {
    padding: 0 28px;
    background: #003c5b;
    border: none;
    color: cyan;
    font-weight: 300;
    cursor: pointer;
  }

  .enterTodo button:hover {
    background: transparent;
  }

  </style>