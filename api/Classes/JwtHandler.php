<?php
require __DIR__.'/../jwt/src/JWT.php';
require __DIR__.'/../jwt/src/ExpiredException.php';
require __DIR__.'/../jwt/src/SignatureInvalidException.php';
require __DIR__.'/../jwt/src/BeforeValidException.php';

use Firebase\JWT\JWT;

class JwtHandler {
    protected $jwt_secrect;
    protected $token;
    protected $issuedAt;
    protected $expire;
    protected $jwt;

    public function __construct()
    {
        // set your default time-zone
        date_default_timezone_set('Etc/GMT+0');
        $this->issuedAt = time();
        
        // Token Validity (3600 second = 1hr)
        $this->expire = $this->issuedAt + 3600;

        // Set your secret or signature
        $this->jwt_secrect = "Ulh<;A6dF%dq>Vu9eaAV";  
    }

    // ENCODING THE TOKEN
    public function _jwt_encode_data($iss,$data){

        $this->token = array(
            //Adding the identifier to the token (who issue the token)
            "iss" => $iss,
            "aud" => $iss,
            // Adding the current timestamp to the token, for identifying that when the token was issued.
            "iat" => $this->issuedAt,
            // Token expiration
            "exp" => $this->expire,
            // Payload
            "data"=> $data
        );

        $this->jwt = JWT::encode($this->token, $this->jwt_secrect);
        return $this->jwt;

    }

    protected function _errMsg($msg){
        return [
            "auth" => 0,
            "message" => $msg
        ];
    }
    
    //DECODING THE TOKEN
    public function _jwt_decode_data($jwt_token){
        try{
            $decode = JWT::decode($jwt_token, $this->jwt_secrect, array('HS256'));
            return [
                "auth" => 1,
                "data" => $decode->data
            ];
        }
        catch(ExpiredException $e){
            return $this->_errMsg($e->getMessage());
        }
        catch(SignatureInvalidException $e){
            return $this->_errMsg($e->getMessage());
        }
        catch(BeforeValidException $e){
            return $this->_errMsg($e->getMessage());
        }
        catch(DomainException $e){
            return $this->_errMsg($e->getMessage());
        }
        catch(InvalidArgumentException $e){
            return $this->_errMsg($e->getMessage());
        }
        catch(UnexpectedValueException $e){
            return $this->_errMsg($e->getMessage());
        }

    }
}