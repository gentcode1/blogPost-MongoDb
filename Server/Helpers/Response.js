

class Response{
    /**
     * suceess response
     * @params res,message, data, status
     * @returns status, success message
     */
    static successMsg(res, message, data=null, status)
  
    {
        res.status(status).json(
            data ?
            {
                status:status,
                message,
                data
  
}
        :
        {
            status:status,
            message,
        }
        )
    }

  static errorMsg(res,error,status){
      res.status(status).json({
          status:status,
          error
      })

  }  

}
export default Response;