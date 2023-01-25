import { BASIC_AUTH_VALUE, EXPIRED_SESSION_KEY, EXPIRED_SESSION_VALUE, GENERAL_PARAMETERS_API, POST_MODULE_API } from "./constants";
import { LiferayUser } from "./types/models";
import { PostModuleReq } from "./types/reqs/post-module.req";

class IntraClient{

  //@ts-ignore
  Liferay: any = window.Liferay;

  backendBaseUrl = ""
  backendHost = ""


  async initialize(req: PostModuleReq, finish: () => void) {
    
    // TODO: Throws an error when Liferay varaible is not defined !
    try{
      let response = await fetch(GENERAL_PARAMETERS_API, {
        method: 'GET',
        headers: {
          "Authorization": BASIC_AUTH_VALUE
        }
      })
      .then((res) => res.json())
      
      await this.postModule(req)
      this.backendHost = response[0].adresseIP
      this.backendBaseUrl = response[0].adresseIP+"/digitalfirst-service/rest/api/paypartnerservices"
      //console.log("General ,parameters : ", response)
      console.log("URL : ", this.backendBaseUrl)
    } catch(e){
      alert("Impossible de faire l'initialisation. Verifiez si le serveur est disponible.")
      //throw new Error("Impossible de faire l'initialisation. Verifiez si le serveur est disponible.")
      window.location.href = window.location.host
    }
    finally{
      finish()
    }
    
  }

  async getUser(){
    //@ts-ignore
    const userId = Liferay == null ? 0 : this.Liferay.ThemeDisplay.getUserId()
    const res = await fetch(`/o/afb-liferay-rest/afb-users-by-id/${userId}`,  {
      method: 'GET',
      headers: {
        "Authorization": BASIC_AUTH_VALUE
      }
    })
           .then(data => data.json())
    console.log('Liferay User: '+res)
    return res as LiferayUser
    //return (res as LiferayUser[])[0]
  }

  isSessionExpired(){
    return this.Liferay.Session.get(EXPIRED_SESSION_KEY) == EXPIRED_SESSION_VALUE
  }



  private postModule(req: PostModuleReq): Promise<any>{
    return this.Liferay.Service(
      POST_MODULE_API,
      req
    )
  }

  
  
}

const intraClient = new IntraClient()

export default intraClient



