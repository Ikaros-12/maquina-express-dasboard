import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../maquinas/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem("token") || "";
  const router = inject(Router);
  const user = inject(UserService);


  if (token == ""){
    const url = router.navigate(["/login"])
    return url
  }

  return user.validar(token).subscribe((res: string)=>
    {if(res=="ok"){
      return true}
      const url = router.navigate(["/login"])
      return url
    },(err:any)=>{
      const url = router.navigate(["/login"])
      return url
    }
  )  



  /*
  console.log(token)
  if(token !="" && user.validar(token)){
    console.log("pase por aca")
    return true
  }else{
    const url = router.navigate(["/login"])
    return url
  }
  */
};
