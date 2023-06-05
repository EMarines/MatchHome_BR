<script>
    import logo from '../lib/images/logo.png'
</script>

<div class="hero">
    <div class="container">
        <div class="header cabezal">
            <div>
                <h2>Match Home</h2>
                <h5>Tu Patrimonio En Buenas Manos</h5>
            </div>
            <div class="logo">
                <img src={logo} alt="Match Home">
            </div>
        </div>
    </div>
</div>

<style>
    .hero{
        padding: 0.5em 0;
        background-color: var(--primary-color);
        color: white;
    }

    h2{
        font-size: 3.5em;
        font-weight: 400;
        margin: 0;
    }

    h5 {
        font-size: 1.5em;
        font-weight: 150;
    }

    img{
      width: 180px;  
    }

    .header {
        display: flex;
    }

    .logo {
        display: flex;
        align-items: center;
        justify-content: right;
    }

    .cabezal {
        justify-content: space-between;
    }
</style>