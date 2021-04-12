<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success, $status, $message, $extra=[]){
    return array_merge([
        'success'=>$success,
        'status'=>$status,
        'message'=>$message
    ],$extra);
}

/* Establish connection with database*/
require __DIR__.'/../Classes/database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

//Get Data from the request 
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

//Only want POST method
if($_SERVER["REQUEST_METHOD"]!="POST"):
    $returnData = msg(0,404,'Page Not Found!');

else:
    $status = trim($data->attributes->status);
    $anime_id = (int)trim($data->id);
    $type = trim($data->type);
    $start_date = trim($data->attributes->startDate);
    $end_date = trim($data->attributes->endDate);
    $update_at = trim($data->attributes->updatedAt);
    $next_release = trim($data->attributes->nextRelease);
    $anime_name = trim($data->attributes->canonicalTitle);
    $email = trim($data->userEmail->userInfo);

    try {
        $checkDatabase = "SELECT `anime_id` FROM `dbl_anime` WHERE `anime_id`=:anime_id";
        $checkDatabase_stmt = $conn->prepare($checkDatabase);
        $checkDatabase_stmt->bindValue(':anime_id',$anime_id,PDO::PARAM_STR);
        $checkDatabase_stmt->execute();

        $checkIntermediateDatabase = "SELECT `anime_id` FROM `dbl_anime_intermediate` WHERE
        `anime_id`=:anime_id AND `email`=:email";
        $checkIntermediateDatabase = $conn->prepare($checkIntermediateDatabase);
        $checkIntermediateDatabase->bindValue(':anime_id',$anime_id,PDO::PARAM_INT);
        $checkIntermediateDatabase->bindValue(':email',$email,PDO::PARAM_STR);
        $checkIntermediateDatabase->execute();

        if($checkIntermediateDatabase->rowCount()):
            $returnData = msg(0,444, $anime_name.' already in calender');

        /*   if data is not in database then insert    */
        elseif($checkDatabase_stmt->rowCount()):
            $insert_relation_query = "INSERT INTO `dbl_anime_intermediate`(`anime_id`,`email`)
            VALUES(:anime_id, :email)";
            $insert_relation_query=$conn->prepare($insert_relation_query);
            $insert_relation_query->bindValue(':anime_id',$anime_id,PDO::PARAM_INT);
            $insert_relation_query->bindValue(':email',$email,PDO::PARAM_STR);
            $insert_relation_query->execute();
            $returnData = msg(1,205, $anime_name.' added to calender successfully');
        
        else:
            /*   if updateAt is non existant, then anime is seasonal Seasonal anime has no next_release value
            so we must estimate one  */
            if($next_release == null):
                $anime_time = 'None';
                $date_today = date_create('now');
                /* Anime is released once a week from its start date, so calculate airing date based off 
                current day of week*/
                if($date_today > date_create($start_date)):
                    $diff = (int)date_diff($date_today,date_create($start_date))->format('%a');
                    $estimated_diff = (int)ceil($diff/7)*7;
                    $estimated_day = (date_create($start_date)->add(new DateInterval('P'.$estimated_diff.'D')))->format('Y-m-d');
                else:
                    $estimated_day = (date_create($start_date)->format('Y-m-d'));
                endif;
                /*    Sending anime information into database   */
                $insert_query = "INSERT INTO `dbl_anime`(`anime_id`,`anime_name`,`anime_update`,`anime_time`) 
                VALUES(:anime_id,:anime_name,:estimated_day,:anime_time)";
                $insert_query = $conn->prepare($insert_query);
                $insert_query->bindValue(':anime_id',$anime_id,PDO::PARAM_INT);
                $insert_query->bindValue(':anime_name', $anime_name, PDO::PARAM_STR);
                $insert_query->bindValue(':estimated_day',$estimated_day,PDO::PARAM_STR);
                $insert_query->bindValue(':anime_time',$anime_time,PDO::PARAM_STR);
                $insert_query->execute();

                /*   Sending relationship between user and anime to database   */
                $insert_relation_query = "INSERT INTO `dbl_anime_intermediate`(`anime_id`,`email`)
                VALUES(:anime_id, :email)";
                $insert_relation_query=$conn->prepare($insert_relation_query);
                $insert_relation_query->bindValue(':anime_id',$anime_id,PDO::PARAM_INT);
                $insert_relation_query->bindValue(':email',$email,PDO::PARAM_STR);
                $insert_relation_query->execute();
                $returnData = msg(1,201,$anime_name.' added to calender successfully');

            else:
                /*    Sending Ongoing anime information into database   */
                $airing_date = date_create($next_release)->format('Y-m-d');
                $airing_time = date_create($next_release)->format('H-i');
                $insert_query = "INSERT INTO `dbl_anime`(`anime_id`,`anime_name`,`anime_update`,`anime_time`) 
                VALUES(:anime_id,:anime_name,:airing_date,:airing_time)";
                $insert_query = $conn->prepare($insert_query);
                $insert_query->bindValue(':anime_id',$anime_id,PDO::PARAM_INT);
                $insert_query->bindValue(':anime_name', $anime_name, PDO::PARAM_STR);
                $insert_query->bindValue(':airing_date',$airing_date,PDO::PARAM_STR);
                $insert_query->bindValue(':airing_time',$airing_time,PDO::PARAM_STR);
                $insert_query->execute();

                /*   Sending relationship between user and anime to database   */
                $insert_relation_query = "INSERT INTO `dbl_anime_intermediate`(`anime_id`,`email`)
                VALUES(:anime_id, :email)";
                $insert_relation_query=$conn->prepare($insert_relation_query);
                $insert_relation_query->bindValue(':anime_id',$anime_id,PDO::PARAM_INT);
                $insert_relation_query->bindValue(':email',$email,PDO::PARAM_STR);
                $insert_relation_query->execute();

                $returnData = msg(1,201,$anime_name.' added to calender successfully');
            endif;
        endif;
    }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
endif;

echo json_encode($returnData);
