

export default function loginCreate() {
  return (
    <div class="form-container">
        <div class="headline">
            <div class="brand">xilef
            </div>	
            <div>
                <p>Anlegen einer neuen Studie</p>
            </div>
            {/* style="	font-size: 18px; font-weight: bold;" */}
            <div class="hr-container">
                <p class="hr-vert-small"></p>
            </div>	
            <form action="loginCreate.php" method = "post">
                <div class="form-group">
                    <label for="name">Benutzername: </label> 
                    <div class="tooltip"><button >?</button>
                         {/* style="height:25px; width: 25px;" */}
                        <span class="tooltiptext">Benutzen Sie die vorläufigen <br/> Anmeldedaten!</span>
                     </div>
                    <span class="input-span"><input type="text" name="login-name"></input></span>
                </div>
                <div class="form-group">
                    <label for = "password">Passwort: </label> 
                    <span class="input-span"><input type="password" name="login-password"></input></span>
                </div>
                <div class="form-group">
                    <button type="submit" name="login">LOGIN</button>
                </div>
            </form>	
        </div>
	</div>
  )
}
