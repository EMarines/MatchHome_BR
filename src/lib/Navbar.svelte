<script>
    import { onAuthStateChanged, signOut } from 'firebase/auth'
    import { auth } from '../firebase'
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import Moon from "./icons/moon.svelte";
    import Sun from "./icons/sun.svelte";
    import { isLoggedIn, user } from '../store';

    const logout = async () => {
      try {
        await signOut(auth)
        $isLoggedIn = false
        $user = {};       
      } catch (error) {
        console.log(error);
      }
    };

    onAuthStateChanged(auth, authUser => {
       // @ts-ignore
       $user = authUser
       $isLoggedIn = !!authUser
    })


    let currentTheme = "";
    
    onMount(() => {
    // currentTheme = document.documentElement.dataset.theme;
    const userPrefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const hasUserSetDarkModeManually =
      document.documentElement.dataset.theme == "dark";
    if (!hasUserSetDarkModeManually) {
      setTheme(userPrefersDarkMode ? "dark" : "light");
    }
  });

    const setTheme = (theme) => {
        document.documentElement.dataset.theme = theme;
        document.cookie = `siteTheme = ${theme}; max-age=31536000;path="/"`;
        currentTheme = theme;
    };

    $: routeId = $page.route.id;
    $: url = $page.url.href

</script>

<nav>
    <div class="container">

        <h1>MatchHome</h1>
        <ul>
            <!-- {#each navs as {title, href}}
                <li>
                    <a {href} class:active={href === "/" ? routeId === href: url.includes(href)} {title}>{title}</a>
                </li>
            {/each} -->
            <div class="li__dist">
              
              <li><a href="/">Home</a></li>
              {#if $isLoggedIn}
                <li><a href="/contactos">Contacto</a></li>
                <li><a href="/propiedades">Propiedades</a></li>
                <li><a href="/agenda">Agenda</a></li>
                <!-- <li><a href="/(app)/profile">Profile</a></li> -->
                <li><a href="/" on:click={logout}>Logout</a></li> 
              {:else}
                <li><a href="/login">Login</a></li>
              {/if}
              <li class="relative">
                {#if currentTheme == "light"}
                  <a class="moon" href={"#"} on:click={() => setTheme("dark")}>
                    <Moon />
                  </a>
                {:else}
                  <a class="sun" href={"#"} on:click={() => setTheme("light")}>
                    <Sun />
                  </a>
                {/if}
              </li>

            </div>
        </ul>
    </div>
</nav>

<style>
    nav{
        position: sticky;
        top: 0;
        padding: 0.5em;
        background-color: #343a40;
        color: white;
    }
    .container{
        display: flex;
        align-items: center;
    }
    ul{
        display: flex;
        margin: 0;
        margin-left: auto;
        list-style: none;
        font-size: 1em;
    }

    .li__dist {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }
 
    h1{
        margin: 0;
        font-size: 1.3em;
        font-weight: normal;
    }
    a{
        text-decoration: none;
        color: #aaa;        
    }

    @media(max-width: 800px) {
      nav{
        color: blue;
        position: static;
      }
      .li__dist {
        flex-direction: column;
        color: red;
        padding-right: 50px;
      }
   
    }
    /* .active{
        color: white;
    } */

</style>