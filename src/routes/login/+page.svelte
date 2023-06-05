<script>
  import { auth } from '../../firebase';
  import { GoogleAuthProvider,signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
  import { isLoggedIn, user } from '../../store';
  import { goto} from '$app/navigation'

  let email = "";
  let password = "";
  let confpass = "";
  let error = false;
  let register = false;
  let errMsg = "";

  function dataReset () {
    email = "";
    password = "";
    confpass = "";
    error = false;
    register = false;
    errMsg = "";
  }

  const emailAuthenticate = async() => {
    if(!email || !password || (register && !confpass)) {
      error = true
      errMsg = "La información no está completa "
      return;
    }
    if(!register) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          $user = userCredential.user;
          $isLoggedIn = true 
          dataReset() 
          goto("/")
        })
        .catch((error) => {
          error = true
          errMsg = "No se pudo conectar a db"
      });
    } else {
      if(register && (password === confpass)){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            $user = userCredential.user;
            $isLoggedIn = true;
            dataReset() 
            goto("/") 
          })
          .catch((error) => {
            error = true
          });
        } else {
        errMsg = "No coniciden la contraseña"
        error = true
      }
    }
     
  }
  

  function handleRegister() {
    register = !register
    console.log(register);
  }

  const loginGoogle = async() => {
    try {
      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider)
      $user = res.user 
      $isLoggedIn = true 
      goto("/")
    } catch (error) {
      console.log(error);
    }
  }
</script>
<div class="container">
  <div class="authContainer">  
    <form>
      <h1>{register ? "Registrse" : "Login"}</h1>
      {#if error}
        <p class="error">{errMsg}</p>        
      {/if}
      <label>
        <p class={email ? ' above' : ' center'}>Email</p>
        <input bind:value={email} type="email" placeholder="email">
      </label>
      <label>
        <p class={password ? ' above' : ' center'}>Password</p>
        <input  bind:value={password} type="password" placeholder="Password">
      </label>
      {#if register}
      <label>
        <p class={confpass ? ' above' : ' center'}>Confrirm Password</p>
        <input  bind:value={confpass} type="confPass" placeholder="Confirmar Password">
      </label>
      {/if}
      <button type="button" on:click={emailAuthenticate} class="submEmail" on:keydown={()=>{}}>Submit</button>
      
    </form>
    <div class="whit__Google">
      <p class="goog__text">Ó</p>
      <button type="button" on:click={loginGoogle} on:keydown={()=>{}}>Login with Google</button>
    </div>

    <div class="options">
      <p>Ó</p>
      {#if register}
      <div>
        <p>Tienes Cuenta?</p>
        <p on:click={handleRegister} on:keydown={()=>{}}>Login</p>
      </div>
      {:else}
      <div>
        <p>No Tienes Cuenta?</p>
        <p on:click={handleRegister} on:keydown={()=>{}}>Registrate</p>
      </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .authContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;   
  }

  form, .options {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
  }

  button {
    width: 400px;
    max-width: 100%;
    color: white;
    background: blue;
    margin: 0 auto;
    border-radius: 5px;
    padding: 14px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background: navy;
    color:gray;
  }

  .goog__text{
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
  }

  form input {
    border: none;
    background: transparent;
    color: white;
    padding: 14px;
  }

  h1 {
    text-align: center;
  }

  form label {
    position: relative;
    border: 1px solid blue;
    border-radius: 5px;
  }

  form input:focus {
    /* border: 1px solid navy; */
    border: none;
    outline: none;
  }

  form label:focus-within {
    border-color: blue;
  }

  .whit__Google {
    margin: 15px 10px 15px 0;
  }
  .error {
    font-size: 1rem;
    color: coral;
  }

  .options {
    padding: 14px 0;
    overflow: hidden;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .options > p {
    position: relative;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    padding: 0 8px;
  }

  .options > p::after,
  .options > p::before {
    position: absolute;
    content: "";
    top: 50%;
    transform: translateY(-50%);
    width: 100vw;
    height: 1.5px;
    background: white;
  }

  .options > p::after {
    right: 100%;
  }

  .options > p::before {
    left: 100%;
  }

  .options div {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }

  .options div p:last-of-type {
    color: cyan;
    cursor: pointer;
  }
 
</style>
